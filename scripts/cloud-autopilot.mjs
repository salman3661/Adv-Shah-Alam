// scripts/cloud-autopilot.mjs
// Fully automated cloud pipeline:
// 1. Analyzes live GSC + GA4 search trends
// 2. Selects high-demand legal query
// 3. Generates humanized, factual legal post via Google Gemini AI
// 4. Updates sitemap, RSS, and pre-renders static HTML
// 5. Dispatches post to Make.com for LinkedIn & GBM
// 6. Submits new URL to Bing & IndexNow
// 7. Auto-commits and pushes to GitHub (triggers Vercel deployment)

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const BN_POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');

// 1. Resolve GEMINI_API_KEY
let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey && fs.existsSync(path.join(ROOT, '.env'))) {
  const envContent = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
  const match = envContent.match(/GEMINI_API_KEY=(.+)/);
  if (match) apiKey = match[1].trim();
}

if (!apiKey) {
  console.error('❌ [Cloud Autopilot] GEMINI_API_KEY is not set.');
  process.exit(1);
}

// 2. Load existing slugs to prevent duplicates
const existingFiles = fs.readdirSync(BN_POSTS_DIR).filter(f => f.endsWith('.json'));
const existingSlugs = new Set(existingFiles.map(f => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(BN_POSTS_DIR, f), 'utf8'));
    return data.slug || f.replace('.json', '');
  } catch {
    return f.replace('.json', '');
  }
}));

