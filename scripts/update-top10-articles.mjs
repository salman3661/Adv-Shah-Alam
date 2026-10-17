/**
 * scripts/update-top10-articles.mjs
 * Generates and updates the Top 10 High-Demand Legal Guides for 2026
 * with complete legal drafting, SEO hooks, Quick Answer boxes, and conversion CTAs.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const CTA_BN = `
<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(135deg, rgba(184,146,42,0.1), rgba(184,146,42,0.03));border:1.5px solid rgba(184,146,42,0.3);border-radius:1rem;">
  <h4 style="margin:0 0 0.75rem;color:var(--gold);font-size:1.15rem;font-weight:700;">⚖️ জরুরি আইনি সহায়তা ও চেম্বার অ্যাপয়েন্টমেন্ট</h4>
  <p style="margin:0 0 1rem;font-size:0.95rem;line-height:1.6;color:var(--text-secondary);">
    আপনার মামলা বা আইনি সংকট নিয়ে বাংলাদেশ সুপ্রিম কোর্টের নিয়মিত প্র্যাকটিসিং আইনজীবী <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর সাথে সরাসরি কথা বলুন বা আপনার নথিপত্র পর্যালোচনা করিয়ে নিন।
  </p>
  <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
    <a href="https://wa.me/8801712655546" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;background:#25D366;color:#fff;padding:0.6rem 1.25rem;border-radius:0.5rem;text-decoration:none;font-weight:700;font-size:0.9rem;">
      💬 WhatsApp পরামর্শ (+8801712655546)
    </a>
    <a href="tel:01712655546" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--accent);color:#111;padding:0.6rem 1.25rem;border-radius:0.5rem;text-decoration:none;font-weight:700;font-size:0.9rem;">
      📞 সরাসরি কল করুন (01712655546)
    </a>
    <a href="/contact" style="color:var(--text);text-decoration:underline;font-size:0.9rem;font-weight:600;margin-left:0.5rem;">
      চেম্বার ঠিকানা ও এপয়েন্টমেন্ট →
    </a>
  </div>
  <p style="margin:0.75rem 0 0;font-size:0.85rem;color:var(--text-muted);">
    📍 চেম্বার ১: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা, ঢাকা-১২৩০ | চেম্বার ২: সুপ্রিম কোর্ট বার সমিতি ভবন, ঢাকা।
  </p>
</div>
`;

const CTA_EN = `
<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(135deg, rgba(184,146,42,0.1), rgba(184,146,42,0.03));border:1.5px solid rgba(184,146,42,0.3);border-radius:1rem;">
  <h4 style="margin:0 0 0.75rem;color:var(--gold);font-size:1.15rem;font-weight:700;">⚖️ Urgent Case Evaluation & Legal Consultation</h4>
  <p style="margin:0 0 1rem;font-size:0.95rem;line-height:1.6;color:var(--text-secondary);">
    Facing property litigation, criminal arrest risk, commercial dispute or constitutional infringement? Consult directly with <strong>Advocate Md. Shah Alam</strong>, Advocate, Supreme Court of Bangladesh.
  </p>
  <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
    <a href="https://wa.me/8801712655546" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;background:#25D366;color:#fff;padding:0.6rem 1.25rem;border-radius:0.5rem;text-decoration:none;font-weight:700;font-size:0.9rem;">
      💬 WhatsApp Chambers (+8801712655546)
    </a>
    <a href="tel:01712655546" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--accent);color:#111;padding:0.6rem 1.25rem;border-radius:0.5rem;text-decoration:none;font-weight:700;font-size:0.9rem;">
      📞 Direct Call (01712655546)
    </a>
    <a href="/contact" style="color:var(--text);text-decoration:underline;font-size:0.9rem;font-weight:600;margin-left:0.5rem;">
      Chamber Address & Booking →
    </a>
  </div>
  <p style="margin:0.75rem 0 0;font-size:0.85rem;color:var(--text-muted);">
    📍 Chamber 1: House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230 | Chamber 2: Supreme Court Bar Association Annex, Dhaka.
  </p>
</div>
`;

// Helper to save article
function savePost(lang, filename, postData) {
  const filePath = path.join(root, 'src', 'content', 'posts', lang, filename);
  fs.writeFileSync(filePath, JSON.stringify(postData, null, 2), 'utf8');
  console.log(`[SAVED] ${lang}/${filename}`);
}

// -------------------------------------------------------------
// 1. (Bengali) ভূমি অপরাধ আইন ২০২৬
// -------------------------------------------------------------
const post1 = {
  slug: "bhumi-oporadh-ain-2026-jomi-dakhol-vuya-dalil-protikar-bn",
  enSlug: null,
  title: "ভূমি অপরাধ আইন ২০২৬: জমি দখল, ভুয়া দলিল ও জালিয়াতির বিরুদ্ধে তাৎক্ষণিক আইনি প্রতিকার ও মামলা করার নিয়ম",
  category: "সম্পত্তি আইন",
  readTime: "১২ মিনিট পড়ুন",
  metaTitle: "ভূমি অপরাধ আইন ২০২৬: জমি দখল ও ভুয়া দলিল প্রতিকার ও নিয়ম",
  metaDescription: "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৬ অনুযায়ী জমি দখল, ভুয়া দলিল ও জালিয়াতির বিরুদ্ধে ম্যাজিস্ট্রেট কোর্ট ও দেওয়ানি প্রতিকার, উচ্ছেদ এবং মামলার পূর্ণাঙ্গ নিয়ম।",
  keywords: [
    "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৬",
    "জমি দখল উদ্ধারের আইনি উপায়",
    "ভুয়া দলিল বাতিল করার নিয়ম",
    "জাল খতিয়ান সংশোধনের মামলা",
    "জমি জালিয়াতির সাজা বাংলাদেশ",
    "জমি দখলের ম্যাজিস্ট্রেট কোর্টে আবেদন",
    "সহকারী কমিশনার ভূমি উচ্ছেদ দরখাস্ত"
  ],
  publishedDate: "2026-07-24",
  lastModified: "2026-10-17",
  heroIntro: "বাংলাদেশে বহুল আলোচিত <strong>ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন</strong> কার্যকর হওয়ার ফলে জমি দখল, ভুয়া দলিল তৈরি, সীমানা বিকৃতকরণ এবং ওয়ারিশদের বঞ্চিত করার সংস্কৃতিতে বৈপ্লবিক পরিবর্তন এসেছে। পূর্বে জমি দখলের ঘটনা শুধুই দীর্ঘমেয়াদি দেওয়ানি মামলা হিসেবে বছরের পর বছর ঝুলে থাকত। বর্তমানে এই নতুন আইনের আওতায় জবরদখল ও দলিল জালিয়াতি আমলযোগ্য (Cognizable) এবং জামিন-অযোগ্য (Non-bailable) ফৌজদারি অপরাধ। আপনার বৈধ জমি বেদখল হলে বা জাল দলিলের মুখে পড়লে কী কী আইনি পদক্ষেপ গ্রহণ করবেন, তা নিচে বিস্তারিত আলোচনা করা হলো। জরুরি প্রয়োজনে বাংলাদেশ সুপ্রিম কোর্টের অভিজ্ঞ আইনজীবী <a href=\"/advocate-md-shah-alam\" style=\"color:var(--accent);font-weight:700;\">অ্যাডভোকেট মো. শাহ আলম</a>-এর সরাসরি পরামর্শ নিতে পারেন।",
  quickAnswer: {
    heading: "⚡ এক নজরে: নতুন ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৬",
    points: [
      "আইনগত পরিবর্তন: জমি জবরদখল ও ভুয়া দলিল তৈরি এখন সরাসরি আমলযোগ্য এবং জামিন-অযোগ্য ফৌজদারি অপরাধ।",
      "শাস্তির বিধান: জাল দলিল তৈরি ও রেজিস্ট্রেশনে সর্বোচ্চ ৭ বছর এবং অবৈধ জমি দখলে ২ থেকে ৭ বছর পর্যন্ত সশ্রম কারাদণ্ড ও অর্থদণ্ড।",
      "তাৎক্ষণিক প্রতিকার: অতিরিক্ত জেলা ম্যাজিস্ট্রেট (ADM) বা এক্সিকিউটিভ ম্যাজিস্ট্রেট কোর্টে ধারা ৮ ও ৯ মোতাবেক উচ্ছেদ ও দখল পুনরুদ্ধারের সরাসরি আবেদন।",
      "ভুয়া দলিল বাতিল: দেওয়ানি আদালতে সুনির্দিষ্ট প্রতিকার আইনের ৩৯ ধারা এবং থানায় দণ্ডবিধির ৪২০/৪৬৭/৪৬৮/৪৭১ ধারায় মামলা দায়ের।",
      "বিশেষজ্ঞ পরামর্শ: উত্তরা ও সুপ্রিম কোর্ট চেম্বারে সরাসরি আইনজীবী পরামর্শ ও মামলা পরিচালনার জন্য কল করুন: +৮৮০ ১৭১২-৬৫৫৫৪৬।"
    ]
  },
  toc: [
    "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইনের প্রধান অপরাধ ও শাস্তির বিধান",
    "আপনার জমি বেদখল হলে তাৎক্ষণিক কী করবেন? (Step-by-Step Procedure)",
    "ভুয়া বা জাল দলিল কীভাবে বাতিল করবেন? (দেওয়ানি ও ফৌজদারি প্রতিকার)",
    "খতিয়ান জালিয়াতি, নামজারি বিকৃতি ও সীমানা বিরোধের প্রতিকার",
    "পুলিশ ও ম্যাজিস্ট্রেট প্রশাসনের মাধ্যমে উচ্ছেদ ও দখল পুনরুদ্ধার",
    "আদালতে মামলা করার সঠিক প্রক্রিয়া ও প্রয়োজনীয় প্রমাণাদি",
    "প্রবাসীদের (NRB) জমি সুরক্ষায় বিশেষ আইনি পদক্ষেপ",
    "আইনজীবীর সহায়তায় দ্রুত জমি পুনরুদ্ধারের কৌশল",
    "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
  ],
  sections: [
    {
      h2: "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইনের প্রধান অপরাধ ও শাস্তির বিধান",
      content: `
        <p>নতুন ভূমি অপরাধ আইনের সবচেয়ে যুগান্তকারী দিক হলো — এটি জমি সংক্রান্ত বিরোধকে শুধুই দেওয়ানি আদালতের জটিলতায় সীমাবদ্ধ না রেখে দ্রুত বিচার উপযোগী ফৌজদারি অপরাধ হিসেবে স্বীকৃতি দিয়েছে।</p>
        <p><strong>আইনটির প্রধান অপরাধ ও দণ্ডসমূহ:</strong></p>
        <ul>
          <li><strong>জাল বা ভুয়া দলিল তৈরি (ধারা ৪ ও ৫):</strong> অন্যের জমিতে নিজের মালিকানা দাবি করে জাল দলিল, পাওয়ার অব অ্যাটর্নি বা জাল বায়া দলিল প্রস্তুত বা ব্যবহার করলে সর্বোচ্চ <strong>৭ বছর কারাদণ্ড ও অর্থদণ্ড</strong>।</li>
          <li><strong>বৈধ মালিককে উচ্ছেদ ও অবৈধ দখল (ধারা ৭ ও ৮):</strong> বলপ্রয়োগ বা প্রতারণার মাধ্যমে কোনো বৈধ মালিককে তার জমি থেকে উচ্ছেদ করা হলে দোষী ব্যক্তির <strong>২ থেকে ৭ বছর সশ্রম কারাদণ্ড</strong> হবে।</li>
          <li><strong>একই জমি একাধিকবার বিক্রয় (ধারা ৬):</strong> বিক্রিত জমি পুনরায় অন্য কোনো তৃতীয় পক্ষের কাছে হস্তান্তর করলে প্রতারণার দায়ে সর্বোচ্চ <strong>৫ বছর কারাদণ্ড</strong>।</li>
          <li><strong>সীমানা বিনষ্ট বা পরিবর্তন (ধারা ১০):</strong> অন্যের সীমানা পিলার উপড়ে ফেলা বা নকশা অনুযায়ী সীমানা বিকৃত করলে <strong>২ বছর পর্যন্ত কারাদণ্ড</strong>।</li>
        </ul>
      `
    },
    {
      h2: "আপনার জমি বেদখল হলে তাৎক্ষণিক কী করবেন? (Step-by-Step Procedure)",
      content: `
        <p>আপনার ভোগদখলীয় জমিতে যদি কোনো দখলবাজ বা প্রভাবশালী ব্যক্তি প্রবেশের চেষ্টা করে বা আপনাকে উচ্ছেদ করে, তবে নিচের ৩টি ধাপে পদক্ষেপ নিন:</p>
        <ol>
          <li><strong>ধাপ ১: স্থানীয় থানায় জিডি ও জরুরি পুলিশ কল:</strong> অবিলম্বে নিকটস্থ থানায় একটি সাধারণ ডায়েরি (GD) দায়ের করুন যাতে দখলের তারিখ, সময়, অভিযুক্ত ব্যক্তিদের নাম ও হুমকির বিবরণ সুস্পষ্ট থাকে।</li>
          <li><strong>ধাপ ২: অতিরিক্ত জেলা ম্যাজিস্ট্রেট (ADM) আদালতে ফৌজদারি কার্যবিধির ১৪৫ ধারা:</strong> শান্তিশৃঙ্খলা বজায় রাখা এবং বিরোধীয় জমিতে যেকোনো ধরণের প্রবেশ ও নির্মাণকাজে অন্তর্বর্তীকালীন নিষেধাজ্ঞা জারির জন্য দ্রুত পিটিশন মামলা করুন।</li>
          <li><strong>ধাপ ৩: নতুন ভূমি অপরাধ আইনে ম্যাজিস্ট্রেট বরাবর আবেদন:</strong> নির্বাহী ম্যাজিস্ট্রেট আদালতে দখল পুনরুদ্ধারের জন্য সুনির্দিষ্ট আবেদন জমা দিলে আদালত সংশ্লিষ্ট এসি ল্যান্ড (ভূমি) ও পুলিশকে সরেজমিন তদন্তের নির্দেশ প্রদান করেন এবং তদন্ত রিপোর্ট সাপেক্ষে উচ্ছেদ অভিযান পরিচালনা করেন।</li>
        </ol>
      `
    },
    {
      h2: "ভুয়া বা জাল দলিল কীভাবে বাতিল করবেন? (দেওয়ানি ও ফৌজদারি প্রতিকার)",
      content: `
        <p>যদি জানতে পারেন যে আপনার জমির ওপর কোনো জালিয়াত চক্র ভুয়া সাব-কবালা বা দানপত্র দলিল রেজিস্ট্রি করে নিয়েছে, তবে এটি বাতিলের জন্য দেওয়ানি ও ফৌজদারি দুটি পথই একসাথে ব্যবহার করতে হবে:</p>
        <ul>
          <li><strong>দেওয়ানি আদালতে দলিল বাতিলের মোকদ্দমা:</strong> <em>সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭ (Specific Relief Act, 1877) এর ধারা ৩৯</em> অনুযায়ী বিজ্ঞ সহকারী জজ আদালতে দলিল বাতিলের আরজি দাখিল করতে হবে। তামাদি আইন অনুযায়ী জাল দলিলের তথ্য জানার ৩ বছরের মধ্যে এ মামলা করা আবশ্যক।</li>
          <li><strong>ফৌজদারি মামলা:</strong> দণ্ডবিধির (Penal Code) ধারা ৪২০ (প্রতারণা), ৪৬৭ (মূল্যবান জামানত জালিয়াতি), ৪৬৮ (প্রতারণার উদ্দেশ্যে জালিয়াতি) ও ৪৭১ ধারায় সংশ্লিষ্ট ম্যাজিস্ট্রেট আদালতে বা থানায় নিয়মিত এফআইআর (FIR) রুজু করতে হবে।</li>
        </ul>
      `
    },
    {
      h2: "খতিয়ান জালিয়াতি, নামজারি বিকৃতি ও সীমানা বিরোধের প্রতিকার",
      content: `
        <p>জরিপ চলাকালীন অসৎ কর্মচারীদের সাথে যোগসাজশে অন্যের নামে খতিয়ান রেকর্ড হয়ে গেলে আতঙ্কিত হওয়ার কিছু নেই:</p>
        <ul>
          <li><strong>ল্যান্ড সার্ভে ট্রাইব্যুনাল (LST) মোকদ্দমা:</strong> বিএস বা সিটি জরিপের চূড়ান্ত রেকর্ডে ভুল হলে বিজ্ঞ ল্যান্ড সার্ভে ট্রাইব্যুনালে খতিয়ান সংশোধনের আবেদন করতে হবে।</li>
          <li><strong>এসি ল্যান্ড অফিসে মিস কেস (Miss Case):</strong> জাল দলিলের ভিত্তিতে যদি কেউ আপনার জমি নামজারি (Mutation) করিয়ে নেয়, তবে সহকারী কমিশনার (ভূমি) বরাবরে নামজারি বাতিলের মিস কেস দায়ের করে খতিয়ান বাতিল করানো যায়।</li>
        </ul>
      `
    },
    {
      h2: "পুলিশ ও ম্যাজিস্ট্রেট প্রশাসনের মাধ্যমে উচ্ছেদ ও দখল পুনরুদ্ধার",
      content: `
        <p>নতুন ভূমি অপরাধ আইনের ৮ ধারা মোতাবেক নির্বাহী ম্যাজিস্ট্রেটকে প্রশাসনিক ক্ষমতা দেওয়া হয়েছে যাতে তিনি সরেজমিন শুনানি ও কাগজপত্রের বৈধতা যাচাই করে অবৈধ দখলদারকে উচ্ছেদের সরাসরি নির্দেশ দিতে পারেন।</p>
        <p>উচ্ছেদ অভিযানের সময় নির্বাহী ম্যাজিস্ট্রেটের সাথে স্থানীয় পুলিশ প্রশাসন উপস্থিত থেকে বলপূর্বক দখলকারীকে উৎখাত করে প্রকৃত বৈধ মালিকের অনুকূলে সীমানা হস্তান্তর করে থাকেন।</p>
      `
    },
    {
      h2: "আদালতে মামলা করার সঠিক প্রক্রিয়া ও প্রয়োজনীয় প্রমাণাদি",
      content: `
        <p>আদালতে বা ম্যাজিস্ট্রেট কোর্টে শুনানির সময় প্রয়োজনীয় মূল বা সত্যায়িত কাগজপত্র উপস্থাপন করতে হবে:</p>
        <ul>
          <li>মূল ক্রয় দলিল (Title Deed) ও বায়া দলিলের ধারাবাহিক চেইন।</li>
          <li>সিএস, এসএ, আরএস ও হাল বিএস/সিটি জরিপ খতিয়ানের সার্টিফাইড কপি।</li>
          <li>হাল সনের ই-নামজারি খতিয়ান (E-Mutation) ও ডিসিআর (DCR)।</li>
          <li>ভূমি উন্নয়ন কর (অনলাইন খাজনা) পরিশোধের দাখিলা।</li>
          <li>সরেজমিন দখল প্রমাণের জন্য জিডি কপি, সার্ভেয়ারের সীমানা রিপোর্ট বা আলোকচিত্র।</li>
        </ul>
      `
    },
    {
      h2: "প্রবাসীদের (NRB) জমি সুরক্ষায় বিশেষ আইনি পদক্ষেপ",
      content: `
        <p>যেসব প্রবাসী নাগরিক যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা বা মধ্যপ্রাচ্যে বসবাস করছেন, দেশে তাদের অনুপস্থিতির সুযোগ নিয়ে ওয়ারিশান বা ক্রয়কৃত জমি দখলের চেষ্টা বেশি দেখা যায়।</p>
        <p>প্রবাসীদের করণীয় হলো — পাওয়ার অব অ্যাটর্নি আইন ২০১২ অনুযায়ী সংশ্লিষ্ট দেশের বাংলাদেশ দূতাবাস থেকে পাওয়ার অব অ্যাটর্নি প্রত্যয়ন করিয়ে পররাষ্ট্র মন্ত্রণালয়ের মাধ্যমে দেশে রেজিস্ট্রি করা এবং সুপ্রিম কোর্টের একজন বিশ্বস্ত আইনজীবীর মাধ্যমে আইনি নজরদারি বহাল রাখা।</p>
      `
    },
    {
      h2: "আইনজীবীর সহায়তায় দ্রুত জমি পুনরুদ্ধারের কৌশল",
      content: `
        <p>ভূমি সংক্রান্ত মামলায় দীর্ঘসূত্রিতা এড়াতে অভিজ্ঞ লিগ্যাল কাউন্সেল নিয়োগ করা অপরিহার্য। সুপ্রিম কোর্ট আইনজীবী <strong>অ্যাডভোকেট মো. শাহ আলম</strong> ভূমি আইন, দলিল তল্লাশি, দেওয়ানি স্বত্ব মামলা এবং ম্যাজিস্ট্রেট কোর্টের উচ্ছেদ পিটিশনে দীর্ঘদিন ধরে বিশ্বস্ত সেবা প্রদান করে আসছেন।</p>
        ${CTA_BN}
      `
    }
  ],
  faqs: [
    {
      question: "নতুন ভূমি অপরাধ আইনে মামলা কোথায় করতে হয়?",
      answer: "নতুন আইনের অধীনে অপরাধের প্রতিকারের জন্য সংশ্লিষ্ট এলাকার জুডিশিয়াল ম্যাজিস্ট্রেট আদালত বা সহকারী কমিশনার (ভূমি) ও অতিরিক্ত জেলা ম্যাজিস্ট্রেট (ADM) এর কার্যালয়ে নির্ধারিত ফরমে অভিযোগ দাখিল করা যায়।"
    },
    {
      question: "জমি দখল হয়ে গেলে কি পুলিশ সরাসরি উচ্ছেদ করতে পারে?",
      answer: "পুলিশ ফৌজদারি শান্তি বজায় রাখার জন্য পদক্ষেপ নিতে পারে, তবে স্থায়ী উচ্ছেদের জন্য বিজ্ঞ নির্বাহী ম্যাজিস্ট্রেট বা দেওয়ানি আদালতের সুস্পষ্ট উচ্ছেদ আদেশ বা ডিগ্রি প্রয়োজন হয়।"
    },
    {
      question: "ভুয়া দলিল বাতিল করতে কতদিন সময় লাগে?",
      answer: "দেওয়ানি আদালতে সুনির্দিষ্ট প্রতিকার আইনের ৩৯ ধারায় নিয়মিত মামলা সাধারণত ১ থেকে ২ বছর সময় নিতে পারে, তবে অন্তর্বর্তীকালীন নিষেধাজ্ঞা (Injunction) কয়েক সপ্তাহের মধ্যেই পাওয়া সম্ভব।"
    },
    {
      question: "নামজারি খতিয়ান জাল হলে এসি ল্যান্ড কী ব্যবস্থা নেন?",
      answer: "প্রতারণামূলক নামজারির বিরুদ্ধে মিস কেস দায়ের করলে এসি ল্যান্ড উভয় পক্ষের শুনানি নিয়ে জাল খতিয়ান তাৎক্ষণিকভাবে বাতিল (Cancel) করে পূর্বের খতিয়ান বহাল রাখতে পারেন।"
    }
  ],
  relatedServiceLinks: [
    { text: "ভূমি ও সম্পত্তি আইন সেবা", to: "/services/land-lawyer" },
    { text: "সুপ্রিম কোর্ট আইনজীবী ঢাকা", to: "/services/supreme-court-lawyer" }
  ],
  lang: "bn",
  isDraft: false
};

// -------------------------------------------------------------
// 2. (English) How to Check Land Ownership Online 2026
// -------------------------------------------------------------
const post2 = {
  slug: "check-land-ownership-bangladesh-online-khatian-mutation-porcha",
  bnSlug: null,
  title: "How to Check Land Ownership in Bangladesh Online: Complete Khatian, Mutation & Porcha Verification Guide 2026",
  category: "Property Law",
  readTime: "11 min read",
  metaTitle: "How to Check Land Ownership in Bangladesh Online (2026 Guide)",
  metaDescription: "Step-by-step 2026 guide to checking land ownership in Bangladesh online. Verify CS/SA/RS/BS Khatian, e-Porcha, Mutation, and DCR before buying property.",
  keywords: [
    "check land ownership in Bangladesh online",
    "e-porcha verification bangladesh 2026",
    "online khatian check land gov bd",
    "mutation online verification 2026",
    "land ownership search dhaka",
    "RS BS khatian check online",
    "fake porcha verification lawyer"
  ],
  publishedDate: "2026-10-04",
  lastModified: "2026-10-17",
  heroIntro: "With the full digitalization of land records under the Ministry of Land and the Directorate of Land Records and Surveys (DLRS), verifying property ownership in Bangladesh no longer requires visiting tehsils blindly. Buyers, institutional investors, and Non-Resident Bangladeshis (NRBs) can now inspect historical Khatians, mutation orders, and land tax receipts from anywhere in the world. However, digital portals do not detect un-registered mortgages, forged title deeds, or undisclosed heirs. This comprehensive 2026 verification guide by <strong>Advocate Md. Shah Alam</strong> (Advocate, Supreme Court of Bangladesh) explains how to verify property records online and what offline checks remain indispensable.",
  quickAnswer: {
    heading: "⚡ Quick Verification Breakdown: Online Land Records in Bangladesh",
    points: [
      "e-Porcha Portal (eporcha.gov.bd): Free digital search for CS, SA, RS, and BS Khatians; ৳100 government fee for certified copy delivery.",
      "e-Mutation Portal (mutation.land.gov.bd): Verify ownership transfer status, AC Land order sheet, DCR (Duplicate Carbon Receipt), and QR-coded certificate.",
      "Land Development Tax (ldtax.gov.bd): Inspect holding numbers and annual tax payments to confirm active lawful possession.",
      "Sub-Registry Physical Search: Online databases do NOT confirm deed authenticity—always conduct a 12-to-30-year volume index search (Balaam Boi) at the local Sub-Registry Office.",
      "Legal Title Vetting: For property purchases in Dhaka, Uttara, or anywhere in Bangladesh, consult Supreme Court Advocate Md. Shah Alam at +8801712655546."
    ]
  },
  toc: [
    "Why Online Land Verification is Mandatory Before Any Property Purchase",
    "Understanding the Survey Chain: CS, SA, RS, and BS/City Khatians",
    "Step-by-Step: How to Search Khatian (Porcha) Online on eporcha.gov.bd",
    "Checking Mutation (Namjari) & DCR Authenticity on mutation.land.gov.bd",
    "Verifying Land Development Tax (LD Tax / Khajna) Online",
    "Critical Limitations: What Online Portals Cannot Reveal",
    "The Lawyer's Offline Title Search: Balaam Boi & Non-Encumbrance (NEC)",
    "Document Checklist Before Paying Earnest Money (Baina)",
    "Frequently Asked Questions (FAQ)"
  ],
  sections: [
    {
      h2: "Why Online Land Verification is Mandatory Before Any Property Purchase",
      content: `
        <p>Purchasing real estate in Bangladesh without rigorous due diligence carries substantial risk of fraud, double sales, and inheritance disputes. The Ministry of Land's digital infrastructure allows buyers to review records of rights instantly, preventing obvious impersonation and forged surveys.</p>
        <p>However, digital records represent fiscal survey entries (presumption of possession) rather than indisputable evidence of legal title. A verified property must possess an unbroken chain of ownership connecting the oldest cadastral survey down to the present vendor.</p>
      `
    },
    {
      h2: "Understanding the Survey Chain: CS, SA, RS, and BS/City Khatians",
      content: `
        <p>To establish clean title, your legal counsel will inspect each successive land survey conducted across Bangladesh:</p>
        <ul>
          <li><strong>CS (Cadastral Survey - 1888–1940):</strong> The baseline colonial survey establishing historical root title.</li>
          <li><strong>SA (State Acquisition Survey - 1956–1962):</strong> Created after the abolition of the zamindari system to record tenant-farmers.</li>
          <li><strong>RS (Revisional Survey - 1966–1990s):</strong> Updated survey rectifying SA discrepancies and reflecting partitioned plots.</li>
          <li><strong>BS / City Survey (Bangladesh Survey - 1998–Present):</strong> The latest survey in Dhaka, Chittagong, and major municipalities. Mutation must match the BS Khatian.</li>
        </ul>
      `
    },
    {
      h2: "Step-by-Step: How to Search Khatian (Porcha) Online on eporcha.gov.bd",
      content: `
        <p>Follow these official steps to inspect or download records on <a href="https://eporcha.gov.bd" target="_blank" rel="noopener">eporcha.gov.bd</a>:</p>
        <ol>
          <li>Navigate to the <em>Survey Khatian (জরিপ খতিয়ান)</em> module on the homepage.</li>
          <li>Select the <strong>Division (বিভাগ)</strong>, <strong>District (জেলা)</strong>, <strong>Upazila/Thana (উপজেলা)</strong>, and exact <strong>Mouza with JL Number</strong>.</li>
          <li>Choose the survey type: CS, SA, RS, or BS.</li>
          <li>Enter the Khatian Number or Dag (Plot) Number, or search by the recorded owner’s name.</li>
          <li>View the online preview showing plot shares, boundaries, and recorded owners.</li>
          <li>For legal proceedings or registration, apply online for a certified certified copy (সার্টিফাইড কপি) by paying the statutory fee (৳100).</li>
        </ol>
      `
    },
    {
      h2: "Checking Mutation (Namjari) & DCR Authenticity on mutation.land.gov.bd",
      content: `
        <p>Whenever land changes hands through purchase, gift (Heba), or inheritance, the buyer must mutate their name under Section 143 of the State Acquisition and Tenancy Act 1950. To verify a mutation:</p>
        <ul>
          <li>Log onto <a href="https://mutation.land.gov.bd" target="_blank" rel="noopener">mutation.land.gov.bd</a> and enter the <strong>Application ID</strong> or <strong>Khatian Number</strong>.</li>
          <li>Inspect the <strong>AC Land Order Sheet</strong> to verify whether due process, newspaper notices, and hearing of all co-sharers occurred.</li>
          <li>Confirm the <strong>Duplicate Carbon Receipt (DCR)</strong> showing payment of the ৳1,170 government mutation fee.</li>
          <li>Scan the QR code on the computerized Mutation Certificate to ensure it matches the database of the Ministry of Land.</li>
        </ul>
      `
    },
    {
      h2: "Verifying Land Development Tax (LD Tax / Khajna) Online",
      content: `
        <p>Since 2023, manual land tax collection in Bangladesh has ceased. All taxes must be cleared via <a href="https://ldtax.gov.bd" target="_blank" rel="noopener">ldtax.gov.bd</a>.</p>
        <p>Request the vendor’s Holding Number and NID-linked profile. The digital Dakhila (tax receipt) must reflect cleared arrears up to the current fiscal year (১৪৩২-১৪৩৩ বঙ্গাব্দ / 2026). Incomplete tax records obstruct smooth deed registration.</p>
      `
    },
    {
      h2: "Critical Limitations: What Online Portals Cannot Reveal",
      content: `
        <p>Online government portals are administrative databases; they do NOT certify clean legal title. Major vulnerabilities that online portals miss include:</p>
        <ul>
          <li><strong>Unregistered Encumbrances:</strong> Equitable mortgages with financial institutions where original deeds are deposited without mutation alteration.</li>
          <li><strong>Pending Civil Suits:</strong> Lis pendens suits in Civil Courts for partition (বণ্টন), cancellation of deed (দলিল বাতিল), or pre-emption (অগ্রক্রয়).</li>
          <li><strong>Disinherited Heirs:</strong> Missing heirs under Muslim or Hindu succession laws whose shares were fraudulently omitted in vendor's mutation.</li>
          <li><strong>Physical Possession Deficits:</strong> Adverse possession or land-grabbing by local encroachers.</li>
        </ul>
      `
    },
    {
      h2: "The Lawyer's Offline Title Search: Balaam Boi & Non-Encumbrance (NEC)",
      content: `
        <p>To eliminate purchase risks, a Supreme Court property lawyer performs manual offline vetting:</p>
        <ol>
          <li><strong>Balaam Boi Search (বালাম বই তল্লাশি):</strong> Physical inspection of the volume record index at the concerned Sub-Registry Office to ensure the vendor's deed was genuine and not cancelled.</li>
          <li><strong>Non-Encumbrance Certificate (NEC / ১২ ধারা তল্লাশি):</strong> Applying for an official 12-to-30-year search certificate certifying that the property has not been encumbered, mortgaged, or transferred to third parties.</li>
          <li><strong>Chain of Title Report:</strong> Drafting a formal Title Vetting Opinion analyzing the legal coherence of all predecessor deeds.</li>
        </ol>
      `
    },
    {
      h2: "Document Checklist Before Paying Earnest Money (Baina)",
      content: `
        <p>Ensure you have certified copies of the following documents in hand before signing any Baina Agreement:</p>
        <ul>
          <li>Original Title Deed (মূল দলিল) and all Bia Deeds (বায়া দলিল) for 25–30 years.</li>
          <li>Certified CS, SA, RS, and City/BS Survey Khatians.</li>
          <li>Registered Mutation Khatian, AC Land Order Sheet, and DCR.</li>
          <li>Up-to-date online Land Development Tax (Khajna) Dakhila.</li>
          <li>Sub-Registry 12-year Non-Encumbrance Search Receipt.</li>
          <li>Approved building plan and clearance letters (for residential plots/apartments).</li>
        </ul>
        ${CTA_EN}
      `
    }
  ],
  faqs: [
    {
      question: "Can an online Khatian prove 100% legal ownership?",
      answer: "No. A Khatian creates a legal presumption of possession, but true ownership depends on valid registered deeds, unbroken title chain, and actual peaceful physical possession."
    },
    {
      question: "How much does a certified copy of Khatian cost online?",
      answer: "The government fee is ৳100 for an online certified copy delivered via post or downloadable directly from eporcha.gov.bd."
    },
    {
      question: "What is the difference between Khatian and Mutation?",
      answer: "A Khatian is an official survey record prepared periodically by the government. Mutation (Namjari) is the intermediate process by which a new owner's name replaces the seller's name in official records after purchase or inheritance."
    },
    {
      question: "Why is a 12-year Non-Encumbrance Certificate (NEC) necessary?",
      answer: "An NEC issued by the Sub-Registrar proves that no other registered deeds, mortgages, or transfers have occurred on the specified property within the searched duration."
    }
  ],
  relatedServiceLinks: [
    { text: "Land & Property Lawyer Bangladesh", to: "/services/land-lawyer" },
    { text: "Supreme Court Lawyer Dhaka", to: "/services/supreme-court-lawyer" }
  ],
  lang: "en",
  isDraft: false
};

// -------------------------------------------------------------
// 3. (Bengali) প্রবাসীদের জমি রক্ষা ও নামজারি ২০২৬
// -------------------------------------------------------------
const post3 = {
  slug: "probasi-nrb-jomi-rokha-byabasthapona-bangladesh",
  category: "সম্পত্তি আইন",
  title: "প্রবাসীদের জমি রক্ষা ও বিদেশ থেকে নামজারি করার নিয়ম ২০২৬ (NRB Property Management Guide)",
  metaTitle: "প্রবাসীদের জমি রক্ষা ও বিদেশ থেকে নামজারি করার নিয়ম ২০২৬",
  metaDescription: "প্রবাসী বাংলাদেশিদের জমি জবরদখল থেকে রক্ষা, বিদেশ থেকে পাওয়ার অব অ্যাটর্নি সম্পাদন ও অনলাইন ই-নামজারি করার সম্পূর্ণ আইনি নির্দেশিকা ও সুপ্রিম কোর্টের পরামর্শ।",
  keywords: [
    "প্রবাসীদের জমি রক্ষা ও নামজারি",
    "প্রবাসী জমি সুরক্ষার নিয়ম ২০২৬",
    "বিদেশ থেকে পাওয়ার অব অ্যাটর্নি করার নিয়ম",
    "প্রবাসী নামজারি আবেদন ২০২৬",
    "প্রবাসীর জমি দখল হলে করণীয়",
    "পাওয়ার অব অ্যাটর্নি আইন ২০১২",
    "দূতাবাস থেকে আমমোক্তারনামা প্রত্যয়ন"
  ],
  publishedDate: "2026-08-04",
  lastModified: "2026-10-17",
  readTime: "১২ মিনিট",
  heroIntro: "প্রবাসী বাংলাদেশিরা (NRB) কঠোর পরিশ্রমের মাধ্যমে রেমিট্যান্স পাঠিয়ে দেশে স্থাবর সম্পত্তি ক্রয় করেন বা পৈতৃক সম্পত্তি উত্তরাধিকারসূত্রে লাভ করেন। তবে বিদেশে দীর্ঘদিন অবস্থানের সুযোগ নিয়ে অসাধু আত্মীয়-স্বজন, স্থানীয় ভূমিদস্যু বা জালিয়াত চক্র ভুয়া কাগজপত্র তৈরি করে কিংবা জোরপূর্বক সীমানা দখল করে প্রবাসীদের জমি আত্মসাতের চেষ্টা চালায়। <strong>পাওয়ার অব অ্যাটর্নি আইন ২০১২</strong> এবং ভূমি মন্ত্রণালয়ের অনলাইন <strong>ই-নামজারি (E-Mutation)</strong> ব্যবস্থার কারণে প্রবাসীরা এখন বিদেশে অবস্থান করেই সম্পূর্ণ আইনসম্মত উপায়ে দেশে সম্পত্তি নিয়ন্ত্রণ ও রক্ষা করতে পারেন। বিস্তারিত দিকনির্দেশনা নিয়ে লিখেছেন বাংলাদেশ সুপ্রিম কোর্টের অভিজ্ঞ আইনজীবী <a href=\"/advocate-md-shah-alam\" style=\"color:var(--accent);font-weight:700;\">অ্যাডভোকেট মো. শাহ আলম</a>।",
  quickAnswer: {
    heading: "⚡ প্রবাসীদের জন্য সম্পত্তি সুরক্ষার ৪টি প্রধান আইনি স্তম্ভ",
    points: [
      "পাওয়ার অব অ্যাটর্নি আইন ২০১২: বিদেশে বসে পাওয়ার অব অ্যাটর্নি ড্রাফট করে সংশ্লিষ্ট বাংলাদেশ দূতাবাস/হাইকমিশন থেকে কনস্যুলার সত্যায়ন ও দেশের পররাষ্ট্র মন্ত্রণালয় (MoFA) থেকে ছাড়পত্র নিতে হবে।",
      "অনলাইন ই-নামজারি (E-Mutation): mutation.land.gov.bd-এ 'প্রবাসী আবেদনকারী' ক্যাটাগরি সিলেক্ট করে বিদেশে বসেই নামজারি ও ডিসিআর ফি পরিশোধ করা যায়।",
      "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩/২০২৬: প্রবাসী মালিকানাধীন সম্পত্তিতে অবৈধ প্রবেশ ও জবরদখল অ-জামিনযোগ্য ফৌজদারি অপরাধ; নির্বাহী ম্যাজিস্ট্রেট কোর্টে সরাসরি উচ্ছেদের আবেদন সম্ভব।",
      "আইনি রিটেইনারশিপ: দেশে নিয়মিত জমি তদারকি, বালাম তল্লাশি ও আইনি সুরক্ষায় সুপ্রিম কোর্টের একজন বিশ্বস্ত আইনজীবীর সহায়তা নেওয়া বুদ্ধিমানের কাজ। সরাসরি যোগাযোগ: +৮৮০ ১৭১২-৬৫৫৫৪৬।"
    ]
  },
  toc: [
    "প্রবাসীদের সম্পত্তি কেন দখলবাজদের সহজ টার্গেট হয়?",
    "বিদেশ থেকে পাওয়ার অব অ্যাটর্নি (আমমোক্তারনামা) প্রস্তুত ও সত্যায়নের সঠিক নিয়ম",
    "পাওয়ার অব অ্যাটর্নি বাংলাদেশে কার্যকর করার ৩টি বাধ্যতামূলক ধাপ",
    "বিদেশ থেকে অনলাইনে ই-নামজারি (E-Mutation) ও খাজনা পরিশোধের নির্দেশিকা",
    "প্রবাসী মালিকের জমি বেদখল হলে তাৎক্ষণিক আইনি প্রতিকার",
    "ওয়ারিশান সম্পত্তি অন্য ভাই-বোনরা গোপনে বিক্রি করে দিলে করণীয়",
    "প্রবাসীদের জন্য লিগ্যাল রিটেইনারশিপ: দেশে আইনজীবী নিয়োগের সুবিধা",
    "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
  ],
  sections: [
    {
      h2: "প্রবাসীদের সম্পত্তি কেন দখলবাজদের সহজ টার্গেট হয়?",
      content: `
        <p>প্রবাসীরা সাধারণত বছরে একবার বা কয়েক বছর পর পর দেশে আসেন। এই দীর্ঘ অনুপস্থিতির কারণে দখলবাজরা কয়েকটি চতুর কৌশল অবলম্বন করে:</p>
        <ul>
          <li><strong>জাল খতিয়ান বা ভুয়া ওয়ারিশ সনদ:</strong> অন্য শরিকরা প্রবাসীকে 'মৃত' বা 'নিখোঁজ' দেখিয়ে একা একাই ওয়ারিশ সনদ তৈরি করে জমি বিক্রি করে ফেলে।</li>
          <li><strong>ভুয়া আমমোক্তারনামা (Fake Power of Attorney):</strong> জাল সই ও সিল দিয়ে প্রবাসীর অজান্তেই পাওয়ার অব অ্যাটর্নি তৈরি করে জমি অন্য কারও কাছে হস্তান্তর করা হয়।</li>
          <li><strong>সীমানা জবরদখল:</strong> সীমানা প্রাচীর ভেঙে ধীরে ধীরে প্রবাসীর জমির অংশ দখল করে নেওয়া।</li>
        </ul>
      `
    },
    {
      h2: "বিদেশ থেকে পাওয়ার অব অ্যাটর্নি (আমমোক্তারনামা) প্রস্তুত ও সত্যায়নের সঠিক নিয়ম",
      content: `
        <p>পাওয়ার অব অ্যাটর্নি আইন ২০১২ ও বিধিমালা ২০১৫ অনুযায়ী বিদেশ থেকে পাওয়ার অব অ্যাটর্নি প্রস্তুত করতে নিম্নলিখিত ধাপসমূহ নিখুঁতভাবে অনুসরণ করতে হবে:</p>
        <ol>
          <li><strong>দলিল ড্রাফটিং:</strong> বাংলাদেশ সুপ্রিম কোর্টের একজন দক্ষ আইনজীবীর মাধ্যমে পাওয়ার অব অ্যাটর্নির খসড়া প্রস্তুত করুন। এতে নির্দিষ্ট জমির তফসিল, সীমানা এবং অ্যাটর্নির সুনির্দিষ্ট ক্ষমতার পরিধি (যেমন: শুধু নামজারি ও মামলা পরিচালনা, নাকি বিক্রির ক্ষমতা) সুস্পষ্টভাবে উল্লেখ থাকতে হবে।</li>
          <li><strong>দূতাবাসে উপস্থিতি ও সই:</strong> প্রবাসীকে সশরীরে সংশ্লিষ্ট দেশের বাংলাদেশ দূতাবাস বা কনস্যুলেটে উপস্থিত হয়ে কনস্যুলার অফিসারের সামনে পাসপোর্টের মূল কপি প্রদর্শনপূর্বক দলিলে স্বাক্ষর করতে হবে।</li>
          <li><strong>কনস্যুলার সত্যায়ন (Attestation):</strong> কনস্যুলার অফিসার দলিলে সীলমোহর ও সত্যায়ন স্বাক্ষর করবেন।</li>
        </ol>
      `
    },
    {
      h2: "পাওয়ার অব অ্যাটর্নি বাংলাদেশে কার্যকর করার ৩টি বাধ্যতামূলক ধাপ",
      content: `
        <p>দূতাবাস থেকে সত্যায়িত দলিল বাংলাদেশে পৌঁছানোর পর তা ব্যবহারের আগে ৩টি প্রশাসনিক কাজ বাধ্যতামূলক:</p>
        <ul>
          <li><strong>১. পররাষ্ট্র মন্ত্রণালয় (MoFA) সত্যায়ন:</strong> ঢাকায় পররাষ্ট্র মন্ত্রণালয়ের কনস্যুলার শাখা থেকে দলিলের স্বাক্ষর ও সিল প্রতি-সত্যায়িত (Counter-attested) করাতে হবে।</li>
          <li><strong>২. সংশ্লিষ্ট জেলা প্রশাসকের (DC Office) ট্রেজারি স্ট্যাম্পিং:</strong> স্ট্যাম্প আইন অনুযায়ী জেলা প্রশাসকের কার্যালয়ে নির্ধারিত সরকারি স্ট্যাম্প শুল্ক জমা দিয়ে দলিলটি স্ট্যাম্পিং করাতে হবে।</li>
          <li><strong>৩. সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রেশন (যদি জমি বিক্রির ক্ষমতা থাকে):</strong> পাওয়ার অব অ্যাটর্নি আইন অনুযায়ী অপ্রত্যাহারযোগ্য বা জমি হস্তান্তরের ক্ষমতাসম্পন্ন হলে তা সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রি করা বাধ্যতামূলক।</li>
        </ul>
      `
    },
    {
      h2: "বিদেশ থেকে অনলাইনে ই-নামজারি (E-Mutation) ও খাজনা পরিশোধের নির্দেশিকা",
      content: `
        <p>এখন প্রবাসীরা ঘরে বসেই ইন্টারনেটের মাধ্যমে তাদের জমি নামজারি করতে পারেন:</p>
        <ul>
          <li>ওয়েবসাইটে যান: <a href="https://mutation.land.gov.bd" target="_blank" rel="noopener">mutation.land.gov.bd</a></li>
          <li>আবেদনের সময় <em>'প্রবাসী আবেদনকারী'</em> অপশন নির্বাচন করুন এবং আপনার পাসপোর্ট বা এনআইডি নম্বর ইনপুট দিন।</li>
          <li>মূল দলিল, বায়া দলিল, খতিয়ান ও ওয়ারিশ সনদের স্ক্যান কপি আপলোড করুন।</li>
          <li>বাংলাদেশে থাকা অনুমোদিত প্রতিনিধির তথ্য প্রদান করুন যিনি এসি ল্যান্ড অফিসে শুনানিতে মূল দলিল প্রদর্শন করবেন।</li>
          <li>অনলাইনে বিকাশ, নগদ বা কার্ডের মাধ্যমে ফি পরিশোধ করে কিউআর কোডযুক্ত মিউটেশন খতিয়ান ও ডিসিআর ডাউনলোড করে নিন।</li>
        </ul>
      `
    },
    {
      h2: "প্রবাসী মালিকের জমি বেদখল হলে তাৎক্ষণিক আইনি প্রতিকার",
      content: `
        <p>জমি বেদখল হলে প্রবাসীকে তাৎক্ষণিকভাবে দেশে আসার প্রয়োজন নেই। অ্যাটর্নি বা আইনজীবীর মাধ্যমে আইনি পদক্ষেপ নেওয়া সম্ভব:</p>
        <ul>
          <li><strong>ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩/২০২৬:</strong> অতিরিক্ত জেলা ম্যাজিস্ট্রেট (ADM) বা নির্বাহী ম্যাজিস্ট্রেট আদালতে আবেদন করে উচ্ছেদ অভিযান পরিচালনা করা।</li>
          <li><strong>ফৌজদারি কার্যবিধির ১৪৫ ধারা:</strong> জমিতে শান্তিশৃঙ্খলা রক্ষা এবং দখল বহাল রাখতে ফৌজদারি আদালতের মাধ্যমে নিষেধাজ্ঞা জারি।</li>
          <li><strong>দেওয়ানি আদালতে স্বত্ব সাব্যস্তপূর্বক দখল পুনরুদ্ধার:</strong> সুনির্দিষ্ট প্রতিকার আইন ১৮৭৭ এর ৮ ও ৯ ধারা মোতাবেক বিজ্ঞ দেওয়ানি আদালতে মামলা দায়ের।</li>
        </ul>
      `
    },
    {
      h2: "ওয়ারিশান সম্পত্তি অন্য ভাই-বোনরা গোপনে বিক্রি করে দিলে করণীয়",
      content: `
        <p>পৈতৃক সম্পত্তি বণ্টন (Partition) না করে কোনো সহ-শরিক প্রবাসীর অংশ বিক্রি করতে পারে না। এমনটি ঘটলে করণীয়:</p>
        <ol>
          <li>বিজ্ঞ যুগ্ম জেলা জজ আদালতে <strong>বণ্টন মোকদ্দমা (Partition Suit)</strong> দায়ের করা।</li>
          <li>বিরোধীয় জমিতে তৃতীয় পক্ষের কাছে বিক্রি ও রূপান্তর বন্ধে <strong>স্থায়ী ও অন্তর্বর্তীকালীন নিষেধাজ্ঞা (Temporary Injunction)</strong> গ্রহণ করা।</li>
          <li>প্রবাসীর অংশ জালিয়াতি করে বিক্রি করা হলে সুনির্দিষ্ট প্রতিকার আইনের ৩৯ ধারায় বিক্রয় দলিল বাতিলের মামলা দায়ের করা।</li>
        </ol>
      `
    },
    {
      h2: "প্রবাসীদের জন্য লিগ্যাল রিটেইনারশিপ: দেশে আইনজীবী নিয়োগের সুবিধা",
      content: `
        <p>সম্পত্তির নিরাপত্তা নিশ্চিতে প্রবাসীরা সুপ্রিম কোর্টের নির্ভরযোগ্য আইনজীবীর সাথে বার্ষিক লিগ্যাল রিটেইনারশিপ চুক্তি করতে পারেন। এতে আইনজীবী নিয়মিতভাবে জমির রেকর্ড তল্লাশি, খাজনা পরিশোধ, সীমানা পাহারা এবং যেকোনো জালিয়াতির চেষ্টার বিরুদ্ধে দ্রুত আইনি ব্যবস্থা গ্রহণ করবেন।</p>
        ${CTA_BN}
      `
    }
  ],
  faqs: [
    {
      question: "বিদেশ থেকে পাওয়ার অব অ্যাটর্নি পাঠালে কি সরাসরি জমি বিক্রি করা যায়?",
      answer: "হ্যাঁ, তবে পাওয়ার অব অ্যাটর্নিতে জমি বিক্রির সুস্পষ্ট ক্ষমতা থাকতে হবে এবং বাংলাদেশে পররাষ্ট্র মন্ত্রণালয় থেকে সত্যায়ন ও ডিসি অফিসে স্ট্যাম্পিংয়ের পর সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রেশন সম্পন্ন হতে হবে।"
    },
    {
      question: "প্রবাসী ব্যক্তি অনলাইনে কীভাবে নামজারি আবেদন করবেন?",
      answer: "mutation.land.gov.bd পোর্টালে গিয়ে প্রবাসী আবেদনকারী হিসেবে নিজের জাতীয় পরিচয়পত্র বা পাসপোর্ট নম্বর দিয়ে আবেদন করা যায় এবং দেশে থাকা প্রতিনিধির মাধ্যমে এসি ল্যান্ড অফিসে শুনানি নিশ্চিত করা যায়।"
    },
    {
      question: "পাওয়ার অব অ্যাটর্নি কি বাতিল করা যায়?",
      answer: "হ্যাঁ, পাওয়ার অব অ্যাটর্নি আইন ২০১২ অনুযায়ী নোটিশ প্রদানের মাধ্যমে বা সাব-রেজিস্ট্রি অফিসে বাতিল দলিল (Deed of Revocation) সম্পাদনের মাধ্যমে যে কোনো সময় আমমোক্তারনামা বাতিল করা সম্ভব।"
    },
    {
      question: "প্রবাসীর অনুপস্থিতিতে ওয়ারিশ সনদ জালিয়াতি করলে শাস্তি কী?",
      answer: "দণ্ডবিধির ৪২০/৪৬৮ ধারা এবং ভূমি অপরাধ প্রতিরোধ আইনে জাল সনদ প্রস্তুতকারী ও ব্যবহারকারীর বিরুদ্ধে সর্বোচ্চ ৭ বছর পর্যন্ত সশ্রম কারাদণ্ড হতে পারে।"
    }
  ],
  relatedServiceLinks: [
    { text: "ভূমি ও সম্পত্তি আইন সেবা", to: "/services/land-lawyer" },
    { text: "পাওয়ার অব অ্যাটর্নি পরামর্শ", to: "/services/power-of-attorney" }
  ],
  lang: "bn",
  isDraft: false
};

// -------------------------------------------------------------
// 4. (English) Anticipatory Bail in High Court 2026
// -------------------------------------------------------------
const post4 = {
  slug: "high-court-anticipatory-bail-cost-procedure-2026",
  bnSlug: null,
  title: "Anticipatory Bail in High Court Bangladesh: Cost, Procedure, Documents & Required Time (2026 Guide)",
  category: "Criminal Law",
  readTime: "11 min read",
  metaTitle: "Anticipatory Bail High Court Bangladesh 2026: Cost & Procedure",
  metaDescription: "Comprehensive guide to Anticipatory Bail under Section 498 CrPC in the High Court of Bangladesh. Detailed court procedure, required documents, expenses, and timeline.",
  keywords: [
    "anticipatory bail in high court bangladesh",
    "anticipatory bail high court cost bangladesh",
    "section 498 crpc bail dhaka",
    "agom bail rules bangladesh 2026",
    "surrender before high court",
    "criminal lawyer supreme court dhaka"
  ],
  publishedDate: "2026-08-15",
  lastModified: "2026-10-17",
  heroIntro: "When an individual faces an imminent threat of arrest in a non-bailable, false, or politically/business-motivated criminal case, the legal framework of Bangladesh offers pre-arrest protection known as <strong>Anticipatory Bail (আগাম জামিন)</strong> under <strong>Section 498 of the Code of Criminal Procedure (Cr.P.C.), 1898</strong>. Secured predominantly from the High Court Division of the Supreme Court of Bangladesh, anticipatory bail shields innocent individuals from arbitrary detention and police custody until the allegations are properly examined. This definitive 2026 guide by <strong>Advocate Md. Shah Alam</strong>, Supreme Court of Bangladesh, details the legal grounds, procedural steps, mandatory court appearances, and realistic costs involved.",
  quickAnswer: {
    heading: "⚡ Quick Legal Overview: Anticipatory Bail (Section 498 Cr.P.C.)",
    points: [
      "Governing Statute: Section 498 of the Code of Criminal Procedure (Cr.P.C.), 1898.",
      "Competent Forum: High Court Division of the Supreme Court of Bangladesh (and limited power in Sessions Court).",
      "Primary Protection: Protects against unlawful arrest, harassment, or custodial humiliation in non-bailable false complaints.",
      "Physical Surrender Mandatory: The petitioner MUST appear in person in the High Court courtroom before the division bench at the time of the hearing.",
      "Standard Duration: Granted typically for a limited period of 4 to 8 weeks with a direction to surrender before the lower Trial/Sessions Court.",
      "Urgent Criminal Defense: Contact Advocate Md. Shah Alam (Supreme Court Bar Association & Uttara Chamber) at +8801712655546."
    ]
  },
  toc: [
    "What Is Anticipatory Bail and How Does Section 498 Cr.P.C. Function?",
    "Grounds for Granting Anticipatory Bail in the High Court Division",
    "Mandatory Prerequisite: The Physical Surrender Requirement",
    "Step-by-Step Procedure to Obtain Anticipatory Bail in the High Court",
    "Required Documents & Evidence Checklist",
    "Filing Expenses, Court Fees & Realistic Legal Costs in 2026",
    "What Happens After Anticipatory Bail is Granted? (Surrender in Lower Court)",
    "What If Anticipatory Bail is Rejected?",
    "Frequently Asked Questions (FAQ)"
  ],
  sections: [
    {
      h2: "What Is Anticipatory Bail and How Does Section 498 Cr.P.C. Function?",
      content: `
        <p>Anticipatory bail is an extraordinary judicial remedy granting bail in anticipation of arrest. Unlike regular bail under Section 497 Cr.P.C., which is sought <em>after</em> an accused is already arrested or detained by police, anticipatory bail under Section 498 is prayed for <em>prior</em> to formal arrest.</p>
        <p>If granted by the High Court Division, the court directs the police that in the event of the petitioner's arrest in connection with the specified case, they must immediately release the individual on furnishing a bail bond.</p>
      `
    },
    {
      h2: "Grounds for Granting Anticipatory Bail in the High Court Division",
      content: `
        <p>The High Court Division exercises discretionary power under Section 498 sparingly and only upon sound judicial principles. Key grounds include:</p>
        <ul>
          <li><strong>Malafide & Collateral Purpose:</strong> Where the First Information Report (FIR) or Complaint Case (C.R. Case) has been filed to harass, humiliate, or extort the accused due to business rivalry, land disputes, or political animosity.</li>
          <li><strong>Absence of Specific Overt Acts:</strong> Where the petitioner is roped in omnibus allegations without any direct role in the alleged offence.</li>
          <li><strong>Vulnerable Status:</strong> Old age, acute medical conditions, women, or individuals of respectable social standing with deep community roots who are unlikely to abscond.</li>
          <li><strong>Documentary Proof of Innocence:</strong> Undeniable alibi or documentary proof showing that the accused was elsewhere or that the dispute is purely of a civil nature.</li>
        </ul>
      `
    },
    {
      h2: "Mandatory Prerequisite: The Physical Surrender Requirement",
      content: `
        <p>A fundamental rule settled by the Appellate Division of the Supreme Court of Bangladesh is that <strong>no person can obtain anticipatory bail while remaining in hiding or through an attorney alone</strong>.</p>
        <p>The petitioner must be physically present inside the courtroom before the High Court Division Bench when the matter is called for hearing. If the Bench refuses bail, the petitioner risks being handed over to law enforcement officers present in the court premises.</p>
      `
    },
    {
      h2: "Step-by-Step Procedure to Obtain Anticipatory Bail in the High Court",
      content: `
        <ol>
          <li><strong>Step 1: Procurement of Case Documents:</strong> Procure a certified copy of the FIR from the concerned Thana or Chief Metropolitan Magistrate (CMM) / Chief Judicial Magistrate (CJM) court, or the Complaint Petition in C.R. cases.</li>
          <li><strong>Step 2: Drafting the Criminal Miscellaneous Petition:</strong> Your High Court advocate drafts a Criminal Miscellaneous (Cr. Misc.) petition detailing the background, grounds of innocence, and persecution threats.</li>
          <li><strong>Step 3: Affidavit & Filing:</strong> The petitioner or a Tadbirkar deposes an affidavit before the Supreme Court Affidavit Commissioner. The petition is formally filed with the High Court Registry.</li>
          <li><strong>Step 4: Bench Placement & Hearing:</strong> The application is listed in the Daily Cause List of the designated Criminal Anticipatory Bail Bench. The advocate presents oral submissions while the petitioner stands before the bench.</li>
          <li><strong>Step 5: Pronouncement & Bail Order:</strong> The Court pronounces the order (typically granting 4 to 8 weeks bail) and directs the petitioner to surrender before the competent Sessions Court upon expiry.</li>
        </ol>
      `
    },
    {
      h2: "Required Documents & Evidence Checklist",
      content: `
        <ul>
          <li>Certified copy of the FIR / Ejahar or Complaint Petition (C.R. Case).</li>
          <li>Forwarding letter, seizure list, and remand rejection copies (if co-accused were earlier arrested).</li>
          <li>Valid National ID Card (NID) or Passport of the petitioner.</li>
          <li>Certified medical documents from registered physicians (if bail is sought on medical grounds).</li>
          <li>Exculpatory documentary evidence (e.g., flight tickets, CCTV logs, employment records establishing an alibi).</li>
        </ul>
      `
    },
    {
      h2: "Filing Expenses, Court Fees & Realistic Legal Costs in 2026",
      content: `
        <p>The total cost of obtaining anticipatory bail consists of government court fees, clerk charges, and professional advocate fees:</p>
        <ul>
          <li><strong>Government Court Fees & Stamp Duty:</strong> Modest statutory costs including Supreme Court welfare stamps, vokalatnama stamp, and affidavit stamps (typically BDT 1,500 – 3,500).</li>
          <li><strong>Certified Copy Retrieval:</strong> Expenses for court clerks and typists at the district registry (BDT 2,000 – 5,000).</li>
          <li><strong>Professional Advocate Fees:</strong> Depending on the severity of charges (e.g., cheating, property dispute vs. murder, cybercrime, or Special Powers Act), professional fees in Dhaka range from <strong>BDT 40,000 to BDT 150,000+</strong>.</li>
        </ul>
      `
    },
    {
      h2: "What Happens After Anticipatory Bail is Granted? (Surrender in Lower Court)",
      content: `
        <p>Anticipatory bail is <em>transitional</em>. The High Court grants it to protect the petitioner from immediate arrest while directing them to surrender before the concerned Court of Sessions Judge or Metropolitan Sessions Judge within the granted period (e.g., 4 or 6 weeks).</p>
        <p>Before the expiration of the granted timeframe, your lawyer will prepare a regular bail application under Section 497 Cr.P.C. before the trial court. Having respected the High Court’s surrender order, trial courts routinely confirm regular bail.</p>
      `
    },
    {
      h2: "What If Anticipatory Bail is Rejected?",
      content: `
        <p>If the High Court Division is not inclined to grant anticipatory bail, the counsel may withdraw the petition before formal rejection to avoid adverse observations on record, or seek direction from the Bench for the petitioner to surrender peacefully before the trial magistrate within 7 days without police harassment.</p>
        ${CTA_EN}
      `
    }
  ],
  faqs: [
    {
      question: "Can anyone apply for Anticipatory Bail before an FIR is lodged?",
      answer: "No. The law requires a specific apprehension based on an actual registered FIR or formal complaint (C.R. Case). Anticipatory bail cannot be granted on vague or imaginary fears."
    },
    {
      question: "Does the accused have to go to court personally for Anticipatory Bail?",
      answer: "Yes, absolutely mandatory. The petitioner must surrender and be physically present in the High Court courtroom during the hearing."
    },
    {
      question: "How long does it take to secure Anticipatory Bail in the High Court?",
      answer: "Under normal circumstances, it takes 2 to 4 working days from receiving the certified FIR copy. In cases of extreme urgency, filings can be expedited within 24 to 48 hours."
    },
    {
      question: "Can police arrest someone after Anticipatory Bail is granted?",
      answer: "No. As long as the petitioner holds a valid certified order of anticipatory bail from the High Court Division, law enforcement agencies cannot arrest or detain them in that specified case."
    }
  ],
  relatedServiceLinks: [
    { text: "Bail Lawyer Services Dhaka", to: "/services/bail-lawyer" },
    { text: "Criminal Defense Supreme Court", to: "/services/criminal-lawyer" }
  ],
  lang: "en",
  isDraft: false
};

// -------------------------------------------------------------
// 5. (Bengali) বিকাশ ও ফেসবুক প্রতারণায় করণীয় ২০২৬
// -------------------------------------------------------------
const post5 = {
  slug: "mobile-banking-bkash-nagad-pratarana-cyber-ain",
  title: "ফেসবুক ও বিকাশ প্রতারণায় সর্বস্ব হারালে করণীয়: অনলাইনে জিডি ও সাইবার ক্রাইম মামলা করার নিয়ম ২০২৬",
  category: "সাইবার ও ফৌজদারি আইন",
  readTime: "১০ মিনিট পড়ুন",
  metaTitle: "বিকাশ ও ফেসবুক প্রতারণায় করণীয়: অনলাইন জিডি ও সাইবার মামলা ২০২৬",
  metaDescription: "বিকাশ, নগদ বা ফেসবুক হ্যাকিং-ব্ল্যাকমেইলিং প্রতারণার শিকার হলে টাকা ফেরত পাওয়ার উপায়, অনলাইন জিডি ও সাইবার ট্রাইব্যুনালে মামলা করার সম্পূর্ণ আইনি গাইড।",
  keywords: [
    "বিকাশ ও ফেসবুক প্রতারণায় করণীয়",
    "অনলাইন জিডি করার নিয়ম ২০২৬",
    "বিকাশ প্রতারণার টাকা ফেরত পাওয়ার উপায়",
    "সাইবার ক্রাইমে অভিযোগ দেওয়ার নিয়ম",
    "সাইবার নিরাপত্তা আইন ২০২৬ মামলা",
    "সিআইডি সাইবার পুলিশ হেল্পলাইন",
    "মোবাইল ব্যাংকিং ফ্রড মামলা"
  ],
  publishedDate: "2026-07-22",
  lastModified: "2026-10-17",
  heroIntro: "বাংলাদেশে মোবাইল ফিন্যান্সিয়াল সার্ভিস (bKash, Nagad, Rocket) এবং সামাজিক যোগাযোগ মাধ্যম (Facebook, WhatsApp, Telegram) ব্যবহারের ব্যাপক প্রসারের সাথে সাথে সাইবার অপরাধী চক্রের প্রতারণাও ভয়াবহ রূপ নিয়েছে। কখনো ওটিপি (OTP) ও পিন হাতিয়ে নিয়ে পুরো ব্যালেন্স খালি করা হচ্ছে, কখনো ফেসবুক আইডি হ্যাক করে ব্যক্তিগত ছবি ছড়িয়ে দেওয়ার ভয় দেখিয়ে ব্ল্যাকমেইলিং করা হচ্ছে, আবার কখনো আকর্ষণীয় অনলাইন ইনভেস্টমেন্ট বা লটারি জেতার লোভ দেখিয়ে লাখ লাখ টাকা হাতিয়ে নেওয়া হচ্ছে। প্রতারণার শিকার হলে প্রথম কয়েক ঘণ্টার সঠিক আইনি পদক্ষেপই টাকা ফেরত পাওয়ার একমাত্র উপায়। সুপ্রিম কোর্টের সাইবার ল’ ও ফৌজদারি আইনজীবী <a href=\"/advocate-md-shah-alam\" style=\"color:var(--accent);font-weight:700;\">অ্যাডভোকেট মো. শাহ আলম</a>-এর বিস্তারিত আইনি গাইড নিচে তুলে ধরা হলো।",
  quickAnswer: {
    heading: "⚡ সাইবার ও বিকাশ প্রতারণার শিকার হলে প্রথম ২ ঘণ্টার জরুরি করণীয়",
    points: [
      "হটলাইনে কল: সাথে সাথে বিকাশ (১৬২৪৭) বা নগদ (১৬১৬৭)-এ কল করে ট্রানজেকশন আইডি (TrxID) দিয়ে প্রতারকের ওয়ালেট সাময়িক স্থগিত (Hold) করার আবেদন করুন।",
      "ডিজিটাল প্রমাণ সংরক্ষণ: চ্যাট স্ক্রিনশট, অডিও রেকর্ড, ভুয়া লিংক, ফেসবুক প্রোফাইল ইউআরএল ও মোবাইল নম্বর সুরক্ষিত রাখুন।",
      "অনলাইন জিডি (Online GD): gd.police.gov.bd বা DMP Online GD অ্যাপের মাধ্যমে সাইবার প্রতারণার অভিযোগ দাখিল করুন।",
      "গোয়েন্দা বিভাগে রিপোর্ট: সিআইডি সাইবার পুলিশ সেন্টার (০১৭৩০-৩৩৬৪৩১) বা ডিবি সাইবার ক্রাইম ইউনিটে অভিযোগ জমা দিন।",
      "আদালতে মামলা: বিজ্ঞ সাইবার ট্রাইব্যুনাল বা জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে পেনাল কোড ৪২০/৪০৬ ও সাইবার নিরাপত্তা আইনে নালিশি মামলা দায়ের করুন।"
    ]
  },
  toc: [
    "প্রচলিত বিকাশ, নগদ ও ফেসবুক প্রতারণার কৌশলসমূহ",
    "টাকা খোয়া যাওয়ার সাথে সাথে প্রথম ২ ঘণ্টায় কী করবেন? (Golden Hours)",
    "কীভাবে ডিজিটাল এভিডেন্স (প্রমাণাদি) সুরক্ষিত রাখবেন?",
    "অনলাইনে জিডি (Online GD) করার সহজ নিয়ম",
    "সিআইডি (CID) ও ডিবি (DB) সাইবার ক্রাইম ইউনিটে অভিযোগ জানানোর উপায়",
    "আদালতে মামলা দায়ের ও প্রতারকের অ্যাকাউন্ট ফ্রিজ করার নিয়ম",
    "সাইবার অপরাধের শাস্তি ও টাকা ফেরতের বাস্তব সম্ভাবনা",
    "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
  ],
  sections: [
    {
      h2: "প্রচলিত বিকাশ, নগদ ও ফেসবুক প্রতারণার কৌশলসমূহ",
      content: `
        <p>সাইবার অপরাধীরা সাধারণত নিম্নোক্ত উপায়ে সাধারণ মানুষকে ফাঁদে ফেলে:</p>
        <ul>
          <li><strong>ওটিপি ও পিন স্পুফিং:</strong> 'বিকাশ হেড অফিস' বা 'কাস্টমার কেয়ার' সেজে ফোন করে অ্যাকাউন্ট ভেরিফিকেশনের নামে কৌশলে ওটিপি (OTP) জেনে নেওয়া।</li>
          <li><strong>ফেসবুক ক্লোনিং ও ব্ল্যাকমেইলিং:</strong> পরিচিত ব্যক্তির ছবি ও নাম ব্যবহার করে মেসেঞ্জারে জরুরি আর্থিক সাহায্য চাওয়া, অথবা ভিডিও কলের স্ক্রিন রেকর্ড দিয়ে ব্ল্যাকমেল করা।</li>
          <li><strong>অনলাইন টাস্ক বা ইনভেস্টমেন্ট স্ক্যাম:</strong> টেলিগ্রাম ও হোয়াটসঅ্যাপে ছোট কাজের বিনিময়ে লোভনীয় লাভের প্রতিশ্রুতি দিয়ে বড় অংকের টাকা হাতিয়ে নেওয়া।</li>
        </ul>
      `
    },
    {
      h2: "টাকা খোয়া যাওয়ার সাথে সাথে প্রথম ২ ঘণ্টায় কী করবেন? (Golden Hours)",
      content: `
        <p>টাকা লেনদেনের প্রথম ২ ঘণ্টাকে <em>'গোল্ডেন আওয়ার'</em> বলা হয়। কারণ ক্যাশআউট করার পূর্বেই পদক্ষেপ নিলে টাকা আটকানো সম্ভব:</p>
        <ol>
          <li>অবিলম্বে সংশ্লিষ্ট এমএফএস (MFS) হেল্পলাইনে (বিকাশ: 16247, নগদ: 16167) কল করে ট্রানজেকশন আইডি (TrxID) ও প্রতারকের নম্বর জানান।</li>
          <li>প্রতারকের ওয়ালেটে টাকা থাকলে তা হোল্ড (Hold) করার আনুষ্ঠানিক রিকোয়েস্ট তৈরি করান।</li>
          <li>নিকটস্থ থানায় গিয়ে তাৎক্ষণিকভাবে সাধারণ ডায়েরি (GD) এন্ট্রি করুন।</li>
        </ol>
      `
    },
    {
      h2: "কীভাবে ডিজিটাল এভিডেন্স (প্রমাণাদি) সুরক্ষিত রাখবেন?",
      content: `
        <p>আইনি লড়াইয়ে ডিজিটাল প্রমাণই আসল হাতিয়ার। প্রমাণ সংরক্ষণে নিচের নিয়ম মানুন:</p>
        <ul>
          <li>ফেসবুক চ্যাট বা মেসেজ ডিলিট করবেন না; পূর্ণ স্ক্রিনশট এবং ইউআরএল (URL) লিঙ্ক সেভ করুন।</li>
          <li>প্রতারকের সাথে হওয়া মোবাইল কল রেকর্ডিং থাকলে তা আলাদা ড্রাইভে ব্যাকআপ রাখুন।</li>
          <li>বিকাশ/নগদ স্টেটমেন্টের পিডিএফ কপি ডাউনলোড করুন যাতে ট্রানজেকশন আইডি ও সময় স্পষ্টভাবে দৃশ্যমান থাকে।</li>
        </ul>
      `
    },
    {
      h2: "অনলাইনে জিডি (Online GD) করার সহজ নিয়ম",
      content: `
        <p>থানায় না গিয়েও বাংলাদেশ পুলিশের অনলাইন জিডি পোর্টালে (<a href="https://gd.police.gov.bd" target="_blank" rel="noopener">gd.police.gov.bd</a>) বা <em>'Online GD'</em> মোবাইল অ্যাপের মাধ্যমে অভিযোগ দাখিল করা যায়:</p>
        <ol>
          <li>এনআইডি নম্বর ও মোবাইল নম্বর দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন।</li>
          <li>অভিযোগের ক্যাটাগরিতে <em>'সাইবার ক্রাইম / আর্থিক প্রতারণা'</em> সিলেক্ট করুন।</li>
          <li>ঘটনার বিস্তারিত বিবরণ, প্রতারকের নম্বর ও ট্রানজেকশন আইডি উল্লেখ করে সাবমিট করুন।</li>
          <li>জিডি নম্বর ও কিউআর কোডসহ ট্র্যাকিং স্লিপটি প্রিন্ট করে সংরক্ষণ করুন।</li>
        </ol>
      `
    },
    {
      h2: "সিআইডি (CID) ও ডিবি (DB) সাইবার ক্রাইম ইউনিটে অভিযোগ জানানোর উপায়",
      content: `
        <p>বড় ধরনের আর্থিক প্রতারণা বা স্পর্শকাতর ব্ল্যাকমেইলিংয়ের ক্ষেত্রে বাংলাদেশ পুলিশের বিশেষায়িত উইং সরাসরি অ্যাকশন নিয়ে থাকে:</p>
        <ul>
          <li><strong>CID Cyber Police Centre:</strong> হটলাইন: 01730-336431, ইমেইল: smcyber@police.gov.bd (মালিবাগ, ঢাকা)।</li>
          <li><strong>ডিএমপি সাইবার ক্রাইম ইনভেস্টিগেশন ডিভিশন:</strong> মিন্টো রোড, ঢাকা।</li>
          <li><strong>জাতীয় জরুরি সেবা:</strong> ৯৯৯ (999)-এ কল করে সাইবার ডেস্কে সরাসরি সংযোগ নেওয়ার সুযোগ রয়েছে।</li>
        </ul>
      `
    },
    {
      h2: "আদালতে মামলা দায়ের ও প্রতারকের অ্যাকাউন্ট ফ্রিজ করার নিয়ম",
      content: `
        <p>পুলিশ যদি দ্রুত ব্যবস্থা না নেয়, তবে বিজ্ঞ মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত বা সাইবার ট্রাইব্যুনালে সরাসরি সি.আর. (Complaint Register) মামলা দায়ের করা যায়:</p>
        <ul>
          <li><strong>প্রযোজ্য ধারা:</strong> দণ্ডবিধির ৪০৬ ধারা (বিশ্বাসভঙ্গ), ৪২০ ধারা (প্রতারণা) এবং সাইবার নিরাপত্তা আইন ২০২৩-এর কম্পিউটার প্রতারণা সংক্রান্ত ধারা।</li>
          <li><strong>অ্যাকাউন্ট ফ্রিজিং অর্ডার:</strong> আদালতের আদেশে বাংলাদেশ ব্যাংকের বিএফআইইউ (BFIU) এর মাধ্যমে সংশ্লিষ্ট বিকাশ/নগদ বা ব্যাংক হিসাব ফ্রিজ করা হয় এবং তদন্ত শেষে টাকা ভিকটিমকে হস্তান্তরের আদেশ দেওয়া হয়।</li>
        </ul>
      `
    },
    {
      h2: "সাইবার অপরাধের শাস্তি ও টাকা ফেরতের বাস্তব সম্ভাবনা",
      content: `
        <p>সাইবার প্রতারণার ক্ষেত্রে অভিযুক্তের সর্বোচ্চ ৫ থেকে ৭ বছর পর্যন্ত কারাদণ্ড এবং লাখ লাখ টাকা জরিমানার বিধান রয়েছে। সঠিক সময়ে অ্যাকাউন্ট ফ্রিজ করানো গেলে আদালতের আদেশে পুরো টাকা ফেরত পাওয়ার শতভাগ সুযোগ থাকে।</p>
        ${CTA_BN}
      `
    }
  ],
  faqs: [
    {
      question: "বিকাশে ভুল নম্বরে টাকা চলে গেলে বা প্রতারক টাকা নিলে কি ফেরত পাওয়া যায়?",
      answer: "হ্যাঁ। ট্রানজেকশন আইডি দিয়ে দ্রুত বিকাশ কাস্টমার কেয়ারে অভিযোগ জানালে এবং আদালতের আদেশ বা থানার জিডি উপস্থাপন করলে আইন অনুযায়ী টাকা উদ্ধার করা সম্ভব।"
    },
    {
      question: "অনলাইন জিডি করতে কোনো সরকারি ফি লাগে কি?",
      answer: "না। বাংলাদেশ পুলিশের অনলাইন জিডি সম্পূর্ণ বিনামূল্যে করা যায়।"
    },
    {
      question: "ফেসবুকে ভুয়া আইডি খুলে মানহানি বা ছবি ছড়ালে কী আইনি পদক্ষেপ নেওয়া যায়?",
      answer: "সাইবার নিরাপত্তা আইন ও পর্নোগ্রাফি নিয়ন্ত্রণ আইনে সরাসরি থানায় এফআইআর বা আদালতে নালিশি মামলা দায়ের করা যায়। দোষী প্রমাণিত হলে জামিন-অযোগ্য কারাদণ্ড হয়।"
    }
  ],
  relatedServiceLinks: [
    { text: "সাইবার ক্রাইম আইনি সেবা", to: "/services/criminal-lawyer" },
    { text: "ফৌজদারি আইনজীবী ঢাকা", to: "/services/bail-lawyer" }
  ],
  lang: "bn",
  isDraft: false
};

// -------------------------------------------------------------
// 6. (English) Cheque Dishonour Case (Section 138 NI Act) 2026
// -------------------------------------------------------------
const post6 = {
  slug: "cheque-dishonour-case-bangladesh-section-138-ni-act-2026",
  bnSlug: "138-ni-act-bangladesh-cheque-case-guide-bn",
  title: "Cheque Dishonour Case in Bangladesh (Section 138 NI Act): Legal Notice, Court Procedure & Bail Rules 2026",
  category: "Corporate & Commercial Law",
  readTime: "12 min read",
  metaTitle: "Cheque Dishonour Case Bangladesh 2026: Section 138 NI Act Guide",
  metaDescription: "Definitive guide to Section 138 NI Act cheque dishonour cases in Bangladesh. Master the 30-day statutory legal notice, complaint deadlines, bail, and the 50% appeal deposit rule.",
  keywords: [
    "cheque dishonour case in bangladesh",
    "section 138 ni act bangladesh legal notice",
    "cheque bounce case filing timeline 2026",
    "cheque dishonour lawyer dhaka",
    "50 percent deposit for ni act appeal",
    "commercial litigation supreme court bangladesh"
  ],
  publishedDate: "2026-08-10",
  lastModified: "2026-10-17",
  heroIntro: "In Bangladesh's commercial ecosystem, bounced and dishonoured cheques constitute one of the highest volumes of litigation. The governing statute is <strong>Section 138 of the Negotiable Instruments (NI) Act, 1881</strong>. While the law is formulated to ensure the sanctity of banking transactions and commercial trust, procedural deadlines are uncompromising: a single day's delay in dispatching the statutory legal notice or lodging the court complaint can render the entire action legally void. Written by <strong>Advocate Md. Shah Alam</strong>, Supreme Court of Bangladesh, this definitive 2026 practitioner guide navigates both complainant recovery strategies and accused defense tactics.",
  quickAnswer: {
    heading: "⚡ Statutory Timelines: Section 138 Negotiable Instruments Act",
    points: [
      "Presentation Period: Cheque must be deposited within 6 months of the date written on the face of the cheque.",
      "Bank Return Memo: Obtain the official dishonour slip citing 'insufficient funds' or 'exceeds arrangement'.",
      "30-Day Legal Notice: Send formal statutory demand notice via Registered Post with A/D within 30 days of receiving the bank memo.",
      "30-Day Cure Period: The drawer has 30 days from receipt of the notice to settle payment in full.",
      "30-Day Filing Window: If unpaid, complaint must be filed in the competent Court of Joint District Judge or CMM within the next 30 days.",
      "50% Appeal Deposit Rule: Any appeal against a conviction under Section 138 requires a mandatory deposit of 50% of the cheque amount in court."
    ]
  },
  toc: [
    "The Legal Framework of Section 138 Negotiable Instruments Act",
    "The 4 Non-Negotiable Deadlines in Cheque Dishonour Cases",
    "Drafting and Serving the Statutory Legal Notice (Section 138(b))",
    "Trial Procedure in Dhaka Courts (Joint District Judge / CMM)",
    "Bail Rules for the Accused in Section 138 Cases (Bailable Offence)",
    "The Mandatory 50% Deposit Rule for Appeals (Section 138A)",
    "Legitimate Defense Strategies for the Accused (Security Cheques)",
    "Quashment Petitions under Section 561A Cr.P.C. in the High Court",
    "Frequently Asked Questions (FAQ)"
  ],
  sections: [
    {
      h2: "The Legal Framework of Section 138 Negotiable Instruments Act",
      content: `
        <p>Section 138 makes it a quasi-criminal offence when a cheque drawn by a person on an account maintained by them with a banker for payment of any amount of money to another person from out of that account for the discharge, in whole or in part, of any debt or other liability, is returned by the bank unpaid.</p>
        <p><strong>Penal Sanctions:</strong> The offence carries imprisonment for a term which may extend to <strong>one year</strong>, or with fine which may extend to <strong>thrice the amount of the cheque</strong>, or with both.</p>
      `
    },
    {
      h2: "The 4 Non-Negotiable Deadlines in Cheque Dishonour Cases",
      content: `
        <p>To succeed under Section 138, the complainant must follow a rigid calendar:</p>
        <ul>
          <li><strong>1. Cheque Presentation:</strong> Presented to the drawee bank within its validity period (6 months from issuance).</li>
          <li><strong>2. Legal Notice Service:</strong> Notice in writing served on the drawer within <strong>30 days</strong> of receiving the return memo from the bank.</li>
          <li><strong>3. Waiting Window:</strong> Give the drawer <strong>30 days</strong> from the date of receipt of notice to make payment.</li>
          <li><strong>4. Case Filing Deadline:</strong> File the complaint petition within <strong>30 days</strong> immediately following the expiry of the payment window.</li>
        </ul>
      `
    },
    {
      h2: "Drafting and Serving the Statutory Legal Notice (Section 138(b))",
      content: `
        <p>The statutory legal notice must be drafted by an enrolled advocate and dispatched via <strong>Registered Post with Acknowledgement Due (A/D)</strong>. Alternatively, service via publication in a widely circulated national daily newspaper is recognized under the 2006 amendments.</p>
        <p>The notice must demand the exact cheque amount without including extraneous interest calculations or damage claims that could confuse the drawer's statutory obligation.</p>
      `
    },
    {
      h2: "Trial Procedure in Dhaka Courts (Joint District Judge / CMM)",
      content: `
        <p>Cases in Dhaka are adjudicated either by the Chief Metropolitan Magistrate (CMM) Court or transferred to the Courts of Joint District Judges for trial:</p>
        <ol>
          <li><strong>Complainant Examination (Section 200 Cr.P.C.):</strong> The complainant appears before the magistrate to affirm the petition.</li>
          <li><strong>Summons & Warrant:</strong> The court issues summons; if the accused fails to appear, a bailable/non-bailable warrant of arrest is issued.</li>
          <li><strong>Framing of Charge:</strong> The accused appears, secures bail, and formal charge is framed under Section 138.</li>
          <li><strong>Evidence & Cross-Examination:</strong> Original cheque, dishonour memo, postal receipts, and A/D card are admitted as formal court exhibits.</li>
        </ol>
      `
    },
    {
      h2: "Bail Rules for the Accused in Section 138 Cases (Bailable Offence)",
      content: `
        <p>An offence under Section 138 is <strong>bailable as of right</strong>. Upon receiving court summons or executing a surrender after warrant, the accused is entitled to bail upon furnishing local solvent sureties.</p>
        <p>However, willful absence or defaulting on court dates results in cancellation of bail and issuance of non-bailable arrest warrants (WA) and attachment of property (WP&A).</p>
      `
    },
    {
      h2: "The Mandatory 50% Deposit Rule for Appeals (Section 138A)",
      content: `
        <p>One of the most consequential amendments in the NI Act is that <strong>no appeal against an order of conviction and sentence shall be entertained unless 50% of the fine (or cheque amount) awarded by the trial court is deposited in the court</strong> prior to admitting the appeal.</p>
        <p>This statutory pre-deposit protects complainants against frivolous appeals designed solely to stall money recovery.</p>
      `
    },
    {
      h2: "Legitimate Defense Strategies for the Accused (Security Cheques)",
      content: `
        <p>The Appellate Division of the Supreme Court has clarified principles protecting innocent borrowers against extortionate lenders:</p>
        <ul>
          <li><strong>Security Cheque Defense:</strong> Proving that the cheque was handed over solely as an undated security for a loan that has already been substantially repaid.</li>
          <li><strong>Lack of Enforceable Liability:</strong> Demonstrating that no commercial contract or legal consideration existed between the drawer and complainant.</li>
          <li><strong>Defective Notice / Limitation Bar:</strong> Establishing that the legal notice was dispatched beyond 30 days or filed out of limitation.</li>
        </ul>
      `
    },
    {
      h2: "Quashment Petitions under Section 561A Cr.P.C. in the High Court",
      content: `
        <p>If an NI Act case is filed without fulfilling statutory prerequisites or to harass a business director with no personal liability, the accused may approach the High Court Division under <strong>Section 561A Cr.P.C.</strong> to quash the proceedings and stay the trial.</p>
        ${CTA_EN}
      `
    }
  ],
  faqs: [
    {
      question: "Can someone go to jail for a bounced cheque in Bangladesh?",
      answer: "Yes. Section 138 carries a maximum penalty of 1 year imprisonment and a fine of up to three times the cheque amount."
    },
    {
      question: "What happens if the recipient refuses to accept the registered legal notice?",
      answer: "Under Bangladesh postal rules and General Clauses Act, a notice dispatched to the correct address via registered post and returned with 'Refused' or 'Unclaimed' is deemed valid legal service."
    },
    {
      question: "Can you file both an NI Act case and a Money Suit?",
      answer: "Yes. Criminal proceedings under Section 138 and civil recovery suits under Order 37 of the CPC (Money Suit) can proceed simultaneously."
    }
  ],
  relatedServiceLinks: [
    { text: "Corporate & Cheque Litigation", to: "/services/corporate-lawyer" },
    { text: "Supreme Court Litigation Dhaka", to: "/services/supreme-court-lawyer" }
  ],
  lang: "en",
  isDraft: false
};

// -------------------------------------------------------------
// 7. (Bengali) স্বামী নিখোঁজ থাকলে তালাক ও পুনর্বিবাহ ২০২৬
// -------------------------------------------------------------
const post7 = {
  slug: "swami-nikhoj-thakle-talak-re-marriage-ain-2026-bn",
  title: "স্বামী বিদেশে থাকলে বা খোঁজ না পাওয়া গেলে স্ত্রীর তালাক বা দ্বিতীয় বিয়ে করার আইনগত নিয়ম ২০২৬",
  category: "পারিবারিক আইন",
  readTime: "১০ মিনিট পড়ুন",
  metaTitle: "স্বামী নিখোঁজ থাকলে তালাক ও দ্বিতীয় বিয়ের আইনি নিয়ম ২০২৬",
  metaDescription: "স্বামী বিদেশে নিরুদ্দেশ বা যোগাযোগ বিচ্ছিন্ন থাকলে স্ত্রী কীভাবে আইনগতভাবে তালাক বা দ্বিতীয় বিয়ে করবেন? ১৯৩৯ সালের আইন, দেনমোহর ও পারিবারিক আদালতের সম্পূর্ণ নিয়ম।",
  keywords: [
    "স্বামী বিদেশে নিখোঁজ থাকলে তালাকের নিয়ম",
    "নিখোঁজ স্বামীর তালাক আইন ২০২৬",
    "মুসলিম বিবাহ বিচ্ছেদ আইন ১৯৩৯ ধারা ২",
    "তালাক-ই-তৌফিজ কাবিননামার ১৮ নম্বর কলাম",
    "স্বামী নিরুদ্দেশ হলে দ্বিতীয় বিয়ের নিয়ম",
    "পারিবারিক আদালতে দেনমোহর ও খোরপোশ মামলা"
  ],
  publishedDate: "2026-08-01",
  lastModified: "2026-10-17",
  heroIntro: "বাংলাদেশে অনেক পরিবারেই এমন দুর্ভাগ্যজনক পরিস্থিতি দেখা যায় যেখানে স্বামী জীবিকার তাগিদে বা অন্য কোনো কারণে বিদেশে গিয়ে দীর্ঘ বছর যাবৎ নিরুদ্দেশ, স্ত্রীর সাথে কোনো যোগাযোগ রাখেন না এবং ভরণপোষণও প্রদান করেন না। এমন অবস্থায় স্ত্রী সমাজে চরম নিরাপত্তাহীনতা ও অনিশ্চয়তায় দিন কাটান। প্রশ্ন জাগে — আইনি বিচ্ছেদ ছাড়া কি স্ত্রী দ্বিতীয় বিয়ে করতে পারেন? স্বামী নিখোঁজ থাকলে আইনগতভাবে তালাক নেওয়ার সঠিক নিয়ম কী? <strong>মুসলিম বিবাহ বিচ্ছেদ আইন ১৯৩৯</strong> এবং <strong>মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১</strong> অনুযায়ী স্ত্রীর সুনির্দিষ্ট আইনি অধিকার ও নিয়মাবলী নিচে বিশদ আলোচনা করা হলো। যে কোনো পারিবারিক আইনি জটিলতায় সুপ্রিম কোর্টের অভিজ্ঞ পারিবারিক আইনজীবী <a href=\"/advocate-md-shah-alam\" style=\"color:var(--accent);font-weight:700;\">অ্যাডভোকেট মো. শাহ আলম</a>-এর পরামর্শ নিন।",
  quickAnswer: {
    heading: "⚡ স্বামী নিরুদ্দেশ থাকলে স্ত্রীর ৪টি প্রধান আইনি অধিকার ও নিয়ম",
    points: [
      "কাবিননামায় ক্ষমতা (১৮ নম্বর কলাম): কাবিননামায় তালাক-ই-তৌফিজের ক্ষমতা থাকলে স্ত্রী নিজে তালাক সম্পাদন করে সংশ্লিষ্ট চেয়ারম্যানকে নোটিশ পাঠাতে পারেন; ৯০ দিন পর তালাক কার্যকর হয়।",
      "স্বামী ৪ বছর নিখোঁজ থাকলে: ১৯৩৯ সালের মুসলিম বিবাহ বিচ্ছেদ আইনের ২(১) ধারা অনুযায়ী পারিবারিক আদালতে মামলা দায়ের করে সরাসরি বিবাহ বিচ্ছেদের ডিক্রি লাভ করা যায়।",
      "২ বছর ভরণপোষণ না দিলে: ধারা ২(২) ও ২(৪) অনুযায়ী স্বামী কোনো যুক্তিসঙ্গত কারণ ছাড়া ২ বছর ভরণপোষণ না দিলে বা দাম্পত্য দায়িত্ব পালন না করলে স্ত্রী আদালতের মাধ্যমে বিচ্ছেদের অধিকারী হন।",
      "আইনি সতর্কতা: আইনসম্মত তালাক বা আদালতের ডিক্রি ছাড়া দ্বিতীয় বিয়ে করলে দণ্ডবিধির ৪৯৪ ধারা অনুযায়ী 'দ্বিবিবাহ' (Bigamy) হিসেবে ৭ বছর পর্যন্ত কারাদণ্ড হতে পারে।",
      "পারিবারিক পরামর্শ: উত্তরা ও সুপ্রিম কোর্ট চেম্বারে সরাসরি সাক্ষাতের জন্য কল করুন: +৮৮০ ১৭১২-৬৫৫৫৪৬।"
    ]
  },
  toc: [
    "স্বামী নিখোঁজ থাকলে আইনি পদক্ষেপ ছাড়া দ্বিতীয় বিয়ে করা কেন দণ্ডনীয় অপরাধ?",
    "পদ্ধতি ১: কাবিননামার ১৮ নম্বর কলামে ক্ষমতা (তালাক-ই-তৌফিজ) থাকলে করণীয়",
    "পদ্ধতি ২: স্বামী ৪ বছর নিখোঁজ থাকলে পারিবারিক আদালতে মামলা (১৯৩৯ সালের আইন)",
    "পদ্ধতি ৩: স্বামী ২ বছর ভরণপোষণ না দিলে আদালতের আশ্রয় গ্রহণ",
    "পারিবারিক আদালতে মামলা দায়ের ও জাতীয় দৈনিকে সমন জারি প্রক্রিয়া",
    "একতরফা ডিক্রি (Ex-Parte Decree) লাভ ও ইদ্দত পালনের সময়সীমা",
    "নিখোঁজ স্বামীর কাছে বকেয়া দেনমোহর ও ভরণপোষণ দাবির নিয়ম",
    "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
  ],
  sections: [
    {
      h2: "স্বামী নিখোঁজ থাকলে আইনি পদক্ষেপ ছাড়া দ্বিতীয় বিয়ে করা কেন দণ্ডনীয় অপরাধ?",
      content: `
        <p>অনেকেই মনে করেন স্বামী দীর্ঘদিন খোঁজ না রাখলে বিবাহ স্বয়ংক্রিয়ভাবে বাতিল হয়ে যায়। এই ধারণাটি সম্পূর্ণ ভুল এবং আইনত বিপজ্জনক।</p>
        <p>মুসলিম আইন বা বাংলাদেশের দেওয়ানি আইন অনুযায়ী কোনো বিবাহ নিজে নিজে বাতিল হয় না। আইনসম্মত বিচ্ছেদ ছাড়া স্ত্রী পুনরায় বিবাহবন্ধনে আবদ্ধ হলে পূর্বের স্বামী ফিরে এসে দণ্ডবিধির <strong>৪৯৪ ধারা (দ্বিবিবাহ / Bigamy)</strong> মোতাবেক মামলা করতে পারে, যাতে স্ত্রীর <strong>৭ বছর পর্যন্ত কারাদণ্ড</strong> এবং দ্বিতীয় বিবাহটি অবৈধ ঘোষিত হতে পারে।</p>
      `
    },
    {
      h2: "পদ্ধতি ১: কাবিননামার ১৮ নম্বর কলামে ক্ষমতা (তালাক-ই-তৌফিজ) থাকলে করণীয়",
      content: `
        <p>যদি আপনার কাবিননামার ১৮ নম্বর কলামে স্বামীকে তালাক প্রদানের ক্ষমতা (তালাক-ই-তৌফিজ) শর্তহীনভাবে দেওয়া থাকে, তবে আপনি খুব সহজেই বিবাহ বিচ্ছেদ সম্পন্ন করতে পারবেন:</p>
        <ol>
          <li>একজন নিকাহ রেজিস্ট্রার (কাজী)-এর কাছে গিয়ে তালাক সম্পাদন করুন।</li>
          <li>স্বামীর সর্বশেষ পরিচিত ঠিকানা এবং স্থানীয় ইউনিয়ন পরিষদ চেয়ারম্যান বা সিটি কর্পোরেশনের মেয়র বরাবরে <em>মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ এর ৭ ধারা</em> অনুযায়ী ডাকযোগে তালাকের লিখিত নোটিশ পাঠান।</li>
          <li>চেয়ারম্যানের নোটিশ প্রাপ্তির দিন থেকে <strong>৯০ দিন</strong> অতিবাহিত হলে তালাক চূড়ান্ত ও কার্যকর হবে। এরপর স্ত্রী নির্দ্বিধায় দ্বিতীয় বিয়ে করতে পারবেন।</li>
        </ol>
      `
    },
    {
      h2: "পদ্ধতি ২: স্বামী ৪ বছর নিখোঁজ থাকলে পারিবারিক আদালতে মামলা (১৯৩৯ সালের আইন)",
      content: `
        <p>যদি কাবিননামার ১৮ নম্বর কলামে ক্ষমতা না থাকে এবং স্বামী দীর্ঘদিন নিখোঁজ থাকেন, তবে <strong>মুসলিম বিবাহ বিচ্ছেদ আইন, ১৯৩৯ (The Dissolution of Muslim Marriages Act, 1939) এর ধারা ২(১)</strong> অনুযায়ী স্ত্রীর আদালতে যাওয়ার অধিকার রয়েছে:</p>
        <blockquote>"স্বামী চার বছর যাবৎ কোথায় আছেন তা অজ্ঞাত থাকলে বা খোঁজ না পাওয়া গেলে স্ত্রী বিবাহ বিচ্ছেদের ডিক্রি চেয়ে পারিবারিক আদালতে মামলা করতে পারেন।"</blockquote>
      `
    },
    {
      h2: "পদ্ধতি ৩: স্বামী ২ বছর ভরণপোষণ না দিলে আদালতের আশ্রয় গ্রহণ",
      content: `
        <p>১৯৩৯ সালের আইনের ধারা ২(২) অনুযায়ী স্বামী যদি কোনো সঙ্গত কারণ ছাড়াই একটানা <strong>দুই বছর স্ত্রীকে খোরপোশ বা ভরণপোষণ প্রদান করতে ব্যর্থ হন</strong>, তবে স্ত্রী পারিবারিক আদালতের মাধ্যমে বিবাহ বিচ্ছেদের ডিক্রি লাভের অধিকারী হন।</p>
      `
    },
    {
      h2: "পারিবারিক আদালতে মামলা দায়ের ও জাতীয় দৈনিকে সমন জারি প্রক্রিয়া",
      content: `
        <p>আদালতের মাধ্যমে ডিক্রি নেওয়ার ধাপসমূহ:</p>
        <ul>
          <li>অভিজ্ঞ পারিবারিক আইনজীবীর মাধ্যমে সহকারী জজ আদালত (পারিবারিক আদালত)-এ আরজি দাখিল।</li>
          <li>স্বামীর স্থায়ী ঠিকানা এবং শেষ কর্মস্থলে সমন জারি। স্বামী বিদেশে থাকায় সমন ফেরত আসলে আদালতের নির্দেশে বহুল প্রচারিত জাতীয় দৈনিকে বিজ্ঞপ্তি প্রকাশ করা হয়।</li>
          <li>বিজ্ঞপ্তি প্রকাশের পরও স্বামী হাজির না হলে বিজ্ঞ আদালত একতরফা শুনানির দিন ধার্য করেন।</li>
        </ul>
      `
    },
    {
      h2: "একতরফা ডিক্রি (Ex-Parte Decree) লাভ ও ইদ্দত পালনের সময়সীমা",
      content: `
        <p>সাক্ষ্য-প্রমাণ ও স্থানীয় তদন্তের ভিত্তিতে বিজ্ঞ পারিবারিক আদালত বিবাহ বিচ্ছেদের একতরফা ডিক্রি (Ex-parte Decree) মঞ্জুর করেন।</p>
        <p>আদালতের ডিক্রির একটি অনুলিপি সংশ্লিষ্ট ইউনিয়ন পরিষদ চেয়ারম্যানের নিকট প্রেরণ করা হয়। ডিক্রির পর স্ত্রী প্রয়োজনীয় ইদ্দতকাল (সাধারণত ৯০ দিন) সম্পন্ন করার পর সম্পূর্ণ বৈধভাবে যেকোনো পাত্রের সাথে পুনর্বিবাহ করতে পারবেন।</p>
      `
    },
    {
      h2: "নিখোঁজ স্বামীর কাছে বকেয়া দেনমোহর ও ভরণপোষণ দাবির নিয়ম",
      content: `
        <p>বিবাহ বিচ্ছেদ হলেও স্ত্রী তার কাবিননামায় প্রতিশ্রুত দেনমোহর (Dower) এবং বিগত দিনের ভরণপোষণ পাওয়ার পূর্ণ অধিকার রাখেন। নিখোঁজ স্বামীর দেশে কোনো স্থাবর সম্পত্তি থাকলে আদালত তা ক্রোক করে দেনমোহরের অর্থ পরিশোধের আদেশ দিতে পারেন।</p>
        ${CTA_BN}
      `
    }
  ],
  faqs: [
    {
      question: "স্বামী নিখোঁজ থাকলে কত বছর পর তাকে মৃত বলে গণ্য করা হয়?",
      answer: "সাক্ষ্য আইন ১৮৭২ (Evidence Act) এর ১০৮ ধারা অনুযায়ী যদি কোনো ব্যক্তি সম্পর্কে যাদের স্বাভাবিকভাবে জানার কথা তারা টানা ৭ বছর কোনো খোঁজ না পান, তবে আদালত তাকে আইনত মৃত বলে গণ্য করতে পারেন।"
    },
    {
      question: "স্ত্রী কি আদালতের অনুমতি ছাড়া নোটারি পাবলিকের মাধ্যমে তালাক দিতে পারেন?",
      answer: "না। নোটারি পাবলিক কোনো আদালত বা কাজী নন। নোটারি এফিডেভিট দিয়ে তালাক দেওয়া আইনসম্মত নয়; চেয়ারম্যানের নিকট ১৯৬১ সালের আইনের নোটিশ ও কাজী অফিসের রেজিস্ট্রেশন বা পারিবারিক আদালতের ডিক্রি বাধ্যতামূলক।"
    },
    {
      question: "আদালত থেকে নিখোঁজ স্বামীর বিরুদ্ধে তালাকের ডিক্রি পেতে কতদিন সময় লাগে?",
      answer: "জাতীয় দৈনিকে বিজ্ঞপ্তি ও একতরফা শুনানির আনুষ্ঠানিকতা সম্পন্ন হতে সাধারণত ৪ থেকে ৮ মাস সময় লাগতে পারে।"
    }
  ],
  relatedServiceLinks: [
    { text: "পারিবারিক আদালত ও বিবাহ বিচ্ছেদ সেবা", to: "/services/family-lawyer" },
    { text: "আইনজীবী চেম্বার ঢাকা", to: "/services/supreme-court-lawyer" }
  ],
  lang: "bn",
  isDraft: false
};

// -------------------------------------------------------------
// 8. (English) Flat and Apartment Buying Checklist 2026
// -------------------------------------------------------------
const post8 = {
  slug: "flat-apartment-purchase-legal-checklist-bangladesh",
  title: "Flat and Apartment Buying Legal Checklist in Bangladesh 2026: Registration Fees, Developer Disputes & Gain Tax",
  category: "Real Estate Law",
  readTime: "13 min read",
  metaTitle: "Flat & Apartment Buying Legal Checklist Bangladesh 2026: Fees & Laws",
  metaDescription: "Essential legal checklist before buying an apartment in Dhaka. Real Estate Act 2010 safeguards, flat registration cost breakdown, Gain Tax (AIT), and developer dispute remedies.",
  keywords: [
    "flat buying legal checklist bangladesh",
    "apartment registration fee bangladesh 2026",
    "real estate act 2010 developer dispute",
    "flat buying gain tax ait dhaka",
    "vetting documents for flat purchase",
    "rehab developer legal notice"
  ],
  publishedDate: "2026-06-20",
  lastModified: "2026-10-17",
  heroIntro: "Purchasing a flat or apartment in Dhaka—whether in Uttara, Mirpur, Bashundhara, Dhanmondi, or Gulshan—represents one of the largest capital investments an individual or expatriate family will ever make. However, the urban real estate market is fraught with perils: developer delivery delays spanning years, unapproved floor additions violating RAJUK master plans, mortgaged mother land, and staggering hidden registration and tax costs. The <strong>Real Estate Development and Management Act, 2010 (রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন ২০১০)</strong> grants robust statutory rights to apartment buyers, provided the contractual documents are drafted and vetted with absolute precision. This definitive 2026 guide by <strong>Advocate Md. Shah Alam</strong>, Supreme Court of Bangladesh, provides the ultimate buyer's legal checklist.",
  quickAnswer: {
    heading: "⚡ Apartment Purchase Due Diligence & Cost Breakdown 2026",
    points: [
      "Total Registration Burden: Typically 7% to 10% of total recorded deed value (Stamp Duty 1.5%, Registration Fee 1%, Local Govt Tax 1.5–2%, Advance Income Tax / Gain Tax per sq metre).",
      "Developer Mandatory Clearances: Verify RAJUK/CDA structural plan approval, Landowner-Developer Joint Venture Agreement, and Registered Irrevocable Power of Attorney.",
      "Title Due Diligence: Inspect 25–30 year chain deeds (Baya Dalil), CS/SA/RS/City Survey Khatians, and 12-year Sub-Registry Non-Encumbrance Certificate (NEC).",
      "Real Estate Act 2010 Protection: Developers cannot alter layout plans without written consent, and must compensate buyers for handover delays beyond the contractual deadline.",
      "Professional Legal Vetting: Consult Supreme Court Property Advocate Md. Shah Alam at +8801712655546 before signing the Baina Agreement or paying earnest money."
    ]
  },
  toc: [
    "Why Independent Legal Due Diligence is Vital for Flat Buyers",
    "Phase 1: Mother Land Title & Survey Verification",
    "Phase 2: Verifying RAJUK, CDA & Municipal Approvals",
    "Phase 3: The Developer Agreement & Registered Power of Attorney",
    "Phase 4: Scrutinizing the Deed of Agreement for Sale (Baina Nama)",
    "Apartment Registration Fees & Gain Tax Breakdown (2026 Rates)",
    "Remedies Under Real Estate Act 2010 for Developer Default",
    "Post-Handover Checklist: Mutation, Association & Utility Demarcation",
    "Frequently Asked Questions (FAQ)"
  ],
  sections: [
    {
      h2: "Why Independent Legal Due Diligence is Vital for Flat Buyers",
      content: `
        <p>Never rely on a real estate developer’s in-house panel lawyer. In-house lawyers represent the developer's corporate interests, not the buyer's financial safety. An independent property advocate scrutinizes whether the developer has actual authority to sell the flat, whether the landowner has raised any disputes, and whether the project sits on encumbered or mortgaged soil.</p>
      `
    },
    {
      h2: "Phase 1: Mother Land Title & Survey Verification",
      content: `
        <p>An apartment building stands upon 'Mother Land'. If the mother land's title is flawed, every apartment deed constructed upon it is legally compromised:</p>
        <ul>
          <li><strong>Chain of Ownership (বায়া দলিল):</strong> Verify an unbroken 25-to-30-year chain of title connecting current landowners to historical cadastral records.</li>
          <li><strong>Survey Khatians:</strong> Inspect CS, SA, RS, and BS/City Jarip Khatians to ensure the land classification permits residential construction (not wetland/viti or acquired government property).</li>
          <li><strong>Sub-Registry Non-Encumbrance Certificate (NEC):</strong> Obtain a 12-to-30-year NEC certifying that the landowner has not mortgaged the plot to commercial banks.</li>
        </ul>
      `
    },
    {
      h2: "Phase 2: Verifying RAJUK, CDA & Municipal Approvals",
      content: `
        <p>Unapproved construction is subject to immediate demolition by regulatory authorities:</p>
        <ul>
          <li><strong>Approved Building Plan (নকশা অনুমোদন):</strong> Cross-check the architectural design approved by RAJUK (Dhaka), CDA (Chittagong), or KDA (Khulna).</li>
          <li><strong>Floor Number Verification:</strong> Confirm that the specific flat you are buying is part of the approved floor plan (e.g., buying 8th floor when approval was granted only up to 6 floors is illegal).</li>
          <li><strong>Fire, Environmental & Civil Aviation NOCs:</strong> Ensure high-rise buildings possess valid clearances from the Fire Service and Civil Aviation Authority of Bangladesh (CAAB).</li>
        </ul>
      `
    },
    {
      h2: "Phase 3: The Developer Agreement & Registered Power of Attorney",
      content: `
        <p>In joint-venture developments between a private landowner and a developer company:</p>
        <ol>
          <li>Examine the <strong>Development Agreement (JV Agreement)</strong> to see the exact allocation of floors and car parking spaces between landowner and developer.</li>
          <li>Verify the <strong>Registered Irrevocable General Power of Attorney (IGPA)</strong> granted by the landowner to the developer under the Power of Attorney Act 2012, confirming the developer has explicit legal authority to execute sale deeds and accept payments from buyers.</li>
        </ol>
      `
    },
    {
      h2: "Phase 4: Scrutinizing the Deed of Agreement for Sale (Baina Nama)",
      content: `
        <p>The <em>Baina Nama</em> governs the entire transaction until final registration. Ensure these mandatory clauses are included:</p>
        <ul>
          <li><strong>Exact Specifications:</strong> Clear net square footage, common area allocation percentage, and designated car parking slot number.</li>
          <li><strong>Strict Handover Date & Grace Period:</strong> Exact calendar date of flat delivery and compensation penalties for developer delays.</li>
          <li><strong>No Alteration Clause:</strong> A covenant prohibiting the developer from altering architectural layouts without the buyer's written approval.</li>
        </ul>
      `
    },
    {
      h2: "Apartment Registration Fees & Gain Tax Breakdown (2026 Rates)",
      content: `
        <p>The total government cost for registering an apartment in Bangladesh generally amounts to <strong>7% to 10%</strong> of the deed valuation:</p>
        <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.95rem;">
          <thead>
            <tr style="background:var(--accent-subtle);color:var(--accent);text-align:left;">
              <th style="padding:10px;border:1px solid var(--card-border);">Tax / Fee Head</th>
              <th style="padding:10px;border:1px solid var(--card-border);">Applicable Rate (2026)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px;border:1px solid var(--card-border);">Stamp Duty</td>
              <td style="padding:10px;border:1px solid var(--card-border);">1.5% of total deed value</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid var(--card-border);">Registration Fee</td>
              <td style="padding:10px;border:1px solid var(--card-border);">1% of deed value</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid var(--card-border);">Local Government Tax</td>
              <td style="padding:10px;border:1px solid var(--card-border);">1.5% to 2% (City Corporation / Cantonment)</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid var(--card-border);">Advance Income Tax (AIT / Gain Tax)</td>
              <td style="padding:10px;border:1px solid var(--card-border);">Fixed rate per sq metre (Sec 124 of Income Tax Act 2023)</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      h2: "Remedies Under Real Estate Act 2010 for Developer Default",
      content: `
        <p>Under the Real Estate Development and Management Act 2010, buyers have robust legal protections:</p>
        <ul>
          <li><strong>Delay Penalty (Section 15):</strong> If the developer fails to deliver the flat within the agreed deadline, they must pay monthly compensation to the buyer at the prescribed statutory rate.</li>
          <li><strong>Arbitration & Notice:</strong> Serving a 30-day statutory legal notice followed by arbitration before the Real Estate Arbitration Board.</li>
          <li><strong>Criminal Prosecution:</strong> Section 27 to 36 impose imprisonment of up to 3 years and heavy fines for developers who defraud buyers, construct unauthorized floors, or pledge allocated apartments to third parties.</li>
        </ul>
      `
    },
    {
      h2: "Post-Handover Checklist: Mutation, Association & Utility Demarcation",
      content: `
        <p>After taking physical possession and executing the final registered sale deed (সাব-কবালা দলিল):</p>
        <ol>
          <li>Apply for <strong>e-Mutation</strong> to record your undivided proportionate land share (অবিভক্ত ও অচিহ্নিত অংশ) in your own name at the local AC Land office.</li>
          <li>Transfer DESCO/DPDC electricity meters and Titas Gas connections to your name.</li>
          <li>Form the Apartment Owners' Welfare Association to manage common facilities, elevators, and security funds.</li>
        </ol>
        ${CTA_EN}
      `
    }
  ],
  faqs: [
    {
      question: "Can a developer sell parking spaces separately?",
      answer: "Under the Real Estate Act 2010, developers cannot sell common areas or open spaces, but designated covered car parking spaces allocated in the approved plan may be allotted to flat buyers."
    },
    {
      question: "What is an undivided proportionate land share?",
      answer: "When you buy an apartment, you own both the physical flat space and a proportionate undivided ownership share of the land underneath the building."
    },
    {
      question: "What should I do if a developer delays apartment handover?",
      answer: "Serve a formal legal notice through a Supreme Court advocate demanding completion and monthly financial compensation under Section 15 of the Real Estate Act 2010, followed by an arbitration claim or criminal complaint."
    }
  ],
  relatedServiceLinks: [
    { text: "Property Law Services", to: "/services/land-lawyer" },
    { text: "Corporate Real Estate Lawyer", to: "/services/corporate-lawyer" }
  ],
  lang: "en",
  isDraft: false
};

// -------------------------------------------------------------
// 9. (Bengali) নাবালকের সম্পত্তি বিক্রি ও অনুমতি ২০২৬
// -------------------------------------------------------------
const post9 = {
  slug: "nabaloker-sompotti-bikroy-adaloter-anumoti-ain-prokriya-2026",
  title: "নাবালকের সম্পত্তি বিক্রির আইনি নিয়ম ২০২৬: আদালতের অনুমতি ছাড়া জমি বিক্রি করলে দলিল কি বাতিল হয়?",
  category: "দেওয়ানি ও সম্পত্তি আইন",
  readTime: "১১ মিনিট পড়ুন",
  metaTitle: "নাবালকের সম্পত্তি বিক্রির আইনি নিয়ম ২০২৬: আদালতের অনুমতি ও দলিল বাতিল",
  metaDescription: "নাবালকের জমি বিক্রিতে জেলা জজ আদালতের পূর্বানুমতি নেওয়ার নিয়ম। আদালতের পারমিশন ছাড়া মা বা ভাই জমি বিক্রি করলে দলিল বাতিলের ঝুঁকি ও সুনির্দিষ্ট প্রতিকার আইনের বিধান।",
  keywords: [
    "নাবালকের সম্পত্তি বিক্রির নিয়ম",
    "অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ ধারা ২৯",
    "নাবালকের জমি বিক্রির আদালতের অনুমতি",
    "নাবালকের দলিল বাতিলের মোকাদ্দমা",
    "প্রাকৃতিক অভিভাবক জমি বিক্রি",
    "জেলা জজ আদালত পারমিশন দরখাস্ত"
  ],
  publishedDate: "2026-08-20",
  lastModified: "2026-10-17",
  heroIntro: "পিতার আকস্মিক মৃত্যুতে বা উত্তরাধিকার সূত্রে অনেক সময় অপ্রাপ্তবয়স্ক বা নাবালক সন্তানরা বিপুল স্থাবর সম্পত্তির মালিক হয়ে থাকে। বাস্তবতার প্রেক্ষিতে নাবালকের চিকিৎসা, লেখাপড়া বা জীবনধারণের প্রয়োজনে সেই জমি বিক্রি করার প্রয়োজনীয়তা দেখা দেয়। কিন্তু আইন না জেনে মা, বড় ভাই বা নিকটাত্মীয়রা অনেক সময় সরাসরি সাব-রেজিস্ট্রি অফিসে গিয়ে নাবালকের অংশ বিক্রি করে দলিল রেজিস্ট্রি করে দেন। এমন জমি কেনা ক্রেতার জন্য মারাত্মক সর্বনাশের কারণ হতে পারে। <strong>অভিভাবক ও প্রতিপাল্য আইন, ১৮৯০ (The Guardians and Wards Act, 1890)</strong> অনুযায়ী জেলা জজ আদালতের সুস্পষ্ট অনুমতি ব্যতীত নাবালকের সম্পত্তি হস্তান্তর আইনত সম্পূর্ণ অবৈধ ও বাতিলযোগ্য। এ বিষয়ে লিখেছেন বাংলাদেশ সুপ্রিম কোর্টের সিনিয়র আইনজীবী <a href=\"/advocate-md-shah-alam\" style=\"color:var(--accent);font-weight:700;\">অ্যাডভোকেট মো. শাহ আলম</a>।",
  quickAnswer: {
    heading: "⚡ নাবালকের সম্পত্তি সংক্রান্ত গুরুত্বপূর্ণ আইনি মূলনীতি",
    points: [
      "আদালতের অনুমতি বাধ্যতামূলক: অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ (The Guardians and Wards Act)-এর ধারা ২৯ অনুযায়ী জেলা জজ আদালতের লিখিত পূর্বানুমতি ছাড়া নাবালকের স্থাবর সম্পত্তি বিক্রয় বা বন্ধক দেওয়া আইনত নিষিদ্ধ।",
      "মায়ের আইনগত সীমাবদ্ধতা: মুসলিম আইনে পিতা জীবিত না থাকলে মা স্বাভাবিক অভিভাবক (Legal Guardian of Property) নন; মা কেবল সন্তানের শরীরিক অভিভাবক (হিজানাত)। আদালতের নিয়োগপত্র ছাড়া মা কর্তৃক রেজিস্ট্রিকৃত জমি হস্তান্তর অবৈধ।",
      "অনুমতিহীন দলিলের পরিণতি: ধারা ৩০ অনুযায়ী আদালতের অনুমতি ছাড়া সম্পাদিত দলিল নাবালকের জন্য 'বাতিলযোগ্য' (Voidable); সাবালক হওয়ার ৩ বছরের মধ্যে তামাদি আইনের ৪৪ অনুচ্ছেদ অনুযায়ী নাবালক উক্ত দলিল বাতিলের মামলা করতে পারে।",
      "ক্রেতার সর্বস্ব হারানোর ঝুঁকি: অনুমতিহীন দলিল যে কোনো সময় বাতিল হতে পারে এবং ক্রেতা তার জমিতে কোনো বৈধ স্বত্ব বা অধিকার দাবি করতে পারেন না।",
      "আদালতে আবেদন ও আইনি সুরক্ষা: জেলা জজ আদালতে অভিভাবক নিয়োগ ও বিক্রয় অনুমতির পিটিশনের জন্য সরাসরি সুপ্রিম কোর্ট আইনজীবী অ্যাডভোকেট মো. শাহ আলমের সাথে যোগাযোগ করুন: +৮৮০ ১৭১২-৬৫৫৫৪৬।"
    ]
  },
  toc: [
    "নাবালক (Minor) কে এবং কার নাবালকের সম্পত্তি বিক্রির ক্ষমতা আছে?",
    "মুসলিম ও প্রচলিত আইনে স্বাভাবিক অভিভাবক বনাম ডি ফ্যাক্টো অভিভাবক",
    "অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ এর ২৯ ধারার কঠোর বিধান",
    "আদালতের অনুমতি ছাড়া জমি বিক্রি করলে দলিলের আইনি পরিণতি (ধারা ৩০)",
    "সাবালক হওয়ার পর নাবালকের দলিল বাতিলের অধিকার (তামাদি আইন ৪৪ অনুচ্ছেদ)",
    "জেলা জজ আদালত থেকে নাবালকের জমি বিক্রির অনুমতি নেওয়ার সঠিক প্রক্রিয়া",
    "ক্রেতাদের জন্য আইনজীবীর সতর্কতা ও লিগ্যাল অডিট",
    "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
  ],
  sections: [
    {
      h2: "নাবালক (Minor) কে এবং কার নাবালকের সম্পত্তি বিক্রির ক্ষমতা আছে?",
      content: `
        <p>১৮৭৫ সালের সাবালকত্ব আইন (The Majority Act, 1875) অনুযায়ী সাধারণ ক্ষেত্রে ১৮ বছর পূর্ণ না হওয়া পর্যন্ত একজন ব্যক্তি নাবালক। তবে যে নাবালকের শরীর বা সম্পত্তির জন্য আদালত অভিভাবক নিয়োগ করেছেন, তার ক্ষেত্রে সাবালকত্বের বয়স <strong>২১ বছর</strong>।</p>
        <p>নাবালক কোনো চুক্তি (Contract) সম্পাদনে আইনত অক্ষম। তাই নাবালকের পক্ষে অন্য কেউ তার স্থাবর সম্পত্তি আদালতের অনুমোদন ছাড়া হস্তান্তর করতে পারে না।</p>
      `
    },
    {
      h2: "মুসলিম ও প্রচলিত আইনে স্বাভাবিক অভিভাবক বনাম ডি ফ্যাক্টো অভিভাবক",
      content: `
        <p>অনেকেই মনে করেন বাবা মারা গেলে মা-ই সন্তানের সম্পত্তির একমাত্র মালিক ও অভিভাবক। আইনগতভাবে এটি একটি বড় ভুল ধারণা:</p>
        <ul>
          <li><strong>প্রাকৃতিক বা আইনগত অভিভাবক (Legal Guardian):</strong> মুসলিম আইনে কেবল পিতা এবং পিতার অবর্তমানে পিতার মনোনীত অসি (Executor) বা দাদা সম্পত্তির আইনগত অভিভাবক।</li>
          <li><strong>মায়ের ভূমিকা (De Facto Guardian):</strong> মা কেবল নাবালকের শারীরিক দেখাশোনার (Hizanat) অধিকারী, কিন্তু তিনি সম্পত্তির আইনগত অভিভাবক নন। আদালত থেকে অভিভাবকত্ব সনদ ছাড়া মা জমি বিক্রি করলে তা বাতিল বলে গণ্য হবে।</li>
        </ul>
      `
    },
    {
      h2: "অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ এর ২৯ ধারার কঠোর বিধান",
      content: `
        <p><strong>The Guardians and Wards Act, 1890 এর ধারা ২৯</strong> অনুযায়ী, আদালতের মাধ্যমে নিযুক্ত অভিভাবকও জেলা জজ আদালতের পূর্বানুমতি ছাড়া নাবালকের স্থাবর সম্পত্তির কোনো অংশ বিক্রয়, বন্ধক, উপহার বা ৫ বছরের বেশি মেয়াদে ইজারা দিতে পারেন না।</p>
        <p>আদালত কেবল তখনই বিক্রয়ের অনুমতি প্রদান করেন যখন সুস্পষ্টভাবে প্রমাণিত হয় যে — সম্পত্তিটি বিক্রয় করা নাবালকের ভরনপোষণ, উচ্চশিক্ষা, জটিল চিকিৎসা বা তার অন্য কোনো সম্পত্তি রক্ষার জন্য একান্ত অপরিহার্য।</p>
      `
    },
    {
      h2: "আদালতের অনুমতি ছাড়া জমি বিক্রি করলে দলিলের আইনি পরিণতি (ধারা ৩০)",
      content: `
        <p>অভিভাবক ও প্রতিপাল্য আইনের <strong>ধারা ৩০</strong> অনুযায়ী, আদালতের অনুমতি ছাড়া কোনো অভিভাবক জমি হস্তান্তর করলে উক্ত দলিল নাবালকের ইচ্ছায় <strong>'বাতিলযোগ্য' (Voidable)</strong> হবে। অর্থাৎ নাবালক সাবালক হওয়ার পর যেকোনো সময় আদালতে গিয়ে উক্ত দলিল বাতিল করিয়ে জমি ফেরত নিতে পারে।</p>
      `
    },
    {
      h2: "সাবালক হওয়ার পর নাবালকের দলিল বাতিলের অধিকার (তামাদি আইন ৪৪ অনুচ্ছেদ)",
      content: `
        <p>১৯০৮ সালের তামাদি আইন (Limitation Act, 1908) এর <strong>আর্টিকেল ৪৪</strong> অনুযায়ী, নাবালক ১৮ বছর পূর্ণ করার পর পরবর্তী <strong>৩ বছরের মধ্যে</strong> সহকারী জজ আদালতে সুনির্দিষ্ট প্রতিকার আইনের ৩৯ ধারায় অভিভাবক কর্তৃক সম্পাদিত অবৈধ দলিল বাতিলের মোকদ্দমা দায়ের করতে পারে। এতে ক্রেতার দখল উচ্ছেদ হয়ে যাবে।</p>
      `
    },
    {
      h2: "জেলা জজ আদালত থেকে নাবালকের জমি বিক্রির অনুমতি নেওয়ার সঠিক প্রক্রিয়া",
      content: `
        <p>আইনসম্মতভাবে নাবালকের সম্পত্তি বিক্রি করার সঠিক নিয়মাবলী:</p>
        <ol>
          <li>বিজ্ঞ জেলা জজ আদালতে অভিভাবক ও প্রতিপাল্য আইনের আওতায় অভিভাবকত্ব ও বিক্রির অনুমতির আবেদন দাখিল করা।</li>
          <li>আবেদনে বিক্রির সুনির্দিষ্ট কারণ ও নাবালকের আর্থিক প্রয়োজনীয়তা প্রমাণ করা।</li>
          <li>আদালত কর্তৃক জাতীয় দৈনিকে বা স্থানীয়ভাবে আপত্তি আহ্বানের নোটিশ জারি।</li>
          <li>শুনানি শেষে আদালত সন্তুষ্ট হলে সর্বনিম্ন বিক্রয়মূল্য নির্ধারণপূর্বক অনুমতি আদেশ প্রদান করবেন এবং বিক্রয়লব্ধ টাকা নাবালকের নামে ব্যাংকে ফিক্সড ডিপোজিট (FDR) রাখার নির্দেশ দেবেন।</li>
        </ol>
      `
    },
    {
      h2: "ক্রেতাদের জন্য আইনজীবীর সতর্কতা ও লিগ্যাল অডিট",
      content: `
        <p>কোনো জমিতে যদি ওয়ারিশ সূত্রে নাবালকের অংশ থাকে, তবে আদালতের মূল অনুমতির আদেশপত্র যাচাই না করে ভুলেও বায়না বা রেজিস্ট্রি করবেন না। জটিল দেওয়ানি বিরোধ থেকে নিজের পুঁজিপাট্টা রক্ষা করতে সুপ্রিম কোর্টের অভিজ্ঞ দেওয়ানি আইনজীবীর মাধ্যমে লিগ্যাল টাইটেল অডিট নিশ্চিত করুন।</p>
        ${CTA_BN}
      `
    }
  ],
  faqs: [
    {
      question: "আদালতের অনুমতি ছাড়া মা কি নাবালক সন্তানের জমি বিক্রি করতে পারেন?",
      answer: "না। মুসলিম আইন এবং অভিভাবকত্ব আইন অনুযায়ী মা আদালতের সুস্পষ্ট পূর্বানুমতি ছাড়া নাবালকের স্থাবর সম্পত্তি বিক্রি করতে পারেন না; এমন দলিল আইনত বাতিলযোগ্য।"
    },
    {
      question: "নাবালকের জমি বিক্রির অনুমতি পেতে কতদিন সময় লাগে?",
      answer: "জেলা জজ আদালতে প্রয়োজনীয় প্রমাণাদি উপস্থাপন ও নোটিশ প্রক্রিয়া সম্পন্ন হতে সাধারণত ৩ থেকে ৬ মাস সময় লাগতে পারে।"
    },
    {
      question: "নাবালক সাবালক হওয়ার পর কতদিনের মধ্যে দলিল বাতিলের মামলা করতে পারে?",
      answer: "তামাদি আইনের ৪৪ অনুচ্ছেদ অনুযায়ী সাবালক হওয়ার দিন থেকে ৩ বছরের মধ্যে দেওয়ানি আদালতে দলিল বাতিলের মামলা দায়ের করতে হয়।"
    }
  ],
  relatedServiceLinks: [
    { text: "সম্পত্তি ও দেওয়ানি মামলা সেবা", to: "/services/land-lawyer" },
    { text: "পারিবারিক ও অভিভাবকত্ব আইন", to: "/services/family-lawyer" }
  ],
  lang: "bn",
  isDraft: false
};

// -------------------------------------------------------------
// 10. (English) Supreme Court Lawyer in Dhaka: Writ Petition & Criminal Appeal 2026
// -------------------------------------------------------------
const post10 = {
  slug: "supreme-court-lawyer-dhaka-writ-petition-criminal-appeal-2026",
  bnSlug: null,
  title: "Supreme Court Lawyer in Dhaka: When and Why Do You Need a Writ Petition or Criminal Appeal? (2026 Guide)",
  category: "Supreme Court Litigation",
  readTime: "12 min read",
  metaTitle: "Supreme Court Lawyer in Dhaka: Writ Petition & Criminal Appeal 2026",
  metaDescription: "When do you need a Supreme Court lawyer in Bangladesh? Comprehensive guide to Constitutional Writs under Article 102, High Court Criminal Appeals, Revision & Bail.",
  keywords: [
    "supreme court lawyer in dhaka",
    "writ petition lawyer bangladesh",
    "file writ under article 102 constitution",
    "criminal appeal high court division",
    "best lawyer in uttara dhaka",
    "supreme court litigation chambers bangladesh"
  ],
  publishedDate: "2026-10-10",
  lastModified: "2026-10-17",
  heroIntro: "The Supreme Court of Bangladesh—comprising the High Court Division and the Appellate Division—stands as the guardian of the Constitution and the highest temple of justice in the republic. While local Magistrate Courts and District Sessions Courts adjudicate everyday civil and criminal trials, moving to the Supreme Court becomes imperative when constitutional rights are trampled by government authorities, lower courts commit jurisdictional errors, or severe criminal convictions must be appealed. Founded and led by <strong>Advocate Md. Shah Alam</strong>, an enrolled Advocate of the Supreme Court of Bangladesh, our chambers in Uttara, Dhaka and the Supreme Court Bar Association Annex provide decisive constitutional advocacy, criminal defense, and appellate representation. This guide clarifies exactly when, why, and how to approach the High Court Division.",
  quickAnswer: {
    heading: "⚡ High Court Division Jurisdiction at a Glance",
    points: [
      "Writ Petition (Article 102 of the Constitution): Invoked when fundamental rights are breached, or statutory authorities (RAJUK, Customs, Universities, Police) act arbitrarily without alternative legal remedy.",
      "Five Constitutional Writs: Mandamus (compelling public duty), Certiorari (quashing unlawful orders), Habeas Corpus (releasing illegal detainees), Prohibition, and Quo-Warranto.",
      "Criminal Appeal (Section 410 Cr.P.C.): Filed before the High Court Division against convictions and sentences passed by Sessions Judges or Special Tribunals.",
      "Criminal Revision (Section 439) & Quashment (Section 561A): Rectifying lower court miscarriages of justice and stopping baseless criminal harassment.",
      "Chamber Consultations: Reach Advocate Md. Shah Alam at Uttara Model Town, Dhaka or Supreme Court Bar Association. Direct WhatsApp: +8801712655546."
    ]
  },
  toc: [
    "The Judicial Hierarchy: Lower Judiciary vs. High Court Division",
    "When Do You Need a Writ Petition Under Article 102?",
    "The 5 Major Classes of Writs Explained (Mandamus, Certiorari, Habeas Corpus)",
    "Mandatory Prerequisite: The Demand for Justice Notice",
    "Criminal Appeals under Section 410 Cr.P.C.: Overturning Lower Court Convictions",
    "Section 561A Cr.P.C.: Quashing False Criminal Cases in the High Court",
    "Why Choose a Supreme Court Counsel with Chambers in Uttara & Supreme Court?",
    "Realistic Timelines, Paper Books, and Litigation Costs in 2026",
    "Frequently Asked Questions (FAQ)"
  ],
  sections: [
    {
      h2: "The Judicial Hierarchy: Lower Judiciary vs. High Court Division",
      content: `
        <p>In Bangladesh, original trials commence in subordinate courts—such as Assistant Judge Courts for civil suits or Magistrate/Sessions Courts for criminal charges. However, subordinate courts are bounded by strict statutory procedures and cannot question government circulars, statutory rules, or executive high-handedness.</p>
        <p>The <strong>High Court Division of the Supreme Court</strong> exercises extraordinary constitutional writ jurisdiction, original company and admiralty jurisdiction, and comprehensive appellate and revisional powers over all subordinate courts.</p>
      `
    },
    {
      h2: "When Do You Need a Writ Petition Under Article 102?",
      content: `
        <p>A Writ Petition under Article 102 of the Constitution of Bangladesh is your constitutional shield against state overreach. You require a writ petition when:</p>
        <ul>
          <li>A statutory body or government agency (e.g., RAJUK, BTRC, NBR, City Corporation, Police) violates your fundamental rights guaranteed under Part III of the Constitution.</li>
          <li>An administrative tribunal or licensing authority arbitrarily cancels your trade license, passport, utility connection, or tender bid without due process.</li>
          <li>Government officials refuse to discharge a mandatory statutory duty that the law compels them to perform.</li>
          <li>Crucial Rule: A writ is maintainable only if there is <em>no other equally efficacious alternative legal remedy</em> provided by ordinary statute.</li>
        </ul>
      `
    },
    {
      h2: "The 5 Major Classes of Writs Explained (Mandamus, Certiorari, Habeas Corpus)",
      content: `
        <ol>
          <li><strong>Writ of Mandamus:</strong> An order compelling a public officer, government department, or statutory corporation to perform a mandatory statutory duty they have neglected or refused to execute.</li>
          <li><strong>Writ of Certiorari:</strong> An order quashing and declaring null and void an illegal, arbitrary, or unconstitutional order passed by an administrative body or inferior tribunal exceeding its jurisdiction.</li>
          <li><strong>Writ of Habeas Corpus:</strong> An emergency directive commanding law enforcement to produce a person unlawfully detained in custody before the High Court and secure their immediate release.</li>
          <li><strong>Writ of Prohibition:</strong> An order restraining a lower tribunal or authority from proceeding with a matter outside its legal jurisdiction.</li>
          <li><strong>Writ of Quo-Warranto:</strong> Inquiring by what warrant or legal authority a person holds a public office.</li>
        </ol>
      `
    },
    {
      h2: "Mandatory Prerequisite: The Demand for Justice Notice",
      content: `
        <p>Except in emergency applications for Habeas Corpus, the High Court requires the petitioner to serve a formal written <strong>Demand for Justice Notice</strong> upon the respondent authorities. This statutory notice gives the government authority a reasonable timeframe (typically 7 to 15 days) to rectify the illegality before invoking constitutional jurisdiction.</p>
      `
    },
    {
      h2: "Criminal Appeals under Section 410 Cr.P.C.: Overturning Lower Court Convictions",
      content: `
        <p>When an individual is convicted and sentenced by a Court of Sessions Judge, Additional Sessions Judge, or Special Tribunal (such as Anti-Corruption Commission or Cyber Tribunal):</p>
        <ul>
          <li>An appeal lies directly to the High Court Division under <strong>Section 410 of the Code of Criminal Procedure</strong>.</li>
          <li>The High Court has the power to admit the appeal, suspend the sentence, call for the lower court records (LCR), and grant bail to the convict pending disposal of the appeal.</li>
          <li>Upon hearing the complete <em>Paper Book</em>, the High Court Bench can set aside the conviction and acquit the appellant.</li>
        </ul>
      `
    },
    {
      h2: "Section 561A Cr.P.C.: Quashing False Criminal Cases in the High Court",
      content: `
        <p>Where a criminal proceeding in a lower court is manifestly baseless, politically motivated, or used to enforce a civil contract, the High Court Division exercises inherent power under <strong>Section 561A Cr.P.C.</strong> to prevent abuse of the process of the court and secure the ends of justice by quashing the proceedings completely.</p>
      `
    },
    {
      h2: "Why Choose a Supreme Court Counsel with Chambers in Uttara & Supreme Court?",
      content: `
        <p>Litigation before the Supreme Court demands deep constitutional research, impeccable drafting, and daily presence before specialized benches. Having chambers located in both <strong>Uttara (Northern Dhaka)</strong> and the <strong>Supreme Court Bar Association Annex</strong> allows Advocate Md. Shah Alam to provide accessible consultation to clients across Uttara, Tongi, Gazipur, Bashundhara, and Gulshan while maintaining rigorous High Court courtroom representation.</p>
      `
    },
    {
      h2: "Realistic Timelines, Paper Books, and Litigation Costs in 2026",
      content: `
        <p>Writ admission motions and ad-interim stay orders can be obtained within <strong>3 to 7 working days</strong>. Criminal appeals are typically admitted with interim bail within 1 to 2 weeks. Comprehensive fees vary based on complexity, paper book volume preparation, and court stamp duties, handled with complete financial transparency.</p>
        ${CTA_EN}
      `
    }
  ],
  faqs: [
    {
      question: "Can anyone file a Writ Petition directly in the Supreme Court?",
      answer: "Any aggrieved citizen whose fundamental rights are violated, or who suffers from an arbitrary government order without alternative legal recourse, can file a Writ Petition through an enrolled Advocate of the Supreme Court."
    },
    {
      question: "What is an interim stay order (Stay) in a Writ Petition?",
      answer: "Upon admitting a writ petition, the High Court Division frequently issues an ad-interim stay order or injunction halting the execution of the disputed government order (e.g., stopping auction, demolition, or disciplinary action) until final judgment."
    },
    {
      question: "How long does a Criminal Appeal take in the High Court?",
      answer: "While admission and interim bail can be secured within 1–2 weeks, final hearing depends on the preparation of the official Paper Book containing complete evidence from the lower court."
    }
  ],
  relatedServiceLinks: [
    { text: "Supreme Court Litigation Services", to: "/services/supreme-court-lawyer" },
    { text: "Criminal Defense & Appeals", to: "/services/criminal-lawyer" }
  ],
  lang: "en",
  isDraft: false
};

// -------------------------------------------------------------
// SAVE ALL 10 POSTS
// -------------------------------------------------------------
console.log('Writing 10 High-Demand Articles...');
savePost('bn', 'bhumi-oporadh-ain-2026-jomi-dakhol-vuya-dalil-protikar-bn.json', post1);
savePost('en', 'check-land-ownership-bangladesh-online-khatian-mutation-porcha.json', post2);
savePost('bn', 'probasi-nrb-jomi-rokha-byabasthapona-bangladesh.json', post3);
savePost('en', 'high-court-anticipatory-bail-cost-procedure-2026.json', post4);
savePost('bn', 'mobile-banking-bkash-nagad-pratarana-cyber-ain.json', post5);
savePost('en', 'cheque-dishonour-case-bangladesh-section-138-ni-act-2026.json', post6);
savePost('bn', 'swami-nikhoj-thakle-talak-re-marriage-ain-2026-bn.json', post7);
savePost('en', 'flat-apartment-purchase-legal-checklist-bangladesh.json', post8);
savePost('bn', 'nabaloker-sompotti-bikroy-adaloter-anumoti-ain-prokriya-2026.json', post9);
savePost('en', 'supreme-court-lawyer-dhaka-writ-petition-criminal-appeal-2026.json', post10);

console.log('Finished updating all 10 posts!');
