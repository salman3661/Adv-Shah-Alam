// scripts/cloud-autopilot.mjs
// Fully automated cloud pipeline:
// 1. Authenticates with Google APIs (Search Console & GA4) via googleapis
// 2. Extracts live search queries & traffic demand from GSC (last 14 days) and GA4
// 3. Dynamically prompts Gemini AI to select high-converting trending legal topic
// 4. Generates humanized, factual legal post via Google Gemini AI
// 5. Injects high-converting WhatsApp & Call consultation CTA card
// 6. Updates sitemap, RSS, and pre-renders static HTML
// 7. Dispatches post to Make.com for LinkedIn & Google Business Profile (GBM)
// 8. Submits new URL to Bing & IndexNow
// 9. Auto-commits and pushes to GitHub (triggers Vercel deployment)

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { google } from 'googleapis';

const ROOT = process.cwd();
const BN_POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');
const GSC_SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:advmdshahalam.me';
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '520583213';

// ── 1. Resolve GEMINI_API_KEY ────────────────────────────────────────────────
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

// Candidate Gemini models in priority order
const CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.1-pro-preview'
];

async function callGemini(prompt, temperature = 0.3) {
  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      console.log(`[Cloud Autopilot] Trying model: ${model}...`);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            responseMimeType: 'application/json'
          }
        })
      });

      const json = await res.json();
      if (json.candidates && json.candidates[0]?.content?.parts[0]?.text) {
        console.log(`✅ [Cloud Autopilot] Successfully generated content using ${model}`);
        const rawText = json.candidates[0].content.parts[0].text.trim();
        const cleaned = rawText.replace(/^```json/i, '').replace(/```$/i, '').trim();
        return JSON.parse(cleaned);
      } else {
        const errMsg = json.error?.message?.slice(0, 100) || JSON.stringify(json).slice(0, 100);
        console.warn(`⚠️ [Cloud Autopilot] ${model} unavailable:`, errMsg);
        lastError = new Error(errMsg);
      }
    } catch (err) {
      console.warn(`⚠️ [Cloud Autopilot] Error with ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All candidate Gemini models failed to respond.');
}

// ── 2. Google APIs Integration (Search Console & GA4) ────────────────────────
function parseServiceAccountCredentials(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();

  // Case A: JSON string
  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      console.warn('⚠️ [Cloud Autopilot] Failed to parse credentials JSON string:', e.message);
    }
  }

  // Case B: Base64-encoded JSON string
  if (!trimmed.includes('{') && trimmed.length > 80) {
    try {
      const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
      if (decoded.trim().startsWith('{')) {
        return JSON.parse(decoded);
      }
    } catch {}
  }

  // Case C: File path
  if (fs.existsSync(trimmed)) {
    try {
      return JSON.parse(fs.readFileSync(trimmed, 'utf8'));
    } catch (e) {
      console.warn('⚠️ [Cloud Autopilot] Failed to read credentials from file path:', e.message);
    }
  }

  return null;
}

function getGoogleAuth() {
  const envRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GSC_SERVICE_ACCOUNT;
  let credentials = parseServiceAccountCredentials(envRaw);

  // Fallback to local key file if available
  if (!credentials) {
    const localKeyPath = path.resolve(ROOT, 'gsc-service-account.json');
    if (fs.existsSync(localKeyPath)) {
      try {
        credentials = JSON.parse(fs.readFileSync(localKeyPath, 'utf8'));
      } catch (e) {
        console.warn('⚠️ [Cloud Autopilot] Failed to read local gsc-service-account.json:', e.message);
      }
    }
  }

  if (!credentials) {
    console.log('ℹ️ [Cloud Autopilot] No Google Service Account found. Continuing with intelligent legal fallbacks.');
    return null;
  }

  try {
    return new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/analytics.readonly'
      ]
    });
  } catch (err) {
    console.warn('⚠️ [Cloud Autopilot] Failed to initialize GoogleAuth:', err.message);
    return null;
  }
}

async function fetchGSCQueries(auth) {
  if (!auth) return [];
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const now = new Date();
    const endDate = now.toISOString().split('T')[0];
    const startDateObj = new Date();
    startDateObj.setDate(now.getDate() - 14); // 14-day trending window
    const startDate = startDateObj.toISOString().split('T')[0];

    console.log(`📡 [Cloud Autopilot] Fetching GSC search analytics for: ${GSC_SITE_URL}...`);
    const res = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50
      }
    });

    const rows = res.data?.rows || [];
    console.log(`✅ [Cloud Autopilot] GSC returned ${rows.length} active queries.`);
    return rows.map(r => ({
      query: r.keys[0],
      clicks: Math.round(r.clicks || 0),
      impressions: Math.round(r.impressions || 0),
      ctr: Number(((r.ctr || 0) * 100).toFixed(1)),
      position: Number((r.position || 0).toFixed(1))
    }));
  } catch (err) {
    console.warn('⚠️ [Cloud Autopilot] GSC query fetch failed:', err.message);
    return [];
  }
}

async function fetchGA4Pages(auth) {
  if (!auth) return [];
  try {
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
    console.log(`📡 [Cloud Autopilot] Fetching GA4 analytics for Property: ${GA4_PROPERTY_ID}...`);

    const res = await analyticsdata.properties.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: '14daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 35
      }
    });

    const rows = res.data?.rows || [];
    console.log(`✅ [Cloud Autopilot] GA4 returned ${rows.length} top visited pages.`);
    return rows.map(r => ({
      path: r.dimensionValues[0]?.value || '',
      title: r.dimensionValues[1]?.value || '',
      views: parseInt(r.metricValues[0]?.value || '0', 10),
      users: parseInt(r.metricValues[1]?.value || '0', 10)
    }));
  } catch (err) {
    console.warn('⚠️ [Cloud Autopilot] GA4 report fetch failed:', err.message);
    return [];
  }
}

// ── 3. Curated High-Converting Legal Fallback Bank (2026) ─────────────────────
const FALLBACK_LEGAL_TOPICS = [
  {
    topic: "অনলাইন সাইবার ক্রাইম জিডি ও ফেসবুক আইডি হ্যাক প্রতিকার ২০২৬",
    category: "সাইবার আইন",
    keyword: "অনলাইন জিডি করার নিয়ম",
    slugKey: "cyber-crime-gd",
    concept: "পুলিশ সাইবার সাপোর্ট ফর উইমেন, অনলাইন সাধারণ ডায়েরি (GD), ফেইক আইডি ও ফেসবুক হ্যাকের বিরুদ্ধে আইনি প্রমাণ সংরক্ষণ এবং মামলা।"
  },
  {
    topic: "চেক ডিজঅনার নোটিশ পাওয়ার পর আসামির আইনি আত্মরক্ষা ২০২৬",
    category: "ফৌজদারি আইন",
    keyword: "চেক ডিজঅনার নোটিশের জবাব",
    slugKey: "chek-dishonour-defense",
    concept: "এন আই অ্যাক্ট ১৩৮ ধারায় উকিল নোটিশ পাওয়ার ৩০ দিনের মধ্যে সঠিক লিগ্যাল রিপ্লাই পাঠানো, সিকিউরিটি চেক ও প্রতারণার বিরুদ্ধে ডিফেন্স।"
  },
  {
    topic: "আমমোক্তারনামা (Power of Attorney) তৈরি ও বাতিলের সম্পূর্ণ আইনি নিয়ম ২০২৬",
    category: "দলিল ও চুক্তি আইন",
    keyword: "পাওয়ার অফ অ্যাটর্নি বাতিলের নিয়ম",
    slugKey: "power-of-attorney-batil-niyom",
    concept: "পাওয়ার অফ অ্যাটর্নি আইন ২০১৫ অনুযায়ী প্রত্যাহারযোগ্য ও অপ্রত্যাহারযোগ্য আমমোক্তারনামা নিবন্ধন, বাতিল নোটিশ ও দেওয়ানি আদালতে চ্যালেঞ্জ।"
  },
  {
    topic: "সরকারি খাস জমি বন্দোবস্ত ও ডিসি অফিসে আবেদনের নিয়ম ২০২৬",
    category: "ভূমি আইন",
    keyword: "খাস জমি বন্দোবস্ত নিয়ম 2026",
    slugKey: "khas-jomi-bondobosto",
    concept: "কৃষি ও অকৃষি খাস জমি পাওয়ার যোগ্যতা, ভূমিহীন সনদ, সহকারী কমিশনার (ভূমি) ও জেলা প্রশাসকের নিকট আবেদনের ধাপ ও কবুলিয়ত।"
  },
  {
    topic: "বাড়ি ভাড়া চুক্তি ও ভাড়াটিয়া উচ্ছেদ আইনি নোটিশ ২০২৬",
    category: "চুক্তি ও দেওয়ানি আইন",
    keyword: "বাড়ি ভাড়া চুক্তি নিয়ম 2026",
    slugKey: "bari-bhara-chukti-uchhed",
    concept: "বাড়ি ভাড়া নিয়ন্ত্রণ আইন ও চুক্তিপত্রের ধারা, নোটিশ প্রদানের মেয়াদ এবং ভাড়াটিয়া উচ্ছেদে দেওয়ানি আদালতের কার্যপ্রণালী।"
  },
  {
    topic: "পারিবারিক সহিংসতা প্রতিরোধ ও সুরক্ষা আইন ২০২৬",
    category: "পারিবারিক আইন",
    keyword: "পারিবারিক সহিংসতা প্রতিরোধ আইন",
    slugKey: "paribarik-sohingshota-ain-protikar",
    concept: "পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন ২০১০-এর আওতায় সুরক্ষা আদেশ, বসবাসের অধিকার ও ক্ষতিপূরণ দাবি।"
  },
  {
    topic: "দোকান পজেশন ক্রয়-বিক্রয় চুক্তি ও জালিয়াতি প্রতিরোধ ২০২৬",
    category: "ব্যবসা ও চুক্তি আইন",
    keyword: "দোকান পজেশন চুক্তি",
    slugKey: "dokan-possession-chukti",
    concept: "দোকান পজেশন স্ট্যাম্প এগ্রিমেন্ট, মূল মালিকের অনুমতিপত্র ও পজেশন হস্তান্তর নিয়ে আইনি বিরোধের সমাধান।"
  },
  {
    topic: "স্ত্রী স্বেচ্ছায় ডিভোর্স দিলে দেনমোহর ও খোরপোশ আইন ২০২৬",
    category: "পারিবারিক আইন",
    keyword: "স্ত্রী ডিভোর্স দিলে দেনমোহর পাবে কি",
    slugKey: "stree-talak-denmohor-ain",
    concept: "খোলা তালাক, মোবারাত ও তালাক-ই-তৌফিজের মধ্যে পার্থক্য, স্ত্রী স্বেচ্ছায় ডিভোর্স দিলে দেনমোহর বা খোরপোশ মওকুফ হয় কি না।"
  },
  {
    topic: "নামজারি বাতিল ও সহকারী কমিশনার (ভূমি) বরাবরে মিস কেস দায়েরের নিয়ম ২০২৬",
    category: "ভূমি আইন",
    keyword: "নামজারি বাতিল মিস কেস",
    slugKey: "namjari-batil-miss-case",
    concept: "জাল দলিলের নামজারি বাতিল, সহকারী কমিশনার (ভূমি) বরাবরে মিস আপিল, এডিসি (রেভিনিউ) ও ল্যান্ড আপিল বোর্ডের প্রতিকার।"
  }
];

// ── 4. Dynamic Topic Extraction via Gemini AI (GSC + GA4 Driven) ─────────────
async function extractDynamicTopic({ gscQueries, ga4Pages, existingSlugs }) {
  // If we have live GSC or GA4 data, let Gemini synthesize the best unwritten topic
  if (gscQueries.length > 0 || ga4Pages.length > 0) {
    try {
      console.log('🧠 [Cloud Autopilot] Analyzing live GSC queries and GA4 visits via Gemini AI...');

      const topGscSummary = gscQueries.slice(0, 30).map((q, i) => `${i + 1}. "${q.query}" (Impressions: ${q.impressions}, Clicks: ${q.clicks})`).join('\n');
      const topGa4Summary = ga4Pages.slice(0, 15).map((p, i) => `${i + 1}. Path: ${p.path} (Views: ${p.views})`).join('\n');
      const existingSlugsList = Array.from(existingSlugs).slice(-80).join(', ');

      const topicSelectionPrompt = `
You are the Chief Legal Editorial Strategist for Advocate Md. Shah Alam, a renowned Senior Advocate of the Supreme Court of Bangladesh with chambers in Uttara, Dhaka and Court House Street, Kotwali.

Analyze the following real-time search demand from Google Search Console (GSC) and Google Analytics 4 (GA4) over the last 14 days for our legal website (advmdshahalam.me):

LIVE SEARCH CONSOLE QUERIES:
${topGscSummary || 'No recent GSC data'}

LIVE GA4 VISITED PAGES:
${topGa4Summary || 'No recent GA4 data'}

ALREADY PUBLISHED POST SLUGS (DO NOT DUPLICATE THESE):
${existingSlugsList}

TASK:
1. Identify a high-intent, rising legal problem or question actively searched by Bangladeshi citizens in 2026.
2. Select an unserved legal angle that solves real citizen problems (e.g. land dispute, bail, cybercrime, marriage/divorce, inheritance, criminal defense, cheque dishonour, mutation/miss case).
3. The topic MUST NOT be already covered by our existing post slugs.
4. Formulate a catchy, authoritative title in Bengali with year 2026, an English kebab-case slug ending with -2026, the category, primary keyword, and key concepts.

RETURN ONLY VALID RAW JSON matching this schema:
{
  "topic": "আকর্ষণীয় ও বাস্তবসম্মত বাংলা শিরোনাম ২০২৬",
  "category": "ভূমি আইন | দেওয়ানি আইন | ফৌজদারি আইন | পারিবারিক আইন | সাইবার আইন | কর আইন | ব্যবসা ও চুক্তি আইন",
  "keyword": "প্রধান সার্চ কিওয়ার্ড",
  "slug": "unique-english-kebab-slug-2026",
  "concept": "এই আর্টিকেলে সুনির্দিষ্ট কী কী আইনি ধারা, প্রক্রিয়া, আদালতের অভিজ্ঞতা ও বাস্তবিক সমাধানের নির্দেশনা থাকবে"
}
`;

      const candidate = await callGemini(topicSelectionPrompt, 0.4);

      if (candidate?.topic && candidate?.category && candidate?.keyword) {
        let cleanSlug = (candidate.slug || candidate.keyword.replace(/\s+/g, '-'))
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        if (!cleanSlug.endsWith('2026')) {
          cleanSlug = `${cleanSlug}-2026`;
        }

        // Verify non-duplication
        if (!existingSlugs.has(cleanSlug)) {
          console.log(`🎯 [Cloud Autopilot] Dynamically selected live trending topic: "${candidate.topic}"`);
          return {
            topic: candidate.topic,
            category: candidate.category,
            keyword: candidate.keyword,
            slug: cleanSlug,
            concept: candidate.concept || candidate.topic
          };
        } else {
          console.log(`ℹ️ [Cloud Autopilot] Gemini suggested slug '${cleanSlug}' already exists. Checking fallbacks...`);
        }
      }
    } catch (err) {
      console.warn('⚠️ [Cloud Autopilot] Dynamic topic extraction via Gemini warning:', err.message);
    }
  }

  // Fallback topic selection: scan curated legal topics
  console.log('ℹ️ [Cloud Autopilot] Selecting from curated 2026 legal fallback bank...');
  const fallbackTopic = FALLBACK_LEGAL_TOPICS.find(t => {
    return !Array.from(existingSlugs).some(s => s.toLowerCase().includes(t.slugKey));
  }) || FALLBACK_LEGAL_TOPICS[Math.floor(Math.random() * FALLBACK_LEGAL_TOPICS.length)];

  let fallbackSlug = fallbackTopic.slugKey;
  if (!fallbackSlug.endsWith('2026')) {
    fallbackSlug = `${fallbackSlug}-2026`;
  }

  if (existingSlugs.has(fallbackSlug)) {
    fallbackSlug = `${fallbackSlug}-${Date.now().toString().slice(-4)}`;
  }

  return {
    topic: fallbackTopic.topic,
    category: fallbackTopic.category,
    keyword: fallbackTopic.keyword,
    slug: fallbackSlug,
    concept: fallbackTopic.concept
  };
}

// ── 5. Generate the Full Legal Article via Gemini AI ──────────────────────────
async function generateArticle(selectedTopic) {
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
2. Legal accuracy: Cite exact Bangladesh statutes (e.g. Specific Relief Act 1877, Negotiable Instruments Act 1881, Registration Act 1908, Penal Code 1860, Muslim Family Laws Ordinance 1961, Code of Criminal Procedure 1898, etc.) where applicable.
3. Length: In-depth and exhaustive (minimum 1,500 words across all sections).
4. Hero Intro: Must naturally cite Advocate Md. Shah Alam with phone 01712655546 and chamber details.
5. Quick Answer: 3 to 4 actionable summary bullet points.
6. Sections: 6 to 8 structured sections, each with a clear 'h2' and rich HTML content (using <p>, <ul>, <li>, <ol>, <strong>).
7. FAQs: 4 practical frequently asked questions with direct answers.
8. Output Format: Return ONLY raw, valid JSON (no markdown triple backticks around the json, no preamble).

JSON SCHEMA:
{
  "slug": "${selectedTopic.slug}",
  "category": "${selectedTopic.category}",
  "title": "${selectedTopic.topic}",
  "metaTitle": "SEO অপ্টিমাইজড মেটা শিরোনাম (৬০-৭০ ক্যারেক্টার)",
  "metaDescription": "SEO মেটা বিবরণ (১৩০-১৬০ ক্যারেক্টার)",
  "keywords": ["${selectedTopic.keyword}", "আইনি পরামর্শ বাংলাদেশ", "অ্যাডভোকেট মো. শাহ আলম", "সুপ্রিম কোর্ট আইনজীবী"],
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

  return await callGemini(prompt, 0.3);
}

// ── 6. Main Autopilot Execution Pipeline ──────────────────────────────────────
async function main() {
  console.log('🚀 [Cloud Autopilot] Starting automated legal publisher...');

  // Step A: Load existing slugs to guarantee zero duplication
  if (!fs.existsSync(BN_POSTS_DIR)) {
    fs.mkdirSync(BN_POSTS_DIR, { recursive: true });
  }

  const existingFiles = fs.readdirSync(BN_POSTS_DIR).filter(f => f.endsWith('.json'));
  const existingSlugs = new Set(existingFiles.map(f => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(BN_POSTS_DIR, f), 'utf8'));
      return data.slug || f.replace('.json', '');
    } catch {
      return f.replace('.json', '');
    }
  }));

  console.log(`📚 [Cloud Autopilot] Indexed ${existingSlugs.size} existing Bengali posts.`);

  // Step B: Connect to Google APIs (GSC & GA4) via googleapis
  const auth = getGoogleAuth();
  const [gscQueries, ga4Pages] = await Promise.all([
    fetchGSCQueries(auth),
    fetchGA4Pages(auth)
  ]);

  // Step C: Dynamically extract the highest-demand legal topic
  const selectedTopic = await extractDynamicTopic({ gscQueries, ga4Pages, existingSlugs });
  console.log(`📌 [Cloud Autopilot] Final Selected Topic: "${selectedTopic.topic}" [${selectedTopic.category}] (Slug: ${selectedTopic.slug})`);

  // Step D: Generate Full Article via Gemini
  const post = await generateArticle(selectedTopic);

  if (!post.slug || !post.title || !post.sections || post.sections.length === 0) {
    throw new Error('Generated post missing required fields (slug, title, sections)');
  }

  // Guarantee slug ends with -2026
  if (!post.slug.endsWith('2026')) {
    post.slug = `${post.slug}-2026`;
  }

  // Safeguard against duplicate slug
  let finalSlug = post.slug;
  let targetFile = path.join(BN_POSTS_DIR, `${finalSlug}.json`);
  if (existingSlugs.has(finalSlug) || fs.existsSync(targetFile)) {
    finalSlug = `${finalSlug.replace(/-2026$/, '')}-${Date.now().toString().slice(-4)}-2026`;
    post.slug = finalSlug;
    targetFile = path.join(BN_POSTS_DIR, `${finalSlug}.json`);
  }

  // Record published timestamps so it ranks #1 at the top of the blog page
  const now = new Date();
  post.publishedDate = now.toISOString().split('T')[0];
  post.publishedAt = now.toISOString();
  post.lastModified = now.toISOString().split('T')[0];

  // High-converting CTA and WhatsApp Consultation Card injection for Section 7 / final section
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

  // Step E: Save new post JSON cleanly
  fs.writeFileSync(targetFile, JSON.stringify(post, null, 2), 'utf8');
  console.log(`✅ [Cloud Autopilot] Saved new post: ${targetFile}`);

  // Step F: Re-generate sitemap, RSS, build, and pre-render
  console.log('\n🔄 [Cloud Autopilot] Re-generating sitemap and RSS...');
  execSync('node generate_sitemap.js', { stdio: 'inherit' });
  execSync('node generate_rss.js', { stdio: 'inherit' });

  console.log('\n🚀 [Cloud Autopilot] Building and pre-rendering static HTML...');
  execSync('npm run build', { stdio: 'inherit' });

  // Step G: Dispatch post to Make.com Webhook (LinkedIn + Google Business Profile)
  console.log('\n📡 [Cloud Autopilot] Dispathing new post to Make.com Webhook (LinkedIn + GBM)...');
  try {
    execSync(`node scripts/sync-social.mjs --slug ${post.slug}`, { stdio: 'inherit' });
  } catch (e) {
    console.warn('  ⚠️ Social sync warning:', e.message);
  }

  // Step H: Submit new post to Bing IndexNow
  console.log('\n🔔 [Cloud Autopilot] Submitting new post to Bing IndexNow...');
  try {
    execSync(`node scripts/indexnow-submit.mjs /bn/blog/${post.slug}`, { stdio: 'inherit' });
  } catch (e) {
    console.warn('  ⚠️ IndexNow warning:', e.message);
  }

  // Step I: Automatically commit & push to GitHub if running inside GitHub Actions
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