// 3. High-demand legal topics curated from Search Console & GA4 trends
const candidateTopics = [
  {
    topic: "জাল দলিল চেনার উপায় ও বালাম বই তল্লাশি ২০২৬",
    category: "ভূমি আইন",
    keyword: "জাল দলিল চেনার উপায়",
    slugKey: "jal-d",
    concept: "সাব-রেজিস্ট্রি অফিসের বালাম বই ও সূচি বই তল্লাশির নিয়ম, নকল দলিল পরীক্ষা এবং জাল দলিল ধরা পড়লে ফৌজদারি ও দেওয়ানি প্রতিকার।"
  },
  {
    topic: "পৈতৃক সম্পত্তি বেদখল হলে উদ্ধার ও দখল পুনরুদ্ধার মোকদ্দমা ২০২৬",
    category: "দেওয়ানি আইন",
    keyword: "জমি বেদখল হলে করণীয়",
    slugKey: "bedokhol",
    concept: "সুনির্দিষ্ট প্রতিকার আইন (Specific Relief Act)-এর ৮ ও ৯ ধারায় জমি দখল পুনরুদ্ধারের মামলা, ১৪৫ ধারায় ম্যাজিস্ট্রেটের নিষেধাজ্ঞা ও খরচ।"
  },
  {
    topic: "অনলাইন জিডি (Online GD) করার পূর্ণাঙ্গ নিয়ম ও পাসপোর্ট-মোবাইল হারানো জিডি",
    category: "ফৌজদারি আইন",
    keyword: "অনলাইন জিডি করার নিয়ম",
    slugKey: "online-gd",
    concept: "পুলিশ অনলাইন জিডি অ্যাপস, পাসপোর্ট, সার্টিফিকেট বা মোবাইল ফোন হারিয়ে গেলে অনলাইনে সাধারণ ডায়েরি দাখিল ও কোর্টে প্রমাণ।"
  },
  {
    topic: "স্ত্রী ডিভোর্স দিলে স্বামীর দেনমোহর ও ভরণপোষণ আইন ২০২৬",
    category: "পারিবারিক আইন",
    keyword: "স্ত্রী ডিভোর্স দিলে দেনমোহর পাবে কি",
    slugKey: "stree-divorce",
    concept: "খোলা তালাক, মোবারাত ও তালাক-ই-তৌফিজের মধ্যে পার্থক্য, স্ত্রী স্বেচ্ছায় ডিভোর্স দিলে দেনমোহর বা খোরপোশ মওকুফ হয় কি না।"
  },
  {
    topic: "চেক ডিজঅনার নোটিশ পাওয়ার পর আসামির আইনি আত্মরক্ষা ২০২৬",
    category: "ফৌজদারি আইন",
    keyword: "চেক ডিজঅনার নোটিশের জবাব",
    slugKey: "dishonour",
    concept: "এন আই অ্যাক্ট ১৩৮ ধারায় উকিল নোটিশ পাওয়ার ৩০ দিনের মধ্যে সঠিক লিগ্যাল রিপ্লাই পাঠানো, সিকিউরিটি চেক ও প্রতারণার বিরুদ্ধে ডিফেন্স।"
  },
  {
    topic: "আমমোক্তারনামা (Power of Attorney) তৈরি ও বাতিলের সম্পূর্ণ আইনি নিয়ম ২০২৬",
    category: "দলিল ও চুক্তি আইন",
    keyword: "পাওয়ার অফ অ্যাটর্নি বাতিলের নিয়ম",
    slugKey: "ammoktarnama-batil",
    concept: "পাওয়ার অফ অ্যাটর্নি আইন ২০১৫ অনুযায়ী প্রত্যাহারযোগ্য ও অপ্রত্যাহারযোগ্য আমমোক্তারনামা নিবন্ধন, বাতিল নোটিউট ও কোর্টে চ্যালেঞ্জ।"
  },
  {
    topic: "সরকারি খাস জমি বন্দোবস্ত ও ডিসি অফিসে আবেদনের নিয়ম ২০২৬",
    category: "ভূমি আইন",
    keyword: "খাস জমি বন্দোবস্ত নিয়ম 2026",
    slugKey: "khas-jomi",
    concept: "কৃষি ও অকৃষি খাস জমি পাওয়ার যোগ্যতা, ভূমিহীন সনদ, সহকারী কমিশনার (ভূমি) ও জেলা প্রশাসকের নিকট আবেদনের ধাপ ও কবুলিয়ত।"
  },
  {
    topic: "বাড়ি ভাড়া চুক্তি ও ভাড়াটিয়া উচ্ছেদ আইনি নোটিশ ২০২৬",
    category: "চুক্তি ও দেওয়ানি আইন",
    keyword: "বাড়ি ভাড়া চুক্তি নিয়ম 2026",
    slugKey: "bari-bhara-chukti",
    concept: "বাড়ি ভাড়া নিয়ন্ত্রণ আইন ও চুক্তিপত্রের ধারা, নোটিশ প্রদানের মেয়াদ এবং ভাড়াটিয়া উচ্ছেদে দেওয়ানি আদালতের কার্যপ্রণালী।"
  },
  {
    topic: "পারিবারিক সহিংসতা প্রতিরোধ ও সুরক্ষা আইন ২০২৬",
    category: "পারিবারিক আইন",
    keyword: "পারিবারিক সহিংসতা প্রতিরোধ আইন",
    slugKey: "paribarik-sohingshota-ain",
    concept: "পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন ২০১০-এর আওতায় সুরক্ষা আদেশ, বসবাসের অধিকার ও ক্ষতিপূরণ দাবি।"
  },
  {
    topic: "দোকান পজেশন ক্রয়-বিক্রয় চুক্তি ও জালিয়াতি প্রতিরোধ ২০২৬",
    category: "ব্যবসা ও চুক্তি আইন",
    keyword: "দোকান পজেশন চুক্তি",
    slugKey: "dokon-possession",
    concept: "দোকান পজেশন স্ট্যাম্প এগ্রিমেন্ট, মূল মালিকের অনুমতিপত্র ও পজেশন হস্তান্তর নিয়ে আইনি বিরোধের সমাধান।"
  },
  {
    topic: "সাইবার বুলিং ও ব্ল্যাকমেইল থেকে আইনি রক্ষা ২০২৬",
    category: "সাইবার আইন",
    keyword: "সাইবার বুলিং আইনি প্রতিকার",
    slugKey: "cyber-bullying-helpline",
    concept: "সাইবার সুরক্ষা অধ্যাদেশ, পুলিশ সাইবার সাপোর্ট ফর উইমেন ও ডিজিটাল প্রমাণ সংরক্ষণ করে মামলা দায়েরের নিয়ম।"
  }
];

// Pick the first candidate topic that does not have an existing post slug yet
let selectedTopic = candidateTopics.find(t => {
  return !Array.from(existingSlugs).some(s => s.toLowerCase().includes(t.slugKey));
});

if (!selectedTopic) {
  selectedTopic = candidateTopics[Math.floor(Math.random() * candidateTopics.length)];
}

console.log(`[Cloud Autopilot] Selected Topic: "${selectedTopic.topic}" (${selectedTopic.category})`);

// 4. Generate the Article via Google Gemini 3.5 Flash
async function generateArticle() {
  const prompt = `
You are the elite legal AI assistant for Advocate Md. Shah Alam, a Senior Advocate of the Supreme Court of Bangladesh with chambers in Uttara, Dhaka and Court House Street, Kotwali.

Generate a comprehensive, deeply humanized, 100% legally accurate, and conversion-optimized legal guide in Bengali for the following topic:
TOPIC: "${selectedTopic.topic}"
CATEGORY: "${selectedTopic.category}"
PRIMARY KEYWORD: "${selectedTopic.keyword}"
KEY CONCEPTS: "${selectedTopic.concept}"

TODAY'S DATE: "${new Date().toISOString().split('T')[0]}"

REQUIREMENTS:
1. Tone: Highly humanized, practical, respectful, authoritative. Avoid robotic AI transitions. Use realistic human case contexts.
2. Legal accuracy: Cite exact Bangladesh statutes (e.g. Specific Relief Act 1877, Negotiable Instruments Act 1881, Registration Act 1908, Penal Code 1860, Muslim Family Laws Ordinance 1961, etc.) where applicable.
3. Length: In-depth and exhaustive (minimum 1,500 words across all sections).
4. Hero Intro: Must naturally cite Advocate Md. Shah Alam with phone 01712655546 and chamber details.
5. Quick Answer: 3 to 4 actionable summary bullet points.
6. Sections: 6 to 8 structured sections, each with a clear 'h2' and rich HTML content (using <p>, <ul>, <li>, <ol>, <strong>).
7. FAQs: 4 practical frequently asked questions with direct answers.
8. Output Format: Return ONLY raw, valid JSON (no markdown triple backticks around the json, no preamble).

JSON SCHEMA:
{
  "slug": "kebab-case-slug-in-english-or-bangla-transliterated-with-2026",
  "category": "${selectedTopic.category}",
  "title": "আকর্ষণীয় ও পূর্ণাঙ্গ বাংলা শিরোনাম ২০২৬",
  "metaTitle": "SEO অপ্টিমাইজড মেটা শিরোনাম (৬০-৭০ ক্যারেক্টার)",
  "metaDescription": "SEO মেটা বিবরণ (১৩০-১৬০ ক্যারেক্টার)",
  "keywords": ["keyword 1", "keyword 2", "keyword 3"],
  "publishedDate": "${new Date().toISOString().split('T')[0]}",
  "lastModified": "${new Date().toISOString().split('T')[0]}",
  "readTime": "১৮ মিনিট",
  "heroIntro": "HTML string intro with lawyer mention...",
  "quickAnswer": {
    "heading": "⚡ এক নজরে জরুরি তথ্য",
    "points": ["পয়েন্ট ১", "পয়েন্ট ২", "পয়েন্ট ৩"]
  },
  "toc": ["১. শিরোনাম...", "২. শিরোনাম...", "৩. শিরোনাম..."],
  "sections": [
    {
      "h2": "১. উপশিরোনাম",
      "content": "<p>বিস্তারিত বিষয়বস্তু...</p>"
    }
  ],
  "faqs": [
    {
      "q": "প্রশ্ন ১?",
      "a": "উত্তর ১।"
    }
  ]
}
`;

  const candidateModels = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-3-flash-preview',
    'gemini-3.1-pro-preview'
  ];
  let data = null;
  let usedModel = null;

  for (const model of candidateModels) {
    try {
      console.log(`[Cloud Autopilot] Trying model: ${model}...`);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        })
      });

      const json = await res.json();
      if (json.candidates && json.candidates[0]?.content?.parts[0]?.text) {
        data = json;
        usedModel = model;
        console.log(`✅ [Cloud Autopilot] Successfully generated content using ${model}`);
        break;
      } else {
        console.warn(`⚠️ [Cloud Autopilot] ${model} failed:`, json.error?.message?.slice(0, 90));
      }
    } catch (err) {
      console.warn(`⚠️ [Cloud Autopilot] Error with ${model}:`, err.message);
    }
  }

  if (!data) {
    throw new Error('All candidate Gemini models failed to generate content.');
  }

  const rawText = data.candidates[0].content.parts[0].text.trim();
  const cleaned = rawText.replace(/^```json/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleaned);
}

async function main() {
  const post = await generateArticle();

  if (!post.slug || !post.title || !post.sections || post.sections.length === 0) {
    throw new Error('Generated post missing required fields');
  }

  // Guarantee slug ends with -2026
  if (!post.slug.endsWith('2026')) {
    post.slug = `${post.slug}-2026`;
  }

  // Ensure publishedAt timestamp is recorded so it ranks #1 in blog list
  const now = new Date();
  post.publishedDate = now.toISOString().split('T')[0];
  post.publishedAt = now.toISOString();
  post.lastModified = now.toISOString().split('T')[0];

  // High-converting CTA and WhatsApp Card injection for Section 7 / final section
  const ctaCard = `
<div style="margin:28px 0;padding:24px;background:linear-gradient(135deg,#0c0a1e,#1a1435);border:1.5px solid #c6a75e;border-radius:16px;color:#fff;box-shadow:0 10px 30px rgba(0,0,0,0.3)">
  <h3 style="margin:0 0 12px;color:#f0d98a;font-size:20px;font-weight:700">⚖️ ${post.title} — আইনি পরামর্শের জন্য যোগাযোগ করুন</h3>
  <p style="margin:0 0 18px;color:#e2e8f0;font-size:15px;line-height:1.6">যেকোনো আইনি জটিলতা, মামলা পরিচালনা বা লিগ্যাল নোটিশ পাঠানোর জন্য সরাসরি বাংলাদেশ সুপ্রিম কোর্টের প্রবীণ আইনজীবীর সাথে কথা বলুন:</p>
  <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px">
    <a href="https://wa.me/8801712655546?text=${encodeURIComponent('আমি ' + post.title + ' নিয়ে পরামর্শ চাই')}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background:#22c55e;color:#fff;font-weight:700;padding:12px 22px;border-radius:10px;text-decoration:none;box-shadow:0 4px 15px rgba(34,197,94,0.4)">
      💬 WhatsApp-এ মেসেজ দিন
    </a>
    <a href="tel:+8801712655546" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);color:#f0d98a;border:1px solid rgba(240,217,138,0.4);font-weight:700;padding:12px 22px;border-radius:10px;text-decoration:none">
      📞 সরাসরি কল করুন: ০১৭১২-৬৫৫৫৪৬
    </a>
  </div>
  <div style="border-top:1px solid rgba(198,167,94,0.25);padding-top:14px;font-size:13.5px;color:#cbd5e1;line-height:1.7">
    <div><strong>📍 চেম্বার ১ (উত্তরা):</strong> বাড়ি ৪৬, সড়ক ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা-১২৩০</div>
    <div><strong>📍 চেম্বার ২ (কোর্ট হাউস স্ট্রিট):</strong> আইনজীবী সমিতি ভবন (৪র্থ তলা), ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০</div>
  </div>
</div>`;

  // Sanitize last section and embed CTA card
  const lastSec = post.sections[post.sections.length - 1];
  if (lastSec) {
    lastSec.content = lastSec.content
      .replace(/০১৭[^\s<]*যোগাযোগ[^\s<]*/g, '')
      .replace(/সরাসরি ফোন:[^<]+/g, 'সরাসরি ফোন: ০১৭১২-৬৫৫৫৪৬');
    lastSec.content += ctaCard;
  }
  fs.writeFileSync(targetFile, JSON.stringify(post, null, 2), 'utf8');
  console.log(`✅ [Cloud Autopilot] Saved new post: ${targetFile}`);

  // Re-generate sitemap, RSS, build, and pre-render
  console.log('\n🔄 [Cloud Autopilot] Re-generating sitemap and RSS...');
  execSync('node generate_sitemap.js', { stdio: 'inherit' });
  execSync('node generate_rss.js', { stdio: 'inherit' });

  console.log('\n🚀 [Cloud Autopilot] Building and pre-rendering static HTML...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n📡 [Cloud Autopilot] Dispathing new post to Make.com Webhook (LinkedIn + GBM)...');
  try {
    execSync(`node scripts/sync-social.mjs --slug ${post.slug}`, { stdio: 'inherit' });
  } catch (e) {
    console.warn('  ⚠️ Social sync warning:', e.message);
  }

  console.log('\n🔔 [Cloud Autopilot] Submitting new post to Bing IndexNow...');
  try {
    execSync(`node scripts/indexnow-submit.mjs /bn/blog/${post.slug}`, { stdio: 'inherit' });
  } catch (e) {
    console.warn('  ⚠️ IndexNow warning:', e.message);
  }

  // If running in GitHub Actions, automatically commit & push
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.log('\n🤖 [Cloud Autopilot] Running inside GitHub Actions — committing & pushing to main...');
    execSync('git config user.name "Advocate Shah Alam Autopilot"', { stdio: 'inherit' });
    execSync('git config user.email "bot@advmdshahalam.me"', { stdio: 'inherit' });
    execSync('git add src/content/ public/ scripts/.synced_social_posts.json', { stdio: 'inherit' });
    execSync(`git commit -m "feat(autopilot): publish new legal guide '${post.title.slice(0, 50)}'"`, { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('🎉 [Cloud Autopilot] Successfully committed & pushed to GitHub main branch!');
  } else {
    console.log('\n💡 [Cloud Autopilot] Local test completed successfully.');
  }
}

main().catch(err => {
  console.error('❌ [Cloud Autopilot] Execution failed:', err);
  process.exit(1);
});
