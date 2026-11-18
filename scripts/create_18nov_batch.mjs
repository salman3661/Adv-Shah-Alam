import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const EN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');
const TODAY = '2026-11-18';

const pairs = [
  // 1. Aviation & Air Passenger Rights (Carriage by Air (Montreal Convention) Act 2020 & Civil Aviation Act 2017)
  {
    en: {
      slug: 'flight-delay-lost-baggage-compensation-montreal-act-2020-bangladesh',
      bnSlug: 'biman-flight-delay-baggage-harano-khotipuron-ain-2020-bangladesh',
      title: 'Flight Delay, Denied Boarding & Lost Baggage Compensation in Bangladesh: Montreal Act 2020',
      metaTitle: 'Flight Delay & Lost Baggage Rights BD: Montreal Act',
      metaDescription: 'How to claim airline compensation for flight delays, denied boarding, or lost checked baggage in Bangladesh under the Montreal Convention Act 2020 & CAAB rules.',
      category: 'Civil Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'montreal convention act 2020 bangladesh',
        'lost baggage compensation hazrat shahjalal airport',
        'flight delay refund caab bangladesh',
        'airline denied boarding claim dhaka',
        'carriage by air act 2020 bangladesh'
      ],
      heroIntro: 'Every year, thousands of outbound workers, NRBs, and international travelers flying through Hazrat Shahjalal International Airport (DAC), Chattogram, or Sylhet suffer uncompensated flight cancellations, overbooked denied boarding, or lost checked luggage. Under the Carriage by Air (Montreal Convention) Act, 2020 and the Civil Aviation Act, 2017, passengers flying international routes to or from Bangladesh enjoy enforceable statutory compensation rights—backed by strict written notice deadlines and judicial remedies in Dhaka.',
      quickAnswer: {
        heading: 'At a Glance: Air Passenger & Baggage Claims in Bangladesh',
        text: 'International flights departing from or arriving in Bangladesh follow the Carriage by Air (Montreal Convention) Act, 2020. Airlines bear strict financial liability for lost, damaged, or delayed checked baggage up to statutory SDR limits, provided passengers file written notice within 7 days for damage or 21 days for delay and sue within two years.',
        points: [
          'Governing Statutes: Carriage by Air (Montreal Convention) Act, 2020 & Civil Aviation Act, 2017',
          'Written Complaint Deadlines (Article 31): 7 days for damaged checked baggage; 21 days for delayed baggage from delivery date',
          'Baggage Liability Cap: Strict liability up to statutory SDR limits unless special value was declared at check-in',
          '2-Year Limitation Period (Article 35): Civil suit in Bangladesh courts must be filed within 2 years from arrival date'
        ]
      },
      toc: [
        'Statutory Framework: Montreal Convention Act 2020 & CAAB Oversight',
        'Damaged, Delayed, or Lost Checked Baggage: Notice Deadlines & Proof',
        'Flight Cancellation, Extended Delays & Overbooked Denied Boarding',
        'How Non-Resident Bangladeshis (NRBs) & Travelers Pursue Claims',
        'Filing a Civil Suit or Consumer Complaint Against an Airline in Dhaka'
      ],
      sections: [
        {
          h2: 'Statutory Framework: Montreal Convention Act 2020 & CAAB Oversight',
          content: '<p>Bangladesh replaced older Warsaw-era aviation liability limits by enacting the <strong>Carriage by Air (Montreal Convention) Act, 2020</strong>, incorporating the 1999 Montreal Convention into domestic law alongside regulatory oversight by the <strong>Civil Aviation Authority of Bangladesh (CAAB)</strong> under the <strong>Civil Aviation Act, 2017</strong>.</p><p>Whenever a ticketed itinerary originates in, terminates in, or includes an agreed stopping place within Bangladesh and another State Party (including the US, UK, EU, UAE, Saudi Arabia, Canada, and Australia), the airline cannot contractually reduce statutory passenger compensation caps below the Act’s limits. Any fine-print airline condition attempting to waive mandatory liability for baggage loss, passenger injury, or unjustified delay is void under the Act, and passengers can enforce claims directly against the carrier’s Dhaka office or GSA.</p>'
        },
        {
          h2: 'Damaged, Delayed, or Lost Checked Baggage: Notice Deadlines & Proof',
          content: '<p>Most passenger baggage claims fail not because the airline is innocent, but because travelers miss mandatory written protest windows under <strong>Article 31 of the Schedule to the 2020 Act</strong>:</p><ul><li><strong>Immediate Airport Action (PIR):</strong> Before exiting the customs arrival hall at Dhaka, Chattogram, or abroad, report the missing or broken bag at the airline’s Baggage Services counter and obtain a signed <strong>Property Irregularity Report (PIR)</strong> with your baggage tag number attached.</li><li><strong>Damaged Checked Baggage — 7 Days:</strong> You must submit a formal written claim (email + airline portal ticket) within <strong>7 days</strong> from the date you received the damaged bag. Photograph the broken shell, wheel, or torn lock next to the baggage tag sticker.</li><li><strong>Delayed Baggage — 21 Days:</strong> If your suitcase arrives days late and forces emergency purchases of clothing or essential toiletries, submit itemized receipts in writing within <strong>21 days</strong> from the date the bag was finally handed over to you.</li><li><strong>Presumed Lost After 21 Days:</strong> Under Article 17(3), if an airline admits loss or fails to locate checked baggage within <strong>21 days</strong> of expected arrival, you can enforce full lost-baggage compensation without proving airline negligence. Retain purchase proofs, packing lists, and passport stamps.</li></ul>'
        },
        {
          h2: 'Flight Cancellation, Extended Delays & Overbooked Denied Boarding',
          content: '<p>Under <strong>Article 19</strong>, a carrier is liable for provable financial damage caused by flight delay (missed non-refundable hotel bookings, onward separate-ticket losses, missed work contracts, or overnight meals and accommodation), unless the airline proves it took <em>all measures that could reasonably be required</em> to avoid the delay—such as unforeseeable severe weather or sudden air-traffic closure rather than routine technical maintenance or crew scheduling failures.</p><p>If an airline bumps a confirmed, on-time passenger due to commercial overbooking, passengers are entitled to immediate re-routing or full ticket refund to the original payment method without unauthorized cancellation deductions, hotel accommodation during overnight rerouting, and statutory compensation for financial losses arising from involuntary denial of boarding. Travel agencies or aggregators who withhold airline-approved ticket refunds can also be pursued under <a href="/blog/contract-breach-legal-action-bangladesh">Bangladesh contract breach remedies</a>.</p>'
        },
        {
          h2: 'How Non-Resident Bangladeshis (NRBs) & Travelers Pursue Claims',
          content: '<p>NRBs traveling from London, New York, Toronto, Riyadh, or Dubai often struggle when airlines ignore emails after landing in Dhaka. To preserve jurisdiction and cross-border enforceability:</p><ol><li><strong>Keep Jurisdiction Options Open (Article 33):</strong> Under the Montreal Convention framework, a passenger may sue either where the carrier is domiciled, its principal place of business, the place of business where the ticket was bought, the destination, or—for bodily injury or death claims—the passenger’s principal and permanent residence if the carrier operates there.</li><li><strong>Serve a Formal Advocate Legal Notice:</strong> Before litigating in Dhaka, serving a statutory legal notice on the airline’s Bangladesh GSA (General Sales Agent) and Country Manager with PIR, boarding passes, e-ticket PNR, and itemized receipts frequently triggers an out-of-court settlement within 15–30 days.</li><li><strong>Escalate to CAAB & DNCRP:</strong> Simultaneously lodge a regulatory grievance with the <strong>CAAB Passenger Facilitation wing</strong> and, for local ticket-refund or deceptive fee violations, before the <a href="/blog/consumer-rights-law-bangladesh">Directorate of National Consumer Rights Protection (DNCRP)</a>. Also keep copies of passport and travel records secure in case of <a href="/blog/travel-ban-immigration-blacklist-airport-offload-high-court-writ-bangladesh">airport immigration or offload disputes</a>.</li></ol>'
        },
        {
          h2: 'Filing a Civil Suit or Consumer Complaint Against an Airline in Dhaka',
          content: '<p>If settlement fails, claimants must observe the non-extendable <strong>2-year limitation period under Article 35</strong> (counted from arrival at destination, scheduled arrival date, or date carriage stopped). Ordinary limitation-saving extensions do not revive an expired Montreal Convention claim.</p><p>Money suits for unliquidated baggage or delay damages above small-claims thresholds are instituted before the competent <strong>Joint District Judge or Senior Assistant Judge Court in Dhaka</strong> where the carrier’s regional office operates. Travelers residing overseas can appoint a trusted representative or advocate in Bangladesh via an <a href="/blog/nrb-power-of-attorney-bangladesh-embassy-attestation-guide">embassy-attested Power of Attorney</a> and check <a href="/blog/file-case-in-bangladesh-without-travelling-virtual-hearing">virtual representation options from abroad</a> so court proceedings do not require another international flight.</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/services/supreme-court-lawyer', text: 'Supreme Court & Civil Appeals Lawyer' },
        { to: '/services/company-corporate-lawyer', text: 'Commercial & Regulatory Claims' },
        { to: '/nrb-legal-help', text: 'NRB Legal Assistance Hub' }
      ],
      faqs: [
        {
          q: 'How much compensation can I claim for a lost suitcase on an international flight to Dhaka?',
          a: 'Under the Carriage by Air (Montreal Convention) Act, 2020, airlines bear strict liability up to statutory Special Drawing Rights (SDR) limits—historically 1,288 SDR and periodically revised upward by ICAO to 1,519 SDR—per passenger for proven contents value of lost, damaged, or delayed checked luggage, unless you declared higher value at check-in.'
        },
        {
          q: 'What if I left the airport without a Property Irregularity Report (PIR)?',
          a: 'Leaving the arrivals hall without a PIR makes evidence gathering harder, yet it does not extinguish your statutory claim if you immediately email a written complaint with your boarding pass, baggage claim tag sticker, and damage photographs strictly within 7 days for damage or 21 days for delay under Article 31.'
        },
        {
          q: 'Can an airline refuse a cash refund and force me to take a travel voucher after cancelling a flight?',
          a: 'No. Whenever the operating carrier cancels a scheduled flight or enforces a major schedule disruption that renders travel useless, passengers retain the statutory right to demand a full monetary refund back to their original payment card or bank account rather than accepting an expiring restricted airline credit voucher.'
        },
        {
          q: 'Where can NRBs sue an airline if the ticket was bought in the UK or US for travel to Dhaka?',
          a: 'Under Article 33 jurisdictional rules of the Montreal Convention, claimants may choose to sue at the airline domicile, its principal place of business, the ticketing office location where the contract was concluded, or the final destination of carriage—allowing litigation either in Dhaka courts or abroad depending on limitation periods.'
        }
      ]
    },
    bn: {
      slug: 'biman-flight-delay-baggage-harano-khotipuron-ain-2020-bangladesh',
      enSlug: 'flight-delay-lost-baggage-compensation-montreal-act-2020-bangladesh',
      title: 'বিমান ফ্লাইট ডিলে, বাতিল ও লাগেজ হারালে ক্ষতিপূরণ — মন্ট্রিল কনভেনশন আইন ২০২০ গাইড',
      metaTitle: 'ফ্লাইট ডিলে ও লাগেজ হারালে ক্ষতিপূরণ: মন্ট্রিল আইন',
      metaDescription: 'বিমানের ফ্লাইট বিলম্ব, বোর্ডিং বাতিল বা চেকড ব্যাগেজ হারানো ও ক্ষতির ঘটনায় বাংলাদেশ মন্ট্রিল কনভেনশন আইন ২০২০ এবং সিএএবি অনুযায়ী ক্ষতিপূরণ আদায়ের পূর্ণ গাইড।',
      category: 'দেওয়ানি আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'লাগেজ হারালে ক্ষতিপূরণ বাংলাদেশ',
        'মন্ট্রিল কনভেনশন আইন ২০২০ বাংলাদেশ',
        'ফ্লাইট ডিলে রিফান্ড নিয়ম',
        'বিমানবন্দর ব্যাগেজ পিআইআর অভিযোগ',
        'এয়ারলাইন ক্ষতিপূরণ মামলা ঢাকা'
      ],
      heroIntro: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (ঢাকা), চট্টগ্রাম বা সিলেট হয়ে বিদেশ যাত্রা কিংবা দেশে ফেরার পথে ফ্লাইট বাতিল, ওভারবুকিংয়ে বোর্ডিং না দেওয়া অথবা চেকড লাগেজ হারিয়ে যাওয়া প্রবাসী ও যাত্রীদের নিত্যদিনের ভোগান্তি। বাংলাদেশের Carriage by Air (Montreal Convention) Act, 2020 এবং বেসামরিক বিমান চলাচল আইন, ২০১৭ অনুযায়ী আন্তর্জাতিক ফ্লাইটের যাত্রীরা আইনগতভাবে নির্ধারিত আর্থিক ক্ষতিপূরণ ও রিফান্ড পাওয়ার অধিকারী।',
      quickAnswer: {
        heading: '⚡ বিমান যাত্রী ও লাগেজ ক্ষতিপূরণ — একনজরে মূল আইন',
        text: 'বাংলাদেশে আন্তর্জাতিক বিমান যাত্রায় Carriage by Air (Montreal Convention) Act, 2020 প্রযোজ্য হয়। চেকড লাগেজ ভাঙা বা ক্ষতির ক্ষেত্রে ৭ দিনের মধ্যে এবং লাগেজ দেরিতে পেলে ২১ দিনের মধ্যে লিখিত অভিযোগ করলে এয়ারলাইনস আন্তর্জাতিক এসডিআর (SDR) সীমা পর্যন্ত ক্ষতিপূরণ দিতে আইনত বাধ্য এবং ২ বছরের মধ্যে মামলা করা যায়।',
        points: [
          'মূল আইন: Carriage by Air (Montreal Convention) Act, 2020 ও Civil Aviation Act, 2017',
          'লিখিত অভিযোগের কঠোর সময়সীমা (অনুচ্ছেদ ৩১): লাগেজ ভাঙা/ক্ষতির জন্য ৭ দিন এবং দেরিতে পেলে ২১ দিনের মধ্যে নোটিশ',
          'ব্যাগেজ দায়বদ্ধতা সীমা: চেকড লাগেজ হারালে এয়ারলাইনস গাফিলতি প্রমাণ ছাড়াই আন্তর্জাতিক SDR সীমা অনুযায়ী ক্ষতিপূরণ দিতে বাধ্য',
          'মামলার তামাদি মেয়াদ (অনুচ্ছেদ ৩৫): ফ্লাইট পৌঁছানোর তারিখ থেকে সর্বোচ্চ ২ বছরের মধ্যে আদালতে মামলা দায়ের করতে হবে'
        ]
      },
      toc: [
        'আইনি ভিত্তি: মন্ট্রিল কনভেনশন আইন ২০২০ ও সিএএবি (CAAB) তদারকি',
        'লাগেজ হারানো, ভাঙা বা দেরিতে পৌঁছানো: ৭ ও ২১ দিনের জরুরি সময়সীমা',
        'ফ্লাইট বাতিল, দীর্ঘ বিলম্ব ও ওভারবুকিংয়ে বোর্ডিং বঞ্চিত হলে প্রতিকার',
        'প্রবাসী (NRB) ও আন্তর্জাতিক যাত্রীরা কীভাবে ক্ষতিপূরণ আদায় করবেন',
        'ঢাকায় এয়ারলাইনসের বিরুদ্ধে আইনি নোটিশ, ভোক্তা অধিকার ও দেওয়ানি মামলা'
      ],
      sections: [
        {
          h2: 'আইনি ভিত্তি: মন্ট্রিল কনভেনশন আইন ২০২০ ও সিএএবি (CAAB) তদারকি',
          content: '<p>পুরোনো ওয়ারশ আইনের স্বল্প ক্ষতিপূরণ কাঠামো বাতিল করে বাংলাদেশ <strong>Carriage by Air (Montreal Convention) Act, 2020</strong> প্রণয়ন করেছে। পাশাপাশি <strong>বেসামরিক বিমান চলাচল আইন, ২০১৭</strong> অনুযায়ী বেবিচক (CAAB) এয়ারলাইনগুলোর যাত্রীসেবা তদারকি করে।</p><p>আপনার বিমান টিকিটের যাত্রা শুরু বা শেষ বাংলাদেশসহ মন্ট্রিল কনভেনশনভুক্ত যেকোনো দেশে (যেমন যুক্তরাষ্ট্র, যুক্তরাজ্য, কানাডা, সৌদি আরব, সংযুক্ত আরব আমিরাত, অস্ট্রেলিয়া বা ইউরোপ) হলে, এয়ারলাইনস টিকিটের সূক্ষ্ম শর্ত দেখিয়ে আইনে নির্ধারিত ক্ষতিপূরণের সীমা কমাতে বা দায় এড়াতে পারে না। প্রয়োজনে ঢাকার জিএসএ অফিসের বিরুদ্ধেই দেওয়ানি দাবি উত্থাপন করা যায়।</p>'
        },
        {
          h2: 'লাগেজ হারানো, ভাঙা বা দেরিতে পৌঁছানো: ৭ ও ২১ দিনের জরুরি সময়সীমা',
          content: '<p>লাগেজের ক্ষতিপূরণ দাবি নাকচ হওয়ার প্রধান কারণ হলো অনুচ্ছেদ ৩১ অনুযায়ী লিখিত অভিযোগের সময়সীমা মিস করা:</p><ul><li><strong>বিমানবন্দরেই পিআইআর (PIR) সংগ্রহ:</strong> ব্যাগেজ বেল্টে লাগেজ না পেলে বা ভাঙা দেখলে কাস্টমস হল ত্যাগের আগেই এয়ারলাইনস কাউন্টারে <strong>Property Irregularity Report (PIR)</strong> তৈরি করে ব্যাগেজ ট্যাগ নম্বরসহ কপি নিন।</li><li><strong>ক্ষতিগ্রস্ত লাগেজ (৭ দিন):</strong> ভাঙা লাগেজ হাতে পাওয়ার <strong>৭ দিনের মধ্যে</strong> ছবি ও পিআইআর কপিসহ এয়ারলাইনসের অফিসিয়াল ইমেইলে লিখিত দাবি পাঠাতে হবে।</li><li><strong>দেরিতে লাগেজ পাওয়া (২১ দিন):</strong> লাগেজ দেরিতে আসায় জরুরি পোশাক বা নিত্যপ্রয়োজনীয় জিনিস কিনতে হলে, লাগেজ হাতে পাওয়ার <strong>২১ দিনের মধ্যে</strong> ক্রয় রশিদসহ লিখিত আবেদন করুন।</li><li><strong>২১ দিন পর হারানো গণ্য:</strong> অনুচ্ছেদ ১৭(৩) অনুযায়ী ২১ দিনের মধ্যেও এয়ারলাইনস ব্যাগ খুঁজে না পেলে বা হারিয়েছে মর্মে স্বীকার করলে যাত্রী পূর্ণ ক্ষতিপূরণ পাওয়ার অধিকারী হন।</li></ul>'
        },
        {
          h2: 'ফ্লাইট বাতিল, দীর্ঘ বিলম্ব ও ওভারবুকিংয়ে বোর্ডিং বঞ্চিত হলে প্রতিকার',
          content: '<p><strong>অনুচ্ছেদ ১৯</strong> অনুযায়ী ফ্লাইট বিলম্বের কারণে যাত্রীর আর্থিক ক্ষতি (যেমন নন-রিফান্ডেবল হোটেল, সংযোগকারী অন্য ফ্লাইট মিস বা কাজের চুক্তি বাতিল) হলে এয়ারলাইনস দায়ী থাকবে—যদি না তারা প্রমাণ করতে পারে যে আকস্মিক প্রাকৃতিক দুর্যোগ বা এয়ার-ট্রাফিক বন্ধের মতো অনিবার্য কারণে সব যুক্তিসঙ্গত ব্যবস্থা নেওয়া সত্ত্বেও বিলম্ব এড়ানো যায়নি।</p><p>এছাড়া টিকিট কনফার্ম থাকার পরও ওভারবুকিংয়ের কারণে বোর্ডিং না দিলে (Denied Boarding), যাত্রীকে বিনা কর্তনে সম্পূর্ণ নগদ অর্থ রিফান্ড অথবা বিকল্প ফ্লাইট, হোটেল ও খাবার সরবরাহ এবং ক্ষয়ক্ষতির ক্ষতিপূরণ দিতে এয়ারলাইনস বাধ্য। কোনো ট্রাভেল এজেন্সি টিকিটের টাকা আটকে রাখলে <a href="/bn/blog/chukti-bhongo-taka-jomi-attosat-deoyani-foujdari-mamla-2026">চুক্তি ভঙ্গ ও অর্থ আত্মসাতের বিরুদ্ধে মামলা</a> করা যায়।</p>'
        },
        {
          h2: 'প্রবাসী (NRB) ও আন্তর্জাতিক যাত্রীরা কীভাবে ক্ষতিপূরণ আদায় করবেন',
          content: '<p>লন্ডন, নিউ ইয়র্ক, রিয়াদ বা দুবাই ফেরত প্রবাসীরা দেশে এসে ইমেইল করে সাড়া না পেলে তিনটি ধাপে এগোতে পারেন:</p><ol><li><strong>সুবিধাজনক আদালত নির্বাচন (অনুচ্ছেদ ৩৩):</strong> যাত্রী এয়ারলাইনসের প্রধান কার্যালয়, যে দেশে টিকিট কেনা হয়েছে অথবা গন্তব্যস্থলের (যেমন ঢাকা) আদালতে মামলা করতে পারেন।</li><li><strong>লিগ্যাল নোটিশ প্রেরণ:</strong> পিআইআর, বোর্ডিং পাস, ই-টিকিট পিএনআর এবং ক্রয় রশিদ সংযুক্ত করে এয়ারলাইনসের বাংলাদেশের জিএসএ (GSA) ও কান্ট্রি ম্যানেজারের বরাবর অ্যাডভোকেট লিগ্যাল নোটিশ পাঠালে অধিকাংশ ক্ষেত্রে ১৫–৩০ দিনের মধ্যে আপস মীমাংসা হয়।</li><li><strong>বেবিচক ও ভোক্তা অধিকারে অভিযোগ:</strong> দেশীয় টিকিট রিফান্ড বা অতিরিক্ত ফি কাটার বিরুদ্ধে <a href="/bn/blog/vokta-odhikar-songrokkhon-ain-2009-ovijog-bangladesh">জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে</a> এবং ফ্লাইট সংক্রান্ত অবহেলার বিষয়ে বেবিচক-এ (CAAB) অভিযোগ দায়ের করুন। পাশাপাশি বিমানবন্দরে ইমিগ্রেশন জটিলতা হলে <a href="/bn/blog/airport-immigration-stop-list-bidesh-jatra-badha-writ-2026-bn">বিমানবন্দর ইমিগ্রেশন স্টপ-লিস্ট প্রতিকার</a> জেনে রাখুন।</li></ol>'
        },
        {
          h2: 'ঢাকায় এয়ারলাইনসের বিরুদ্ধে আইনি নোটিশ, ভোক্তা অধিকার ও দেওয়ানি মামলা',
          content: '<p>এয়ারলাইনস ক্ষতিপূরণ দিতে অস্বীকৃতি জানালে <strong>অনুচ্ছেদ ৩৫</strong> অনুযায়ী ফ্লাইট পৌঁছানোর (বা নির্ধারিত পৌঁছানোর) তারিখ থেকে ঠিক <strong>২ বছরের মধ্যে</strong> দেওয়ানি আদালতে মামলা করতে হবে; এই ২ বছরের মেয়াদ সাধারণ তামাদি আইনে বর্ধিত হয় না।</p><p>দাবির পরিমাণ অনুযায়ী ঢাকার যুগ্ম জেলা জজ বা সিনিয়র সহকারী জজ আদালতে মানি স্যুট দায়ের করা যায়। প্রবাসী যাত্রীরা বিদেশে বসেই <a href="/bn/blog/nrb-power-of-attorney-jomi-bikroy-dutabas-attestation-2026-bn">বাংলাদেশ দূতাবাসের মাধ্যমে সত্যায়িত পাওয়ার অব অ্যাটর্নি</a> পাঠিয়ে এবং <a href="/bn/blog/writ-petition-haikort-dhap-khoroch-2026">উচ্চ আদালতে আইনি প্রতিনিধিত্ব</a> নিশ্চিত করে দেশে মামলা পরিচালনা করতে পারেন।</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/bn/services/supreme-court-lawyer', text: 'সুপ্রিম কোর্ট ও হাইকোর্ট আইনজীবী' },
        { to: '/bn/services/company-corporate-lawyer', text: 'করপোরেট ও বাণিজ্যিক বিরোধ' },
        { to: '/nrb-legal-help', text: 'প্রবাসী (NRB) আইনি সহায়তা' }
      ],
      faqs: [
        {
          q: 'আন্তর্জাতিক ফ্লাইটে চেকড লাগেজ হারালে কত টাকা পর্যন্ত ক্ষতিপূরণ পাওয়া যায়?',
          a: 'মন্ট্রিল কনভেনশন আইন ২০২০ অনুযায়ী প্রতিটি যাত্রীর প্রমাণিত ক্ষতির বিপরীতে আন্তর্জাতিক এসডিআর (SDR) মানদণ্ডে (ঐতিহাসিকভাবে ১,২৮৮ SDR এবং ICAO কর্তৃক ১,৫১৯ SDR-এ উন্নীত সীমা পর্যন্ত) এয়ারলাইনস ক্ষতিপূরণ দিতে বাধ্য, যদি না যাত্রী চেক-ইনের সময় বেশি মূল্যের বিশেষ ঘোষণা ও অতিরিক্ত ফি দিয়ে থাকেন।'
        },
        {
          q: 'বিমানবন্দরে PIR কপি না নিয়ে বেরিয়ে গেলে কি আর অভিযোগ করা যাবে না?',
          a: 'বিমানবন্দরে পিআইআর (PIR) না নিলে প্রমাণ সংগ্রহ কিছুটা কঠিন হয় বটে, তবে বোর্ডিং পাস, লাগেজ ক্লেইম ট্যাগ ও ক্ষতির ছবিসহ ক্ষতির ক্ষেত্রে ৭ দিনের মধ্যে এবং দেরির ক্ষেত্রে ২১ দিনের মধ্যে লিখিত ইমেইল অভিযোগ পাঠালে আপনার আইনি দাবি মন্ট্রিল আইনের অধীনে টিকে থাকে।'
        },
        {
          q: 'এয়ারলাইনস ফ্লাইট বাতিল করে নগদ টাকার বদলে জোর করে ভাউচার দিতে পারে কি?',
          a: 'না। এয়ারলাইনস নিজে থেকে নির্ধারিত ফ্লাইট বাতিল করলে বা বড় ধরনের সময়সূচি পরিবর্তন করে যাত্রা অর্থহীন করে তুললে যাত্রী ভাউচারের পরিবর্তে যে কার্ড বা ব্যাংক হিসাব থেকে টিকিট কিনেছিলেন সেই মূল মাধ্যমে পূর্ণ নগদ রিফান্ড দাবি করার পূর্ণ আইনগত অধিকার রাখেন।'
        },
        {
          q: 'প্রবাসীরা কি বিদেশে বসেই বাংলাদেশে এয়ারলাইনসের বিরুদ্ধে মামলা করতে পারবেন?',
          a: 'হ্যাঁ। মন্ট্রিল কনভেনশনের ৩৩ অনুচ্ছেদ অনুযায়ী যাত্রী গন্তব্যস্থল ঢাকার আদালতে মামলা করার এখতিয়ার রাখেন এবং বিদেশে অবস্থানরত প্রবাসী যাত্রী বাংলাদেশ দূতাবাসের মাধ্যমে সত্যায়িত পাওয়ার অব অ্যাটর্নি দেশে পাঠিয়ে একজন আইনজীবীর মাধ্যমে নির্বিঘ্নে ঢাকার উপযুক্ত আদালতে মামলা পরিচালনা করতে পারেন।'
        }
      ]
    }
  },

  // 2. E-Commerce, Escrow Rules & Card Chargeback Law in Bangladesh
  {
    en: {
      slug: 'ecommerce-escrow-refund-chargeback-law-bangladesh-guide',
      bnSlug: 'ecommerce-escrow-refund-taka-ferot-chargeback-ain-bangladesh',
      title: 'E-Commerce Refund, Escrow & Card Chargeback Law in Bangladesh: Recovery Guide',
      metaTitle: 'E-Commerce Refund, Escrow & Chargeback Law Bangladesh',
      metaDescription: 'Legal remedies for prepaid online shopping scams, delayed e-commerce refunds, Bangladesh Bank escrow rules, Visa/Mastercard chargeback & DNCRP claims in BD.',
      category: 'Cyber Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'ecommerce refund law bangladesh',
        'digital commerce operation guidelines 2021 bangladesh',
        'bank card chargeback dispute bangladesh',
        'bangladesh bank escrow rules ecommerce',
        'online shopping fraud complaint dncrp'
      ],
      heroIntro: 'Prepaid e-commerce non-delivery, fake product substitutions, and indefinite refund holds have become major commercial hazards for online shoppers and diaspora buyers ordering gifts in Bangladesh. Between the Digital Commerce Operation Guidelines 2021, Bangladesh Bank’s payment escrow circulars, Visa/Mastercard card chargeback rules, and statutory consumer and penal remedies, victims have structured legal pathways to freeze funds and recover money rapidly.',
      quickAnswer: {
        heading: 'At a Glance: Online Shopping Refund & Chargeback Remedies',
        text: 'Bangladesh enforces strict delivery and refund timelines under Digital Commerce Operation Guidelines 2021 and mandatory payment escrow protection. Prepaid goods must ship within 5 to 10 days, delayed orders require cash refunds within 7 to 10 working days, and cardholders can pursue bank chargebacks within 60 to 120 days.',
        points: [
          'Delivery Window (Guidelines 2021): Maximum 5 days within same city (10 days inter-district) after advance payment unless pre-disclosed',
          'Mandatory Refund Window: Advance funds must be refunded within 7 to 10 working days if seller fails delivery deadlines',
          'Bank Card Chargeback: File a formal "Goods/Services Not Received" dispute with issuing bank within 60–120 days of payment',
          'Statutory Forums: DNCRP administrative claim, Police GD/FIR under Penal Code s.406/420, or Cyber Security framework'
        ]
      },
      toc: [
        'Digital Commerce Operation Guidelines 2021 & Mandatory DBID Rules',
        'How Bangladesh Bank Escrow Protects Prepaid Online Buyers',
        'Using Debit/Credit Card Chargeback to Reverse Fraudulent E-Commerce Charges',
        'Filing DNCRP Consumer Complaints & Criminal Cheating Cases',
        'NRB Diaspora Checklist When Ordering Goods or Services in Bangladesh'
      ],
      sections: [
        {
          h2: 'Digital Commerce Operation Guidelines 2021 & Mandatory DBID Rules',
          content: '<p>Issued by the Ministry of Commerce, the <strong>Digital Commerce Operation Guidelines 2021</strong> bind e-commerce marketplaces, Facebook F-commerce pages, and online service portals operating in Bangladesh:</p><ul><li><strong>Handover & Delivery Cap:</strong> Sellers accepting advance payment must hand over ready stock to a delivery partner within <strong>48 hours</strong> and complete delivery within <strong>5 days</strong> (same city) or <strong>10 days</strong> (outside city), unless a clear customized timeline was consented to before checkout.</li><li><strong>Strict Refund Deadline:</strong> If the seller cancels or misses the delivery deadline, all advance money must be refunded to the buyer’s exact payment channel within <strong>7 to 10 working days</strong>—merchants cannot compel buyers to accept wallet credits instead of money.</li><li><strong>DBID Registration:</strong> Commercial Facebook pages and e-stores must hold a Digital Business Identification (DBID) from RJSC and clearly display physical address, TIN, and customer grievance contacts. Before paying large commercial deposits, verify the entity via <a href="/blog/trade-license-renewal-bangladesh">business trade license compliance checks</a>.</li></ul>'
        },
        {
          h2: 'How Bangladesh Bank Escrow Protects Prepaid Online Buyers',
          content: '<p>To stop platforms from collecting millions in advance payments and disappearing, <strong>Bangladesh Bank’s Payment Systems Department</strong> introduced mandatory <strong>escrow settlement</strong> for marketplace transactions paid via payment gateways, cards, or MFS:</p><p>Under this mechanism, when you pay an online marketplace through an authorized PSO/PSP gateway (such as SSLCommerz, aamarPay, bKash Merchant, or Nagad), the gateway retains the customer’s funds in a controlled escrow account and releases settlement to the merchant <em>only after</em> verified proof of delivery or customer confirmation. If you never received the product, lodging an immediate dispute ticket with the <strong>payment gateway and issuing bank</strong> before escrow payout freezes the merchant’s settlement immediately and preserves evidence if <a href="/blog/money-laundering-act-2012-bank-account-freeze-defense-bangladesh">BFIU or bank freeze inquiries</a> arise.</p>'
        },
        {
          h2: 'Using Debit/Credit Card Chargeback to Reverse Fraudulent E-Commerce Charges',
          content: '<p>Buyers who paid using a local or international <strong>Visa, Mastercard, or UnionPay debit/credit card</strong> have a high-recovery remedy that requires no initial lawyer fees—the <strong>Card Chargeback</strong>:</p><ol><li><strong>Preserve Evidence Immediately:</strong> Screenshot the invoice, order confirmation email, seller WhatsApp or Messenger promises, and failed tracking logs.</li><li><strong>Submit Bank Dispute Form:</strong> Contact your card-issuing bank’s Card Division (in Bangladesh or abroad for NRBs) and submit a formal <em>Chargeback / Dispute Form</em> citing <strong>Reason Code: Goods or Services Not Received / Not as Described</strong>.</li><li><strong>Strict Time Window:</strong> Card network chargeback cycles normally allow <strong>60 to 120 calendar days</strong> from transaction date or promised delivery date. Once your bank initiates chargeback, the acquiring bank debits the merchant unless the merchant produces signed courier proof of valid delivery.</li></ol>'
        },
        {
          h2: 'Filing DNCRP Consumer Complaints & Criminal Cheating Cases',
          content: '<p>Where payment was made via direct bank transfer or P2P mobile money to a rogue seller, escalate simultaneously on three fronts:</p><ul><li><strong>DNCRP Administrative Remedy:</strong> Under the <a href="/blog/consumer-rights-law-bangladesh">Consumer Rights Protection Act, 2009</a>, file a complaint within <strong>30 days</strong> of the cause of action at <strong>dncrp.portal.gov.bd</strong> or the National Helpline <strong>16121</strong>. DNCRP routinely compels full refunds and levies fines for non-delivery or defective goods.</li><li><strong>Police Complaint & Criminal Action:</strong> If an organized online page takes money from multiple victims with zero intent to deliver, lodge a General Diary / FIR for criminal breach of trust and cheating (Sections 406/420 Penal Code) alongside <a href="/blog/bkash-nagad-online-fraud-police-complaint-bangladesh">bKash/Nagad MFS fraud tracing</a> and <a href="/blog/bangladesh-cyber-crime-complaint-portal-guide-2026">Cyber Crime Unit reporting</a>. Where multiple disputes reveal systematic fraud, <a href="/blog/how-to-file-fir-bangladesh">filing a formal Police FIR</a> initiates judicial recovery.</li></ul>'
        },
        {
          h2: 'NRB Diaspora Checklist When Ordering Goods or Services in Bangladesh',
          content: '<p>Non-Resident Bangladeshis in the US, UK, Canada, Europe, and the Middle East often buy electronics, furniture, or wedding gifts online for relatives in Dhaka. Protect yourself by verifying the merchant’s <strong>DBID and physical showroom</strong>, paying via an international credit card rather than direct F-commerce personal bKash transfers, keeping cash-on-delivery (COD) open-box inspection rights for local relatives, and filing immediate card chargebacks with your foreign bank if delivery stalls beyond the promised window.</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/services/criminal-lawyer', text: 'Cyber Fraud & Criminal Defense Lawyer' },
        { to: '/services/company-corporate-lawyer', text: 'E-Commerce & Regulatory Advisory' },
        { to: '/nrb-legal-help', text: 'NRB Diaspora Legal Support' }
      ],
      faqs: [
        {
          q: 'Can an online store force me to take store credit instead of a refund?',
          a: 'No. Under the Digital Commerce Operation Guidelines 2021, whenever a seller fails to deliver prepaid goods within the prescribed 5 to 10 day window or delivers materially defective items, the buyer holds the legal right to a full monetary refund back to the original payment method within 7 to 10 working days.'
        },
        {
          q: 'How long do I have to file a card chargeback in Bangladesh?',
          a: 'Most Visa, Mastercard, and UnionPay issuing banks allow dispute chargeback claims within 60 to 120 calendar days from the original transaction date or the merchant’s promised delivery date. Submit your invoice, chat screenshots, and courier tracking failure to your bank immediately once the delivery window expires.'
        },
        {
          q: 'What if the Facebook page has no office address and used a personal bKash number?',
          a: 'Immediately call the bKash or Nagad customer fraud helpline with the exact Transaction ID to flag the account, file a formal General Diary at your local police station attaching screenshots and phone numbers, and report the page URL and digital trail to the CID Cyber Police Center.'
        },
        {
          q: 'Is an electronic invoice and WhatsApp chat valid proof in Bangladesh courts?',
          a: 'Yes. Following modern digital evidence provisions under the Evidence Act 1872 (Sections 65A and 65B), preserved PDF invoices, bank payment gateway logs, SMS confirmation alerts, and unaltered WhatsApp or Messenger transcripts are admissible electronic evidence in both DNCRP hearings and civil or criminal courts.'
        }
      ]
    },
    bn: {
      slug: 'ecommerce-escrow-refund-taka-ferot-chargeback-ain-bangladesh',
      enSlug: 'ecommerce-escrow-refund-chargeback-law-bangladesh-guide',
      title: 'ই-কমার্স রিফান্ড, এসক্রো ও কার্ড চার্জব্যাক আইন বাংলাদেশ — প্রতারিত টাকা ফেরত গাইড',
      metaTitle: 'ই-কমার্স রিফান্ড, এসক্রো ও চার্জব্যাক আইন বাংলাদেশ',
      metaDescription: 'অনলাইন শপিং বা ফেসবুক পেজে অগ্রিম টাকা দিয়ে পণ্য না পেলে ডিজিটাল কমার্স নির্দেশিকা ২০২১, বাংলাদেশ ব্যাংকের এসক্রো, কার্ড চার্জব্যাক ও ভোক্তা অধিকারে প্রতিকার।',
      category: 'সাইবার আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'ই-কমার্স রিফান্ড আইন বাংলাদেশ',
        'অনলাইন শপিং প্রতারণা টাকা ফেরত',
        'এসক্রো সিস্টেম বাংলাদেশ ব্যাংক',
        'ব্যাংক কার্ড চার্জব্যাক নিয়ম',
        'ডিজিটাল কমার্স নির্দেশিকা ২০২১'
      ],
      heroIntro: 'ফেসবুক পেজ (F-Commerce) বা অনলাইন মার্কেটপ্লেসে অগ্রিম টাকা পরিশোধের পর পণ্য না পাওয়া, নকল পণ্য পাঠানো কিংবা মাসের পর মাস রিফান্ড আটকে রাখা বর্তমানে বাংলাদেশে অসংখ্য ক্রেতার বড় সমস্যা। ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১, বাংলাদেশ ব্যাংকের এসক্রো নীতিমালা, ভিসা/মাস্টারকার্ড চার্জব্যাক ব্যবস্থা এবং ভোক্তা ও ফৌজদারি আইনের অধীনে অনলাইন প্রতারণার টাকা দ্রুত ফেরত পাওয়ার কার্যকর উপায় রয়েছে।',
      quickAnswer: {
        heading: '⚡ অনলাইন শপিং রিফান্ড ও টাকা ফেরত — একনজরে আইনি নিয়ম',
        text: 'ডিজিটাল কমার্স নির্দেশিকা ২০২১ ও বাংলাদেশ ব্যাংকের এসক্রো নিয়ম অনুযায়ী অগ্রিম টাকা নেওয়ার পর একই শহরে ৫ দিন এবং অন্য জেলায় ১০ দিনের মধ্যে পণ্য ডেলিভারি দিতে হয়। ব্যর্থ হলে ৭–১০ কর্মদিবসে নগদ রিফান্ড বাধ্যতামূলক, নতুবা ৬০–১২০ দিনে কার্ড চার্জব্যাক বা ভোক্তা অধিকারে অভিযোগ করা যায়।',
        points: [
          'ডেলিভারির সর্বোচ্চ সময় (নির্দেশিকা ২০২১): অগ্রিম মূল্য পরিশোধের পর একই শহরে সর্বোচ্চ ৫ দিন ও অন্য জেলায় সর্বোচ্চ ১০ দিনের মধ্যে পণ্য পৌঁছাতে হবে',
          'রিফান্ডের বাধ্যতামূলক সময়: সময়মতো পণ্য দিতে ব্যর্থ হলে ৭ থেকে ১০ কর্মদিবসের মধ্যে মূল মাধ্যমে টাকা ফেরত দিতে হবে',
          'কার্ড চার্জব্যাক: ডেবিট/ক্রেডিট কার্ডে পেমেন্ট করে প্রতারিত হলে ৬০–১২০ দিনের মধ্যে নিজ ব্যাংকে চার্জব্যাক (Dispute) আবেদন করুন',
          'আইনি প্রতিকার: ভোক্তা অধিকার (১৬১২১ / ৩০ দিনের মধ্যে অভিযোগ), এসক্রো গেটওয়ে হোল্ড এবং প্রতারণার মামলা (ধারা ৪০৬/৪২০)'
        ]
      },
      toc: [
        'ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১ ও ডিবিআইডি (DBID) বাধ্যবাধকতা',
        'বাংলাদেশ ব্যাংকের এসক্রো (Escrow) ব্যবস্থা কীভাবে ক্রেতার টাকা সুরক্ষিত রাখে',
        'ডেবিট/ক্রেডিট কার্ড চার্জব্যাক: উকিল ছাড়াই ব্যাংকের মাধ্যমে টাকা রিভার্স করার উপায়',
        'ভোক্তা অধিকার অভিযোগ ও এফ-কমার্স প্রতারণায় থানা জিডি/মামলা',
        'প্রবাসীদের জন্য বাংলাদেশে অনলাইন কেনাকাটায় সতর্কতা ও প্রতিকার'
      ],
      sections: [
        {
          h2: 'ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১ ও ডিবিআইডি (DBID) বাধ্যবাধকতা',
          content: '<p>বাণিজ্য মন্ত্রণালয় প্রণীত <strong>ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১</strong> দেশের সব ই-কমার্স ওয়েবসাইট ও ফেসবুক শপের জন্য বাধ্যতামূলক:</p><ul><li><strong>পণ্য হস্তান্তর ও ডেলিভারি সীমা:</strong> অগ্রিম টাকা গ্রহণের ৪৮ ঘণ্টার মধ্যে পণ্য ডেলিভারি এজেন্সিকে বুঝিয়ে দিতে হবে এবং ক্রেতাকে পূর্বে অন্য কোনো সময়সীমা না জানিয়ে থাকলে একই শহরে <strong>৫ দিন</strong> এবং ভিন্ন শহরে সর্বোচ্চ <strong>১০ দিনের মধ্যে</strong> পণ্য ডেলিভারি দিতে হবে।</li><li><strong>৭–১০ কর্মদিবসে রিফান্ড:</strong> পণ্য দিতে ব্যর্থ হলে বা অর্ডার বাতিল হলে <strong>৭ থেকে ১০ কর্মদিবসের মধ্যে</strong> যে মাধ্যমে ক্রেতা টাকা দিয়েছেন সেই মাধ্যমেই নগদ রিফান্ড দিতে হবে; জোর করে ওয়ালেট ব্যালেন্স বা ভাউচার গছিয়ে দেওয়া বেআইনি।</li><li><strong>ডিবিআইডি (DBID) নিবন্ধন:</strong> প্রতিটি বাণিজ্যিক ফেসবুক পেজ ও ওয়েবসাইটে আরজেএসসি প্রদত্ত DBID নম্বর, অফিসের ঠিকানা ও অভিযোগ সেল থাকা বাধ্যতামূলক; বড় লেনদেনের আগে <a href="/bn/blog/ongshidari-byabsha-partnership-firm-rjsc-registration-deed-2026-bn">বৈধ ব্যবসা ও আরজেএসসি নিবন্ধন</a> যাচাই করে নিন।</li></ul>'
        },
        {
          h2: 'বাংলাদেশ ব্যাংকের এসক্রো (Escrow) ব্যবস্থা কীভাবে ক্রেতার টাকা সুরক্ষিত রাখে',
          content: '<p>অগ্রিম টাকা নিয়ে ই-কমার্স প্রতিষ্ঠানের উধাও হওয়া ঠেকাতে <strong>বাংলাদেশ ব্যাংক</strong> পেমেন্ট গেটওয়ে, কার্ড ও এমএফএস-এর মাধ্যমে অনলাইন কেনাকাটায় <strong>এসক্রো (Escrow) সিস্টেম</strong> চালু করেছে।</p><p>এই ব্যবস্থায় SSLCommerz, aamarPay, বিকাশ মার্চেন্ট বা নগদ গেটওয়ের মাধ্যমে পরিশোধিত টাকা সরাসরি বিক্রেতার হাতে না গিয়ে গেটওয়ের এসক্রো অ্যাকাউন্টে সংরক্ষিত থাকে। ক্রেতার হাতে পণ্য পৌঁছানোর ডিজিটাল প্রমাণ যাচাইয়ের পরই বিক্রেতা টাকা পান। তাই নির্ধারিত সময়ের মধ্যে পণ্য না পেলে দ্রুত পেমেন্ট গেটওয়ে ও ব্যাংকে অভিযোগ জানালে গেটওয়ে বিক্রেতার ফান্ড হোল্ড করে রাখতে পারে এবং প্রয়োজনে <a href="/bn/blog/protarona-420-bishwasbhanga-406-dandobidhi-mamla-defense-2026-bn">অর্থ আত্মসাতের মামলাতেও</a> ব্যাংক রেকর্ড সাক্ষ্য হিসেবে কাজ করে।</p>'
        },
        {
          h2: 'ডেবিট/ক্রেডিট কার্ড চার্জব্যাক: উকিল ছাড়াই ব্যাংকের মাধ্যমে টাকা রিভার্স করার উপায়',
          content: '<p>আপনি যদি দেশীয় বা বিদেশি <strong>Visa, Mastercard বা UnionPay</strong> ডেবিট/ক্রেডিট কার্ড দিয়ে অনলাইনে মূল্য পরিশোধ করে থাকেন, তবে প্রতারিত হলে সবচেয়ে দ্রুত প্রতিকার হলো <strong>Card Chargeback</strong>:</p><ol><li><strong>প্রমাণ সংরক্ষণ:</strong> ইনভয়েস, অর্ডার কনফার্মেশন ইমেইল, চ্যাটের স্ক্রিনশট ও ট্র্যাকিং তথ্য সংরক্ষণ করুন।</li><li><strong>ব্যাংকে ডিসপিউট আবেদন:</strong> আপনার কার্ড ইস্যুকারী ব্যাংকের কার্ড ডিভিশনে যোগাযোগ করে <em>"Goods or Services Not Received / Not as Described"</em> কারণ উল্লেখ করে লিখিত চার্জব্যাক ফর্ম জমা দিন।</li><li><strong>সময়সীমা:</strong> লেনদেন বা ডেলিভারির প্রতিশ্রুত তারিখ থেকে সাধারণত <strong>৬০ থেকে ১২০ দিনের মধ্যে</strong> চার্জব্যাক দাবি করতে হয়। বিক্রেতা বৈধ ডেলিভারির স্বাক্ষরিত প্রমাণ দেখাতে না পারলে ব্যাংক টাকা ফেরত আনে।</li></ol>'
        },
        {
          h2: 'ভোক্তা অধিকার অভিযোগ ও এফ-কমার্স প্রতারণায় থানা জিডি/মামলা',
          content: '<p>ব্যাংক ট্রান্সফার বা ব্যক্তিগত বিকাশ/নগদে টাকা পাঠিয়ে প্রতারিত হলে দুইভাবে এগোতে হবে:</p><ul><li><strong>ভোক্তা অধিকারে অভিযোগ:</strong> <a href="/bn/blog/vokta-odhikar-songrokkhon-ain-2009-ovijog-bangladesh">ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯</a>-এর অধীনে ঘটনার <strong>৩০ দিনের মধ্যে</strong> <code>dncrp.portal.gov.bd</code> পোর্টালে বা ১৬১২১ হেল্পলাইনে অভিযোগ করলে শুনানির মাধ্যমে মূল্য ফেরত ও জরিমানা আদায় করা যায়।</li><li><strong>থানা জিডি ও ফৌজদারি মামলা:</strong> ভুয়া ফেসবুক পেজ অর্থ আত্মসাৎ করলে স্ক্রিনশট, মোবাইল নম্বর ও লেনদেন আইডিসহ <a href="/bn/blog/thana-gd-fir-police-complaint-bangladesh">থানায় জিডি বা এজাহার</a> করে <a href="/bn/blog/bkash-nagad-fraud-taka-recovery-gd-court-order-2026-bn">বিকাশ/নগদ প্রতারণা প্রতিকার</a> ও <a href="/bn/blog/cyber-crime-helpline-btrc-police-report-2026-bn">সাইবার পুলিশ রিপোর্ট</a> প্রক্রিয়ায় দণ্ডবিধির ৪০৬/৪২০ ধারায় মামলা দায়ের করা যায়।</li></ul>'
        },
        {
          h2: 'প্রবাসীদের জন্য বাংলাদেশে অনলাইন কেনাকাটায় সতর্কতা ও প্রতিকার',
          content: '<p>যুক্তরাষ্ট্র, যুক্তরাজ্য, মধ্যপ্রাচ্য বা ইউরোপে থাকা প্রবাসীরা দেশে পরিবারের জন্য উপহার বা ইলেকট্রনিক্স কেনার সময় ব্যক্তিগত পার্সোনাল নম্বরে টাকা না পাঠিয়ে আন্তর্জাতিক ক্রেডিট কার্ড বা গেটওয়ে ব্যবহার করুন, প্রয়োজনে দেশে থাকা স্বজনের মাধ্যমে ক্যাশ অন ডেলিভারিতে (COD) পণ্য যাচাই করে মূল্য পরিশোধ করুন এবং প্রতারণার শিকার হলে সাথে সাথে নিজ বিদেশি ব্যাংকে চার্জব্যাক ক্লেইম তুলুন।</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/bn/services/criminal-lawyer', text: 'সাইবার ও প্রতারণা মামলা আইনজীবী' },
        { to: '/bn/services/company-corporate-lawyer', text: 'বাণিজ্যিক ও ই-কমার্স পরামর্শ' },
        { to: '/nrb-legal-help', text: 'প্রবাসী (NRB) আইনি সহায়তা' }
      ],
      faqs: [
        {
          q: 'বিক্রেতা পণ্য না দিয়ে টাকা ফেরতের বদলে শুধু শপিং ভাউচার নিতে চাপ দিলে কী করব?',
          a: 'ডিজিটাল কমার্স নির্দেশিকা ২০২১ অনুযায়ী ক্রেতার স্পষ্ট সম্মতি ছাড়া নগদ টাকা ফেরতের বদলে শপিং ভাউচার বা ওয়ালেট ব্যালেন্স চাপিয়ে দেওয়া সম্পূর্ণ বেআইনি। নির্ধারিত ৭ থেকে ১০ কর্মদিবসের মধ্যে মূল পেমেন্ট মাধ্যমে টাকা ফেরত না পেলে ভোক্তা অধিকার অধিদপ্তরে অভিযোগ করুন।'
        },
        {
          q: 'কার্ড চার্জব্যাক করতে কত দিন সময় পাওয়া যায়?',
          a: 'ভিসা, মাস্টারকার্ড ও ইউনিয়নপে কার্ড নেটওয়ার্ক এবং ব্যাংকভেদে সাধারণত লেনদেনের তারিখ অথবা নির্ধারিত ডেলিভারির প্রতিশ্রুত তারিখ থেকে ৬০ থেকে ১২০ দিনের মধ্যে চার্জব্যাক আবেদন করতে হয়। সময়সীমা পার হওয়ার আগেই অর্ডার ইনভয়েস ও চ্যাটের প্রমাণসহ ব্যাংকে ডিসপিউট ফর্ম জমা দিন।'
        },
        {
          q: 'ফেসবুক পেজে পার্সোনাল বিকাশে টাকা পাঠিয়ে ব্লক হয়ে গেলে টাকা ফেরত পাওয়ার উপায় কী?',
          a: 'অবিলম্বে বিকাশ বা নগদ কাস্টমার কেয়ারে ট্রানজেকশন আইডি জানিয়ে প্রতারণার রিপোর্ট করুন, অর্ডার ও চ্যাটের স্ক্রিনশটসহ থানায় জিডি দায়ের করুন এবং সিআইডি সাইবার পুলিশ সেন্টার বা স্থানীয় পুলিশের মাধ্যমে প্রাপকের এনআইডি ও অ্যাকাউন্ট শনাক্ত করে আইনগত ব্যবস্থা নিন।'
        },
        {
          q: 'অনলাইন ইনভয়েস ও হোয়াটসঅ্যাপ চ্যাট কি বাংলাদেশের আদালতে প্রমাণ হিসেবে গ্রহণযোগ্য?',
          a: 'হ্যাঁ। বাংলাদেশের সাক্ষ্য আইনের সংশোধিত ডিজিটাল তথ্য সংক্রান্ত বিধান (ধারা ৬৫ক ও ৬৫খ) অনুযায়ী অবিকৃত ই-ইনভয়েস, পেমেন্ট গেটওয়ে রসিদ, এসএমএস কনফার্মেশন এবং হোয়াটসঅ্যাপ বা মেসেঞ্জার চ্যাট লগ ভোক্তা অধিকার শুনানি ও দেওয়ানি বা ফৌজদারি আদালতে বৈধ ডিজিটাল সাক্ষ্য হিসেবে গ্রহণযোগ্য।'
        }
      ]
    }
  },

  // 3. Software Licensing, SaaS Contracts & Tech IP Law in Bangladesh (Copyright Act 2023)
  {
    en: {
      slug: 'software-licensing-saas-contract-ip-law-bangladesh-guide',
      bnSlug: 'software-saas-chukti-freelancer-ip-ain-2023-bangladesh',
      title: 'Software Licensing, SaaS Contracts & Freelancer IP Ownership Under Copyright Act 2023 (BD)',
      metaTitle: 'Software Licensing & SaaS IP Contracts Bangladesh',
      metaDescription: 'Complete legal guide to software copyright ownership, SaaS agreements, source-code assignment, NDA, and IT export contracts under Bangladesh Copyright Act 2023.',
      category: 'Corporate Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'software licensing contract bangladesh',
        'copyright act 2023 software bangladesh',
        'saas agreement legal guide dhaka',
        'freelancer source code ip assignment bangladesh',
        'it export contract legal protection bangladesh'
      ],
      heroIntro: 'As Bangladeshi software agencies, remote engineers, and global SaaS founders build AI tools, fintech platforms, and enterprise apps for clients in the US, UK, EU, and Dhaka, poorly drafted contracts frequently trigger catastrophic disputes over source-code ownership, unpaid milestones, and unlicensed product cloning. Under the Copyright Act, 2023 and the Contract Act, 1872, understanding statutory authorship defaults and cross-border licensing terms is vital to protecting commercial IP.',
      quickAnswer: {
        heading: 'At a Glance: Software & SaaS IP Law in Bangladesh',
        text: 'Computer software and source code are protected as literary works under the Bangladesh Copyright Act, 2023. Hiring an external freelancer or agency does not transfer source-code ownership automatically; clients must execute a signed written Deed of Assignment alongside enforceable NDA, milestone-payment, and arbitration clauses.',
        points: [
          'Governing Statutes: The Copyright Act, 2023 (replacing the 2000 Act) & The Contract Act, 1872',
          'Independent Contractor Trap: Paying an outside freelancer or agency does NOT automatically transfer source-code ownership without a signed written Assignment',
          'Employee Default: Software coded by an employee within formal employment belongs to the employer unless agreed otherwise',
          'Cross-Border Enforcement: Combine clear Governing Law, IP Assignment-upon-Full-Payment, and Arbitration/NDA clauses'
        ]
      },
      toc: [
        'Source Code Ownership Under the Copyright Act 2023: Employee vs. Freelancer',
        'Essential Clauses in Enterprise Software & SaaS Agreements',
        'Licensing vs. Full Assignment: Choosing the Right Commercial Model',
        'Enforcing Software Piracy, Source-Code Theft & SLA Breaches in Bangladesh',
        'Exporting IT Services & Protecting Foreign Tech Clients Hiring in Dhaka'
      ],
      sections: [
        {
          h2: 'Source Code Ownership Under the Copyright Act 2023: Employee vs. Freelancer',
          content: '<p>Under the <strong>Copyright Act, 2023</strong>, computer software, source code, object code, APIs, and database structures qualify for statutory copyright protection for <strong>60 years</strong> (or life plus 60 years for individual authors). However, businesses regularly fall into a costly legal misconception regarding ownership:</p><ul><li><strong>Full-Time Employees:</strong> When software is written under a formal <em>contract of service</em> during employment hours and duties, the employer becomes the first owner of copyright by default unless the employment contract states otherwise. Clear <a href="/blog/workplace-harassment-wrongful-termination-labour-law-bangladesh-2026">employment appointment documentation</a> helps avoid authorship ambiguity upon resignation.</li><li><strong>Freelancers & Software Agencies (Contract FOR Service):</strong> Paying a contractor’s invoice does <strong>not</strong> automatically transfer copyright ownership of the underlying code to the client. Without an explicit <strong>written and signed Deed of Assignment</strong> specifying territory and duration, the developer legally retains underlying IP ownership while the client merely acquires an implied license to use the software.</li></ul>'
        },
        {
          h2: 'Essential Clauses in Enterprise Software & SaaS Agreements',
          content: '<p>Whether drafting a bespoke B2B development contract in Dhaka or a recurring SaaS Terms of Service for North American subscribers, a defensible agreement should incorporate five precision clauses:</p><ol><li><strong>Payment-Contingent IP Transfer:</strong> State clearly that background libraries remain developer IP while custom project deliverables transfer to the client <em>strictly upon receipt of 100% milestone payment</em>—protecting local agencies against client non-payment.</li><li><strong>Scope Freeze & Change-Order Control:</strong> Attach a granular Statement of Work (SOW) separating fixed deliverables from billed change requests so "scope creep" does not turn into a <a href="/blog/contract-breach-legal-action-bangladesh">contract breach lawsuit</a>.</li><li><strong>SLA, Uptime & Liability Cap:</strong> Cap aggregate SaaS vendor damages at 3–12 months of paid subscription fees and exclude consequential lost-profit claims, avoiding unlimited exposure under Section 73 of the Contract Act.</li><li><strong>Open-Source (OSS) Warranty:</strong> Disclose GPL/MIT/Apache third-party packages so copyleft licenses do not accidentally contaminate proprietary enterprise builds.</li><li><strong>Confidentiality & Post-Termination Data Return:</strong> Establish binding <a href="/blog/non-compete-nda-law-bangladesh">NDA and trade-secret protections</a> with clear 30-day data export and deletion obligations upon subscription exit.</li></ol>'
        },
        {
          h2: 'Licensing vs. Full Assignment: Choosing the Right Commercial Model',
          content: '<p>Tech companies often confuse <strong>software licensing</strong> with <strong>IP assignment</strong>:</p><ul><li><strong>SaaS / Enterprise Licensing (Non-Exclusive / Term-Limited):</strong> Ideal when you build a multi-tenant ERP, POS, or AI workflow product sold to multiple clients. You grant a revocable, non-transferable license restricted by seat count or active subscription, retaining full rights to sell upgrades globally and brand them via <a href="/blog/trademark-registration-bangladesh">Bangladesh trademark registration</a>.</li><li><strong>Exclusive Work-for-Hire Assignment:</strong> Used when a client funds custom proprietary R&amp;D and requires total exclusivity for investors or acquisition due diligence. Charge accordingly and transfer IP via a written assignment specifying worldwide, perpetual scope so Bangladesh statutory reversion rules do not surprise the buyer.</li></ul>'
        },
        {
          h2: 'Enforcing Software Piracy, Source-Code Theft & SLA Breaches in Bangladesh',
          content: '<p>When a former developer leaks proprietary source code, launches a clone app, or a client refuses payment after deploying the build in production, right-holders have three immediate enforcement levers in Bangladesh:</p><ul><li><strong>Copyright Registration & High Court Injunction:</strong> While copyright exists upon creation, registering the software code deposit with the <strong>Bangladesh Copyright Office</strong> provides prima facie evidence for urgent civil injunctions, seizure of pirated copies, and statutory damages in the District Judge Court, complementing <a href="/blog/copyright-act-2023-digital-infringement-bangladesh">digital copyright infringement claims</a>.</li><li><strong>Digital & Penal Remedies:</strong> Unauthorized access, server tampering, or exfiltration of protected source code from company repositories triggers offenses under the <a href="/blog/hacking-unauthorized-computer-access-bangladesh">Cyber Security legal framework</a> and criminal breach of trust (Section 406 Penal Code).</li><li><strong>Commercial Arbitration:</strong> Including a <a href="/blog/commercial-arbitration-bangladesh-arbitration-act-2001">Bangladesh Arbitration Act 2001 clause</a> allows confidential technical adjudication within months instead of public civil litigation.</li></ul>'
        },
        {
          h2: 'Exporting IT Services & Protecting Foreign Tech Clients Hiring in Dhaka',
          content: '<p>Foreign startups in the US, UK, Canada, Australia, and Germany hiring Bangladeshi engineers or studios should align contracts with Bangladesh’s <strong>Foreign Exchange Regulation Act (FERA)</strong> invoicing norms and inward remittance banking requirements (so local exporters receive clean bank proceeds realization certificates / PRC for tax compliance), pair MSAs with clear Dhaka or international arbitration seats, and execute verified IP assignment schedules alongside <a href="/blog/joint-venture-franchise-agreement-law-bangladesh">cross-border commercial partnership structuring</a>.</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/services/company-corporate-lawyer', text: 'Corporate & IT Contracts Lawyer' },
        { to: '/services/tax-lawyer', text: 'IT Export & Tax Advisory' },
        { to: '/services/supreme-court-lawyer', text: 'IP Injunction & Arbitration' }
      ],
      faqs: [
        {
          q: 'If I paid a freelance developer in Dhaka via bank transfer, do I automatically own the source code?',
          a: 'No. Under the Bangladesh Copyright Act 2023, an independent contractor or external software agency remains the first legal owner of copyright unless both sides execute a clear, signed written Deed of Assignment explicitly transferring worldwide source-code ownership to the client.'
        },
        {
          q: 'Should we register software at the Bangladesh Copyright Office?',
          a: 'Yes. Although copyright protection attaches automatically when original code is written, registering your software deposit at the Bangladesh Copyright Office creates an official government title record that accelerates High Court or District Court injunctions and passes investor or acquisition IP due diligence.'
        },
        {
          q: 'Are non-compete clauses enforceable against software engineers in Bangladesh?',
          a: 'Broad post-employment non-compete bans preventing engineers from working in the tech industry are generally void under Section 27 of the Contract Act 1872 as a restraint of trade, whereas tailored NDA confidentiality, client non-solicitation, and trade-secret clauses remain strictly enforceable.'
        },
        {
          q: 'Can an agency lock or suspend SaaS access if the client stops paying?',
          a: 'Yes, provided the SaaS Subscription or Software License Agreement contains an explicit suspension-for-non-payment clause requiring reasonable prior written notice and cure period, and provided the vendor allows lawful export rather than maliciously destroying client-owned operational records.'
        }
      ]
    },
    bn: {
      slug: 'software-saas-chukti-freelancer-ip-ain-2023-bangladesh',
      enSlug: 'software-licensing-saas-contract-ip-law-bangladesh-guide',
      title: 'সফটওয়্যার লাইসেন্সিং, SaaS চুক্তি ও ফ্রিল্যান্সার মেধাস্বত্ব — কপিরাইট আইন ২০২৩ গাইড',
      metaTitle: 'সফটওয়্যার, SaaS চুক্তি ও ফ্রিল্যান্সার মেধাস্বত্ব আইন',
      metaDescription: 'বাংলাদেশের কপিরাইট আইন ২০২৩ অনুযায়ী সফটওয়্যার সোর্স কোড মালিকানা, SaaS লাইসেন্স চুক্তি, ফ্রিল্যান্সার IP অ্যাসাইনমেন্ট, NDA ও আইটি রপ্তানি চুক্তির আইনি গাইড।',
      category: 'করপোরেট ও বাণিজ্যিক আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'সফটওয়্যার কপিরাইট আইন ২০২৩ বাংলাদেশ',
        'সাস চুক্তি আইন বাংলাদেশ',
        'ফ্রিল্যান্সার সোর্স কোড মালিকানা',
        'সফটওয়্যার লাইসেন্সিং চুক্তি ঢাকা',
        'আইটি কোম্পানি NDA চুক্তি'
      ],
      heroIntro: 'বাংলাদেশের সফটওয়্যার ফার্ম, স্টার্টআপ এবং ফ্রিল্যান্স ডেভেলপাররা এখন যুক্তরাষ্ট্র, ইউরোপ ও দেশীয় ক্লায়েন্টদের জন্য কোটি টাকার SaaS প্ল্যাটফর্ম ও অ্যাপ তৈরি করছেন। কিন্তু সঠিক লিখিত চুক্তি ও মেধাস্বত্ব (IP) শর্ত না থাকায় প্রায়ই সোর্স কোডের মালিকানা হারানো, বকেয়া বিল আটকে রাখা বা কোড চুরির মতো জটিল বিরোধ তৈরি হয়। কপিরাইট আইন, ২০২৩ ও চুক্তি আইন, ১৮৭২ অনুযায়ী সফটওয়্যার ব্যবসার আইনি সুরক্ষা জানা অত্যন্ত জরুরি।',
      quickAnswer: {
        heading: '⚡ সফটওয়্যার ও SaaS মেধাস্বত্ব আইন — একনজরে মূল বিধান',
        text: 'বাংলাদেশের কপিরাইট আইন ২০২৩ অনুযায়ী সফটওয়্যার ও সোর্স কোড ৬০ বছর পর্যন্ত সুরক্ষিত। তবে ফ্রিল্যান্সার বা এজেন্সিকে শুধু টাকা পরিশোধ করলেই ক্লায়েন্ট সোর্স কোডের মালিক হন না—মালিকানা পেতে লিখিত Deed of Assignment, পূর্ণ পেমেন্ট শর্ত, NDA ও সালিশ ক্লজ থাকতে হয়।',
        points: [
          'মূল আইন: কপিরাইট আইন, ২০২৩ (সফটওয়্যার ও সোর্স কোড সাহিত্যকর্ম হিসেবে সুরক্ষিত) এবং চুক্তি আইন, ১৮৭২',
          'ফ্রিল্যান্সার চুক্তির ঝুঁকি: শুধু টাকা পরিশোধ করলেই ফ্রিল্যান্সার বা এজেন্সির কোডের মালিকানা ক্লায়েন্টের হয় না—লিখিত স্বাক্ষরিত Assignment শর্ত লাগে',
          'চাকরিজীবী ডেভেলপার: চাকরির শর্তে অফিসের কাজে লেখা কোডের কপিরাইট স্বয়ংক্রিয়ভাবে নিয়োগকর্তার থাকে (ভিন্ন চুক্তি না থাকলে)',
          'আইনি সুরক্ষা: পূর্ণ পেমেন্ট সাপেক্ষে IP হস্তান্তর, NDA এবং সালিশ (Arbitration) ক্লজ যুক্ত থাকা জরুরি'
        ]
      },
      toc: [
        'কপিরাইট আইন ২০২৩: কর্মচারী বনাম ফ্রিল্যান্সারের সোর্স কোড মালিকানা',
        'সফটওয়্যার ডেভেলপমেন্ট ও SaaS চুক্তির ৫টি অপরিহার্য শর্ত',
        'সফটওয়্যার লাইসেন্স বনাম পূর্ণ মালিকানা হস্তান্তর (Assignment)',
        'সোর্স কোড চুরি, পাইরেসি ও বিল খেলাপির বিরুদ্ধে আইনি প্রতিকার',
        'বিদেশি ক্লায়েন্টের সাথে আইটি রপ্তানি ও বৈদেশিক মুদ্রা প্রবাহের নিয়ম'
      ],
      sections: [
        {
          h2: 'কপিরাইট আইন ২০২৩: কর্মচারী বনাম ফ্রিল্যান্সারের সোর্স কোড মালিকানা',
          content: '<p><strong>কপিরাইট আইন, ২০২৩</strong> অনুযায়ী কম্পিউটার প্রোগ্রাম, সোর্স কোড, ডাটাবেজ কাঠামো ও অ্যাপ কোড ৬০ বছর পর্যন্ত আইনি সুরক্ষা পায়। তবে মালিকানার ক্ষেত্রে দুটি অবস্থার মধ্যে বড় পার্থক্য রয়েছে:</p><ul><li><strong>পূর্ণকালীন কর্মচারী (Contract of Service):</strong> নিয়োগপত্রের অধীনে অফিসের কাজের অংশ হিসেবে কোনো ডেভেলপার সফটওয়্যার লিখলে, ভিন্ন চুক্তি না থাকলে তার প্রথম কপিরাইট মালিক হন নিয়োগকর্তা বা কোম্পানি। স্পষ্ট <a href="/bn/blog/beaini-chakri-chuti-shrom-adalat-khotipuron-2026-bn">নিয়োগ ও শ্রম আইন মেনে</a> নথিপত্র সংরক্ষণ করলে কর্মী চাকরি ছাড়ার পর মালিকানা নিয়ে বিতর্ক ওঠে না।</li><li><strong>ফ্রিল্যান্সার বা এজেন্সি (Contract FOR Service):</strong> কোনো আউটসোর্সিং ডেভেলপারকে শুধু বিল পরিশোধ করলেই কোডের কপিরাইট ক্লায়েন্টের নামে চলে যায় না। স্পষ্ট <strong>লিখিত ও স্বাক্ষরিত Deed of Assignment</strong> না থাকলে আইনিভাবে মূল কোডের স্বত্ব ডেভেলপারের হাতেই থেকে যায়।</li></ul>'
        },
        {
          h2: 'সফটওয়্যার ডেভেলপমেন্ট ও SaaS চুক্তির ৫টি অপরিহার্য শর্ত',
          content: '<p>দেশীয় বা আন্তর্জাতিক ক্লায়েন্টের সাথে চুক্তির খসড়ায় নিচের ৫টি ধারা থাকা আবশ্যক:</p><ol><li><strong>পেমেন্ট-ভিত্তিক IP হস্তান্তর:</strong> চুক্তির ১০০% মূল্য পরিশোধের পরই কাস্টম কোডের স্বত্ব ক্লায়েন্টের কাছে যাবে—এটি উল্লেখ থাকলে ক্লায়েন্ট টাকা না দিয়ে প্রজেক্ট নিয়ে পালাতে পারে না।</li><li><strong>স্কোপ ফ্রিজ ও চেঞ্জ রিকোয়েস্ট:</strong> Statement of Work (SOW)-তে ফিচারের তালিকা আলাদা রাখুন যাতে অতিরিক্ত কাজের বিল নিয়ে <a href="/bn/blog/chukti-bhongo-taka-jomi-attosat-deoyani-foujdari-mamla-2026">চুক্তি ভঙ্গের মামলা বা বিরোধ</a> না ঘটে।</li><li><strong>SLA ও দায়বদ্ধতা সীমা (Liability Cap):</strong> সফটওয়্যার ক্র্যাশ বা ডাউনটাইমের কারণে অসীম ক্ষতিপূরণের ঝুঁকি এড়াতে ৩ থেকে ১২ মাসের ফি সমপরিমাণ সীমা নির্ধারণ করুন।</li><li><strong>ওপেন-সোর্স (OSS) ডিক্লোজার:</strong> GPL বা MIT লাইসেন্সযুক্ত থার্ড-পার্টি লাইব্রেরি ব্যবহারের তালিকা স্পষ্ট করুন।</li><li><strong>গোপনীয়তা ও ডেটা ফেরত (NDA):</strong> <a href="/bn/blog/joint-venture-franchise-chukti-ain-bangladesh">গোপনীয়তা, NDA ও বাণিজ্যিক চুক্তি রক্ষা</a> ধারা রেখে চুক্তি শেষে ৩০ দিনের মধ্যে ক্লায়েন্ট ডেটা হস্তান্তর বা মুছে ফেলার নিয়ম নির্ধারণ করুন।</li></ol>'
        },
        {
          h2: 'সফটওয়্যার লাইসেন্স বনাম পূর্ণ মালিকানা হস্তান্তর (Assignment)',
          content: '<p>আপনি যদি একই ERP, POS বা SaaS প্ল্যাটফর্ম বহু গ্রাহকের কাছে মাসিক সাবস্ক্রিপশনে বিক্রি করেন, তবে কখনোই সম্পূর্ণ IP Assignment দেবেন না—বরং <strong>নন-এক্সক্লুসিভ সাবস্ক্রিপশন লাইসেন্স</strong> দেবেন এবং ব্র্যান্ড সুরক্ষায় <a href="/bn/blog/trademark-brand-logo-registration-bangladesh">ট্রেডমার্ক ও লোগো নিবন্ধন</a> করে নেবেন। অন্যদিকে কোনো বিদেশি স্টার্টআপ কেবল নিজের প্রোডাক্ট তৈরির জন্য বাজেট দিলে লিখিত Assignment চুক্তির মাধ্যমে বিশ্বব্যাপী ব্যবহারের অধিকার হস্তান্তর করে সেই অনুযায়ী মূল্য নির্ধারণ করতে হবে।</p>'
        },
        {
          h2: 'সোর্স কোড চুরি, পাইরেসি ও বিল খেলাপির বিরুদ্ধে আইনি প্রতিকার',
          content: '<p>প্রাক্তন কর্মী বা অংশীদার কোড চুরি করে ক্লোন অ্যাপ বানালে বা ক্লায়েন্ট পেমেন্ট আটকে দিলে করণীয়:</p><ul><li><strong>কপিরাইট নিবন্ধন ও নিষেধাজ্ঞা:</strong> বাংলাদেশ কপিরাইট অফিসে সফটওয়্যার কোড নিবন্ধন করলে জেলা জজ আদালতে জরুরি নিষেধাজ্ঞা (Injunction) ও ক্ষতিপূরণ পাওয়া সহজ হয় এবং <a href="/bn/blog/copyright-ain-2023-digital-content-churi-khotipuron-mamla-2026-bn">ডিজিটাল কপিরাইট লঙ্ঘনের মামলা</a> দ্রুত ফল দেয়।</li><li><strong>সাইবার ও ফৌজদারি মামলা:</strong> অনুমতি ছাড়া সার্ভার বা গিট রিপোজিটরি থেকে কোড ডাউনলোড করলে <a href="/bn/blog/cybercrime-digital-security-bangladesh-bn">সাইবার নিরাপত্তা আইনে</a> ও দণ্ডবিধির ৪০৬ ধারায় ব্যবস্থা নেওয়া যায়।</li><li><strong>বাণিজ্যিক সালিশ:</strong> চুক্তিতে <a href="/bn/blog/commercial-arbitration-madhyasthata-ain-2001-bangladesh">আরবিট্রেশন আইন ২০০১</a>-এর শর্ত রাখলে গোপনীয়তা বজায় রেখে দ্রুত নিষ্পত্তি সম্ভব।</li></ul>'
        },
        {
          h2: 'বিদেশি ক্লায়েন্টের সাথে আইটি রপ্তানি ও বৈদেশিক মুদ্রা প্রবাহের নিয়ম',
          content: '<p>বিদেশি ক্লায়েন্টের কাছ থেকে ডলার বা ইউরো আনার সময় বৈধ ব্যাংকিং চ্যানেলে ইনভয়েস করে Proceeds Realisation Certificate (PRC) সংগ্রহ করা উচিত, যাতে আইটি রপ্তানির কর সুবিধা ও বৈদেশিক মুদ্রা আইন অনুযায়ী স্বচ্ছতা থাকে। পাশাপাশি বিদেশি কোম্পানির সাথে যৌথ উদ্যোগ বা দীর্ঘমেয়াদী আউটসোর্সিং চুক্তিতে বিরোধ এড়াতে অর্থ পরিশোধের মাইলফলক, মেধাস্বত্বের সীমানা, ডেটা সুরক্ষা মানদণ্ড ও নির্দিষ্ট সালিশি এখতিয়ার স্পষ্ট রাখা জরুরি। কোম্পানি পর্যায়ে অংশীদারিত্ব করলে <a href="/bn/blog/director-opasharon-share-transfer-bibad-rjsc-2026-bn">আরজেএসসি শেয়ারহোল্ডার ও কোম্পানি আইন</a> ও আন্তর্জাতিক চুক্তি কাঠামো অনুসরণ করুন।</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/bn/services/company-corporate-lawyer', text: 'কোম্পানি ও আইটি চুক্তি আইনজীবী' },
        { to: '/bn/services/tax-lawyer', text: 'আয়কর ও আইটি রপ্তানি কর পরামর্শ' },
        { to: '/bn/services/supreme-court-lawyer', text: 'মেধাস্বত্ব ও সালিশ মামলা' }
      ],
      faqs: [
        {
          q: 'ফ্রিল্যান্সারকে ব্যাংকের মাধ্যমে পুরো টাকা দিলে কি সফটওয়্যারের মালিকানা স্বয়ংক্রিয়ভাবে ক্লায়েন্টের হয়?',
          a: 'না। বাংলাদেশের কপিরাইট আইন ২০২৩ অনুযায়ী ফ্রিল্যান্সার বা সফটওয়্যার এজেন্সিকে ব্যাংক বা কার্ডের মাধ্যমে সম্পূর্ণ বিল পরিশোধ করলেও স্বয়ংক্রিয়ভাবে সোর্স কোডের মালিকানা ক্লায়েন্টের নামে হস্তান্তর হয় না; পূর্ণ মালিকানা পেতে উভয় পক্ষের স্বাক্ষরিত লিখিত Deed of Assignment চুক্তি থাকা আইনত বাধ্যতামূলক।'
        },
        {
          q: 'সফটওয়্যার কি বাংলাদেশ কপিরাইট অফিসে নিবন্ধন করা উচিত?',
          a: 'হ্যাঁ। সোর্স কোড লেখার সাথে সাথেই প্রাথমিক কপিরাইট সুরক্ষা তৈরি হলেও বাংলাদেশ কপিরাইট অফিসে সফটওয়্যার ও কোড ডিপোজিট নিবন্ধন করলে সরকারি মালিকানার প্রামাণ্য দলিল পাওয়া যায়, যা জেলা জজ বা হাইকোর্টে জরুরি নিষেধাজ্ঞা পেতে এবং বিদেশি বিনিয়োগ যাচাইয়ে অত্যন্ত কার্যকর ভূমিকা রাখে।'
        },
        {
          q: 'কর্মচারীকে চাকরি ছাড়ার পর অন্য সফটওয়্যার কোম্পানিতে যোগ দিতে বাধা দেওয়া যায় কি?',
          a: 'চুক্তি আইনের ২৭ ধারা অনুযায়ী চাকরি ছাড়ার পর অন্য কোনো সফটওয়্যার প্রতিষ্ঠানে কাজ করতে বাধা দেওয়ার ঢালাও Non-Compete শর্ত সাধারণত বাতিলযোগ্য; তবে কোডের গোপনীয়তা রক্ষা (NDA), ট্রেড সিক্রেট ও ক্লায়েন্ট না নেওয়ার শর্ত আইনিভাবে বলবৎযোগ্য।'
        },
        {
          q: 'ক্লায়েন্ট মাসিক ফি না দিলে কি SaaS সার্ভিস বন্ধ করে দেওয়া বৈধ?',
          a: 'হ্যাঁ, যদি সফটওয়্যার বা SaaS সাবস্ক্রিপশন চুক্তিতে বকেয়া পেমেন্ট পরিশোধে ব্যর্থ হলে লিখিত নোটিশ দিয়ে নির্দিষ্ট গ্রেস পিরিয়ডের পর সেবা স্থগিত (Suspension) করার স্পষ্ট ধারা যুক্ত থাকে এবং বিক্রেতা ক্লায়েন্টের নিজস্ব ব্যবসায়িক ডেটা বেআইনিভাবে মুছে না ফেলে।'
        }
      ]
    }
  },

  // 4. BSEC Capital Market, Stockbroker Fraud & BO Account Investor Complaints
  {
    en: {
      slug: 'bsec-stockbroker-fraud-bo-account-investor-complaint-bangladesh',
      bnSlug: 'share-bazar-broker-pratarana-bsec-bo-account-ovijog-bangladesh',
      title: 'BSEC Investor Complaints & Stockbroker / BO Account Fraud Remedies in Bangladesh',
      metaTitle: 'BSEC Investor Complaint & Stockbroker Fraud BD',
      metaDescription: 'How DSE, CSE & NRB NITA investors recover stolen shares, challenge unauthorized margin liquidation, claim unclaimed dividends & file BSEC CCAM complaints in BD.',
      category: 'Corporate Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'bsec investor complaint ccam bangladesh',
        'stockbroker fraud bo account dse bangladesh',
        'unauthorized share sale cdbl complaint',
        'margin loan dispute bsec bangladesh',
        'nrb nita account share recovery bangladesh'
      ],
      heroIntro: 'Unauthorized share sales from Beneficiary Owner (BO) accounts, withheld sale proceeds by troubled brokerage houses, irregular forced margin-loan liquidations, and frozen dividends affect both local Dhaka/Chattogram Stock Exchange investors and Non-Resident Bangladeshi (NRB) NITA account holders. Under the Securities and Exchange Ordinance, 1969, the BSEC Act, 1993, and the Depository Act, 1999, investors can trace CDBL electronic records and enforce rapid restitution through BSEC, Exchange Arbitration, and the High Court.',
      quickAnswer: {
        heading: 'At a Glance: Capital Market & Broker Fraud Remedies (BD)',
        text: 'DSE, CSE, and NRB NITA investors are protected under the Securities and Exchange Ordinance 1969 and BSEC rules. Victims of unauthorized BO account transfers, forced margin sales, or unpaid broker proceeds should secure independent CDBL statements immediately and lodge formal recovery filings with DSE/CSE and BSEC CCAM.',
        points: [
          'Governing Statutes: Securities and Exchange Ordinance 1969, BSEC Act 1993 & Depositories Act 1999',
          'Immediate Step 1: Pull independent CDBL BO Account Statement & SMS alert logs to stop unauthorized transfers',
          'Regulatory Portal: File digital complaint with DSE/CSE Surveillance and BSEC Customer Complaint Address Module (CCAM)',
          'Broker Insolvency / Default: Claims against suspended TREC holders go via DSE/CSE Investor Protection Fund & High Court'
        ]
      },
      toc: [
        'Common Stockbroker & Margin-Loan Abuses Under Bangladesh Securities Law',
        'Immediate Evidence Preservation Using CDBL Ledgers & Trade Confirmations',
        'Filing Formal Complaints at DSE, CSE & BSEC Complaint Portal (CCAM)',
        'Recovering Funds From Defaulting Brokers & Unclaimed Dividends (CMSF)',
        'NRB NITA Account Protection & High Court Writ / Criminal Remedies'
      ],
      sections: [
        {
          h2: 'Common Stockbroker & Margin-Loan Abuses Under Bangladesh Securities Law',
          content: '<p>Licensed stockbrokers (TREC holders) and merchant banks operate under strict fiduciary and reporting obligations imposed by the <strong>Bangladesh Securities and Exchange Commission (BSEC)</strong> and <strong>Securities and Exchange Rules, 2020</strong>. Common actionable violations include:</p><ul><li><strong>Unauthorized Share Sales or Transfers:</strong> Selling shares from a client’s BO account without verifiable buy/sell orders (written slip, recorded trade line, or authenticated OMS order).</li><li><strong>Failure to Pay Sale Proceeds:</strong> Delaying T+2/T+3 settlement payouts beyond standard clearing cycles or commingling client Consolidated Customers’ Account (CCA) money with broker operating cash.</li><li><strong>Illegal Forced Margin Sale:</strong> Liquidating pledged securities without issuing mandatory written margin-call notices and reasonable cure periods under BSEC Margin Rules. Corporate investors facing governance violations at listed issuers can also explore <a href="/blog/minority-shareholder-oppression-section-233-companies-act-bangladesh">Section 233 shareholder protection remedies</a>.</li></ul>'
        },
        {
          h2: 'Immediate Evidence Preservation Using CDBL Ledgers & Trade Confirmations',
          content: '<p>Because every listed share moves electronically through <strong>Central Depository Bangladesh Limited (CDBL)</strong>, brokers cannot erase historical custody trails. Before confronting a rogue Relationship Manager verbally:</p><ol><li>Log in to CDBL’s <strong>MyCDBL portal</strong> (or obtain a certified DP statement directly from CDBL or another custodian) showing exact ISIN movement dates.</li><li>Download every bank deposit receipt, cheque copy, signed client KYC/margin agreement, and email or WhatsApp order instructions. If a broker issued a dishonoured settlement cheque, initiate <a href="/blog/section-138-ni-act-cheque-bounce-bail-punishment-bangladesh">Section 138 NI Act cheque recovery</a> immediately within the 30-day statutory notice window.</li><li>Verify the mobile number and email registered inside CDBL—fraudulent actors often alter investor contact details first to silence SMS trade alerts.</li></ol>'
        },
        {
          h2: 'Filing Formal Complaints at DSE, CSE & BSEC Complaint Portal (CCAM)',
          content: '<p>Bangladesh provides a structured two-tier regulatory recovery process:</p><ul><li><strong>Exchange Grievance & Arbitration (DSE / CSE):</strong> Submit a written complaint with trade logs to the Dhaka Stock Exchange or Chittagong Stock Exchange Investor Complaints & Arbitration wing. The Exchange can inspect the broker’s CCA bank reconciliation, suspend dealer terminals, and adjudicate financial restitution through <a href="/blog/commercial-arbitration-bangladesh-arbitration-act-2001">statutory arbitration enforcement</a>.</li><li><strong>BSEC CCAM & Enforcement:</strong> Simultaneously file online via BSEC’s <strong>Customer Complaint Address Module (CCAM)</strong>. Under the <strong>Securities and Exchange Ordinance, 1969 (Sections 20A, 22 & 24)</strong>, BSEC holds statutory power to summon broker directors, impose heavy daily penalties, freeze bank accounts and BO accounts, and direct investor restitution.</li></ul>'
        },
        {
          h2: 'Recovering Funds From Defaulting Brokers & Unclaimed Dividends (CMSF)',
          content: '<p>Where a brokerage house defaults on its Consolidated Customers’ Account (CCA) or has its TREC suspended, investors should promptly register verified claims before the <strong>DSE/CSE Settlement & Investor Protection Fund</strong> committee to participate in asset-liquidation payouts alongside frozen TREC deposits.</p><p>Separately, if you or deceased parents missed cash or stock dividends over three years old, those unclaimed funds are transferred to the <strong>Capital Market Stabilization Fund (CMSF)</strong>—from which rightful investors or <a href="/blog/how-to-get-succession-certificate-bank-property-bangladesh">succession-certificate-holding heirs</a> can reclaim unpaid dividends online with CDBL verification. Also verify capital gains tax compliance using <a href="/blog/income-tax-case-procedure-bangladesh">NBR tax assessment rules</a>.</p>'
        },
        {
          h2: 'NRB NITA Account Protection & High Court Writ / Criminal Remedies',
          content: '<p>NRBs investing through Non-Resident Investor’s Taka Accounts (<strong>NITA</strong>) enjoy full repatriation rights for dividends and capital gains through authorized dealer banks. Whenever a brokerage house or custodian delays sale-proceeds repatriation or fails to honor CDBL delivery instructions, international investors should retain certified inward remittance vouchers, SWIFT confirmation advices, and executed trading mandates before initiating formal demand notices.</p><p>Where broker fraud involves forged share transfer deeds, unauthorized margin pledges, or embezzlement of crore-scale CCA funds and regulatory relief stalls, investors may initiate criminal breach of trust prosecutions (Sections 406/409/420/468 Penal Code) or seek urgent <a href="/blog/writ-petition-high-court-bangladesh-grounds-procedure">High Court Writ or Company Bench relief</a> compelling regulatory enforcement, BO ledger preservation, and bank account freezing.</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/services/company-corporate-lawyer', text: 'Securities & Corporate Litigation' },
        { to: '/services/supreme-court-lawyer', text: 'High Court Writ & Company Bench' },
        { to: '/nrb-legal-help', text: 'NRB NITA Investor Assistance' }
      ],
      faqs: [
        {
          q: 'How can I check if my stockbroker sold shares without my permission?',
          a: 'Register directly on CDBL’s MyCDBL service using your BO ID, mobile number, and National ID (NID) to inspect independent share balances, historical transaction statements, and real-time SMS debit or credit alerts completely independent of your broker’s back-office reports.'
        },
        {
          q: 'Can a brokerage house sell my margin shares without sending a margin call?',
          a: 'No. Under BSEC Margin Rules, licensed brokers and merchant banks must execute a valid written margin agreement and issue prior written margin calls notifying the specific equity-ratio breach before exercising forced liquidation rights over pledged client securities.'
        },
        {
          q: 'How do heirs claim shares and unclaimed dividends of a deceased investor?',
          a: 'Legal heirs must obtain a competent court Succession Certificate explicitly listing the BO ID, company names, share quantities, and ISINs, submit death and CDBL transmission forms via the Depository Participant, and file online unclaimed-dividend claims before the Capital Market Stabilization Fund (CMSF).'
        },
        {
          q: 'Can NRBs recover funds if a Dhaka brokerage firm closes down?',
          a: 'Yes, NRBs can file authenticated NITA inward remittance statements and verified CDBL holdings before the DSE or CSE Investor Protection Fund claims committee, and simultaneously pursue criminal or civil recovery in Dhaka courts through an embassy-attested Power of Attorney.'
        }
      ]
    },
    bn: {
      slug: 'share-bazar-broker-pratarana-bsec-bo-account-ovijog-bangladesh',
      enSlug: 'bsec-stockbroker-fraud-bo-account-investor-complaint-bangladesh',
      title: 'শেয়ার বাজার ব্রোকার প্রতারণা, BO অ্যাকাউন্ট জালিয়াতি ও BSEC অভিযোগ গাইড',
      metaTitle: 'শেয়ার বাজার ব্রোকার প্রতারণা ও BSEC-তে অভিযোগ গাইড',
      metaDescription: 'অনুমতি ছাড়া BO অ্যাকাউন্ট থেকে শেয়ার বিক্রি, টাকা আটকে রাখা, মার্জিন লোন বিরোধ ও অবণ্টিত লভ্যাংশ উদ্ধারে CDBL, DSE ও BSEC-তে অভিযোগ করার আইনি প্রক্রিয়া।',
      category: 'ব্যাংকিং ও আর্থিক আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'শেয়ার বাজার ব্রোকার প্রতারণা অভিযোগ',
        'BO অ্যাকাউন্ট শেয়ার চুরি প্রতিকার',
        'BSEC অভিযোগ করার নিয়ম বাংলাদেশ',
        'DSE ইনভেস্টর প্রোটেকশন ফান্ড',
        'অবণ্টিত ডিভিডেন্ড CMSF উত্তোলন'
      ],
      heroIntro: 'বিনিয়োগকারীর অজান্তে বিও (BO) অ্যাকাউন্ট থেকে শেয়ার বিক্রি করে দেওয়া, শেয়ার বিক্রির টাকা মাসের পর মাস আটকে রাখা, নোটিশ ছাড়াই মার্জিন লোনের শেয়ার ফোর্স সেল করা কিংবা পুরোনো ডিভিডেন্ড না পাওয়া দেশি ও প্রবাসী (NITA) বিনিয়োগকারীদের বড় সংকট। সিকিউরিটিজ অ্যান্ড এক্সচেঞ্জ অধ্যাদেশ ১৯৬৯, বিএসইসি আইন ১৯৯৩ ও ডিপোজিটরি আইন ১৯৯৯ অনুযায়ী সিডিবিএল তথ্য যাচাই ও অর্থ আদায়ের স্পষ্ট আইনি প্রক্রিয়া রয়েছে।',
      quickAnswer: {
        heading: '⚡ শেয়ার বাজার ও ব্রোকার বিরোধ — একনজরে আইনি প্রতিকার',
        text: 'অনুমতি ছাড়া BO অ্যাকাউন্টের শেয়ার বিক্রি বা টাকা আটকে রাখলে প্রথমেই MyCDBL পোর্টাল থেকে স্বাধীন স্টেটমেন্ট নিন। এরপর সিকিউরিটিজ অধ্যাদেশ ১৯৬৯ ও BSEC বিধিমালা অনুযায়ী ঢাকা/চট্টগ্রাম স্টক এক্সচেঞ্জ ও BSEC-এর অনলাইন CCAM পোর্টালে অভিযোগ এবং প্রয়োজনে হাইকোর্টে প্রতিকার চাওয়া যায়।',
        points: [
          'মূল আইন: Securities & Exchange Ordinance 1969, BSEC Act 1993 এবং Depositories Act 1999',
          'প্রথম জরুরি কাজ: ব্রোকারের ওপর নির্ভর না করে সরাসরি CDBL (MyCDBL) থেকে আসল BO স্টেটমেন্ট ও SMS অ্যালার্ট যাচাই করুন',
          'নিয়ন্ত্রক অভিযোগ: ঢাকা/চট্টগ্রাম স্টক এক্সচেঞ্জ (DSE/CSE) এবং BSEC-এর অনলাইন CCAM পোর্টালে লিখিত অভিযোগ দায়ের',
          'ব্রোকার দেউলিয়া হলে: DSE/CSE Investor Protection Fund এবং ফৌজদারি বিশ্বাসভঙ্গ/হাইকোর্টে প্রতিকার'
        ]
      },
      toc: [
        'শেয়ার বাজারে ব্রোকারেজ হাউস ও মার্জিন লোনের সাধারণ অনিয়ম',
        'সিডিবিএল (CDBL) লেজার ও প্রমাণপত্র সংরক্ষণের জরুরি নিয়ম',
        'DSE, CSE ও বিএসইসি (BSEC CCAM) পোর্টালে আনুষ্ঠানিক অভিযোগ দায়ের',
        'খেলাপি ব্রোকার থেকে পাওনা আদায় ও অবণ্টিত লভ্যাংশ (CMSF) পুনরুদ্ধার',
        'প্রবাসী NITA বিনিয়োগকারীদের সুরক্ষা ও ফৌজদারি/হাইকোর্ট প্রতিকার'
      ],
      sections: [
        {
          h2: 'শেয়ার বাজারে ব্রোকারেজ হাউস ও মার্জিন লোনের সাধারণ অনিয়ম',
          content: '<p>নিবন্ধিত ব্রোকারেজ হাউস (TREC হোল্ডার) ও মার্চেন্ট ব্যাংকগুলো বিএসইসি-র কঠোর বিধিমালার অধীনে পরিচালিত হয়। আইনিভাবে দণ্ডনীয় প্রধান অনিয়মগুলো হলো:</p><ul><li><strong>অনুমতি ছাড়া শেয়ার বিক্রি:</strong> বিনিয়োগকারীর লিখিত অর্ডার, রেকর্ডকৃত কল বা অনুমোদিত অনলাইন ট্রেডিং নির্দেশ ছাড়াই বিও অ্যাকাউন্ট থেকে শেয়ার বিক্রি বা স্থানান্তর।</li><li><strong>শেয়ার বিক্রির টাকা আটকানো:</strong> নির্ধারিত T+2/T+3 সেটেলমেন্টের পরও ক্লায়েন্টদের কনসোলিডেটেড কাস্টমার অ্যাকাউন্ট (CCA) থেকে চেক বা ব্যাংক ট্রান্সফার আটকে রাখা।</li><li><strong>বেআইনি ফোর্সড মার্জিন সেল:</strong> বিএসইসি মার্জিন বিধিমালা অনুযায়ী পূর্বলিখিত মার্জিন কল নোটিশ ও নির্দিষ্ট সময় না দিয়েই বিনিয়োগকারীর শেয়ার কম দামে বিক্রি করে দেওয়া। তালিকাভুক্ত কোম্পানির অভ্যন্তরীণ অনিয়মে <a href="/bn/blog/company-minority-shareholder-oppression-section-233-high-court-2026-bn">সংখ্যালঘু শেয়ারহোল্ডার সুরক্ষা (ধারা ২৩৩)</a> প্রয়োগ করা যায়।</li></ul>'
        },
        {
          h2: 'সিডিবিএল (CDBL) লেজার ও প্রমাণপত্র সংরক্ষণের জরুরি নিয়ম',
          content: '<p>বাংলাদেশের সব ইলেকট্রনিক শেয়ার <strong>Central Depository Bangladesh Limited (CDBL)</strong>-এর সার্ভারে সংরক্ষিত থাকে। ব্রোকারের কাছে মৌখিক প্রতিবাদ করার আগেই নিচের কাজগুলো করুন:</p><ol><li>সরাসরি <strong>MyCDBL পোর্টালে</strong> (অথবা সিডিবিএল অফিস থেকে) আপনার BO আইডির আলাদা ও সত্যায়িত হোল্ডিংস এবং লেনদেন স্টেটমেন্ট সংগ্রহ করুন।</li><li>ব্যাংকে টাকা জমার রশিদ, স্বাক্ষরিত গ্রাহক অ্যাকাউন্ট/মার্জিন চুক্তি এবং ইমেইল/হোয়াটসঅ্যাপে দেওয়া ট্রেড নির্দেশনার কপি সংরক্ষণ করুন। ব্রোকার পাওনা পরিশোধে দেওয়া চেক বাউন্স হলে অবিলম্বে <a href="/bn/blog/cheque-dishonour-legal-notice-pathanor-niyom-ni-act">১৩৮ ধারায় চেক ডিজঅনার নোটিশ ও মামলা</a> করুন।</li><li>CDBL রেকর্ডে আপনার নিজের মোবাইল নম্বর ও ইমেইল সঠিক আছে কি না যাচাই করুন—অনেক সময় প্রতারক কর্মীরা আগে SMS অ্যালার্টের নম্বর বদলে দেয়।</li></ol>'
        },
        {
          h2: 'DSE, CSE ও বিএসইসি (BSEC CCAM) পোর্টালে আনুষ্ঠানিক অভিযোগ দায়ের',
          content: '<p>বিনিয়োগকারীরা দ্বিস্তর বিশিষ্ট শক্তিশালী নিয়ন্ত্রক ব্যবস্থায় প্রতিকার চাইতে পারেন:</p><ul><li><strong>স্টক এক্সচেঞ্জ অভিযোগ ও সালিশ:</strong> প্রমাণসহ ঢাকা বা চট্টগ্রাম স্টক এক্সচেঞ্জের Investor Complaints সেলে আবেদন করলে এক্সচেঞ্জ ব্রোকারের CCA ব্যাংক হিসাব অডিট, ট্রেডিং টার্মিনাল স্থগিত এবং এক্সচেঞ্জ সালিশের মাধ্যমে অর্থ আদায়ের নির্দেশ দিতে পারে।</li><li><strong>বিএসইসি (BSEC) CCAM অভিযোগ:</strong> অনলাইনে BSEC-এর <strong>Customer Complaint Address Module (CCAM)</strong>-এ সমস্ত লেনদেন প্রমাণ আপলোড করে অভিযোগ দাখিল করলে এবং নির্দিষ্ট শুনানিতে উপস্থিত থাকলে ১৯৬৯ সালের অধ্যাদেশের ২০ক ও ২২ ধারা অনুযায়ী কমিশন জরিমানা, ব্যাংক হিসাব জব্দ ও পাওনা পরিশোধের আদেশ জারি করতে পারে।</li></ul>'
        },
        {
          h2: 'খেলাপি ব্রোকার থেকে পাওনা আদায় ও অবণ্টিত লভ্যাংশ (CMSF) পুনরুদ্ধার',
          content: '<p>কোনো ব্রোকারেজ হাউস গ্রাহকদের CCA তহবিল আত্মসাৎ করে বন্ধ হয়ে গেলে, DSE/CSE-র <strong>Investor Protection Fund</strong> ও ফ্রিজকৃত TREC লাইসেন্সের জামানত থেকে আনুপাতিক অর্থ আদায়ের জন্য নির্ধারিত সময়ের মধ্যে দাবি জমা দিতে হয়। ব্রোকারের কার্যক্রম স্থগিত হলে তাৎক্ষণিক লিংক অ্যাকাউন্ট খুলে বিদ্যমান সুস্থ শেয়ারগুলো অন্য নিরাপদ ব্রোকারেজ হাউসে স্থানান্তর (CDBL Transfer) করার আবেদনও করা যায় যাতে বিনিয়োগকৃত মূলধন দীর্ঘদিন আটকে না থাকে।</p><p>এছাড়া ৩ বছরের বেশি সময় অবণ্টিত থাকা নগদ বা বোনাস ডিভিডেন্ড <strong>Capital Market Stabilization Fund (CMSF)</strong>-এ জমা থাকে, যা জীবিত বিনিয়োগকারী বা <a href="/bn/blog/uttaradhikar-certificate-bank-taka-prokriya-bangladesh">সাকসেশন সার্টিফিকেটধারী ওয়ারিশরা</a> আবেদন করে তুলতে পারেন এবং মূলধনী মুনাফার কর <a href="/bn/blog/income-tax-case-procedure-bangladesh-bn">আয়কর রিটার্ন নিয়মে</a> সমন্বয় করতে হয়।</p>'
        },
        {
          h2: 'প্রবাসী NITA বিনিয়োগকারীদের সুরক্ষা ও ফৌজদারি/হাইকোর্ট প্রতিকার',
          content: '<p>প্রবাসী বিনিয়োগকারীরা NITA (Non-Resident Investor’s Taka Account) ব্যাংক চ্যানেলের মাধ্যমে বিনিয়োগ করলে অর্থ ও মুনাফা বৈধভাবে বিদেশে নেওয়ার অধিকার রাখেন। বিদেশে বসে শেয়ার লেনদেনে প্রতারিত হলে ব্যাংকের রেমিট্যান্স সার্টিফিকেট, CDBL স্টেটমেন্ট ও ব্রোকারের সাথে ইমেইল বা মেসেঞ্জার কথোপকথন সংরক্ষণ করে অ্যাডভোকেট লিগ্যাল নোটিশ পাঠানো উচিত।</p><p>বড় অঙ্কের প্রতারণা বা জাল স্বাক্ষরে শেয়ার আত্মসাতের ঘটনায় নিয়ন্ত্রক সংস্থার পাশাপাশি দণ্ডবিধির ৪০৬/৪০৯/৪২০/৪৬৮ ধারায় <a href="/bn/blog/protarona-420-bishwasbhanga-406-dandobidhi-mamla-defense-2026-bn">ফৌজদারি বিশ্বাসভঙ্গ ও প্রতারণার মামলা</a> এবং প্রয়োজনে <a href="/bn/blog/writ-petition-haikort-dhap-khoroch-2026">হাইকোর্টে রিট বা কোম্পানি বেঞ্চে</a> প্রতিকার চাওয়া যায়।</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/bn/services/company-corporate-lawyer', text: 'কোম্পানি ও শেয়ার বাজার আইনজীবী' },
        { to: '/bn/services/supreme-court-lawyer', text: 'হাইকোর্ট রিট ও কোম্পানি বেঞ্চ' },
        { to: '/nrb-legal-help', text: 'প্রবাসী NITA বিনিয়োগ সহায়তা' }
      ],
      faqs: [
        {
          q: 'ব্রোকার আমার অজান্তে শেয়ার বিক্রি করেছে কি না তা কীভাবে নিশ্চিত হব?',
          a: 'ব্রোকারের পাঠানো লেজারের ওপর নির্ভর না করে আপনার BO আইডি, নিবন্ধিত মোবাইল নম্বর এবং জাতীয় পরিচয়পত্র (NID) ব্যবহার করে সরাসরি MyCDBL পোর্টালে লগইন করুন; সেখান থেকেই ব্রোকারের হস্তক্ষেপ ছাড়া আসল শেয়ার ব্যালেন্স ও লেনদেন বিবরণী দেখা যায়।'
        },
        {
          q: 'পূর্ব নোটিশ ছাড়া ব্রোকার কি মার্জিন অ্যাকাউন্টের শেয়ার জোর করে বিক্রি করতে পারে?',
          a: 'না। বিএসইসি মার্জিন বিধিমালা অনুযায়ী ব্রোকারেজ হাউস বা মার্চেন্ট ব্যাংকের সাথে লিখিত মার্জিন চুক্তি থাকতে হবে এবং ইকুইটি অনুপাত কমে গেলে শেয়ার বিক্রি করার আগে বিনিয়োগকারীকে লিখিত মার্জিন কল নোটিশ দিয়ে যুক্তিসঙ্গত সময় দেওয়া আইনত বাধ্যতামূলক।'
        },
        {
          q: 'মৃত বিনিয়োগকারীর BO অ্যাকাউন্টের শেয়ার ও ডিভিডেন্ড ওয়ারিশরা কীভাবে পাবেন?',
          a: 'মৃত বিনিয়োগকারীর ওয়ারিশদের প্রথমেই আদালত থেকে BO আইডি, কোম্পানির নাম ও শেয়ারের সংখ্যা উল্লেখ করে সাকসেশন সার্টিফিকেট সংগ্রহ করতে হবে; এরপর মৃত্যু সনদ ও সিডিবিএল ট্রান্সমিশন ফর্ম জমা দিয়ে শেয়ার স্থানান্তর এবং CMSF থেকে অবণ্টিত লভ্যাংশ তোলা যায়।'
        },
        {
          q: 'কোনো ব্রোকারেজ ফার্ম বন্ধ হয়ে গেলে প্রবাসীরা কীভাবে দাবি করবেন?',
          a: 'প্রবাসী বিনিয়োগকারীরা তাদের NITA ব্যাংক অ্যাকাউন্টের রেমিট্যান্স স্টেটমেন্ট এবং CDBL হোল্ডিংস প্রমাণপত্র সংযুক্ত করে DSE বা CSE-র Investor Protection Fund দাবি কমিটির কাছে আবেদন করতে পারবেন এবং প্রয়োজনে দূতাবাসে সত্যায়িত পাওয়ার অব অ্যাটর্নির মাধ্যমে ঢাকায় মামলা করতে পারবেন।'
        }
      ]
    }
  },

  // 5. Building Plan Approval, RAJUK Occupancy Certificate, BNBC 2020 & Fire License Law
  {
    en: {
      slug: 'rajuk-occupancy-certificate-fire-safety-bnbc-law-bangladesh',
      bnSlug: 'rajuk-building-plan-fire-license-bnbc-ain-bangladesh',
      title: 'RAJUK Occupancy Certificate, Fire Safety License & BNBC 2020 Compliance Law (BD)',
      metaTitle: 'RAJUK Occupancy Certificate, BNBC & Fire License BD',
      metaDescription: 'Bangladesh legal rules for RAJUK plan approval, Occupancy Certificate, Fire License & BNBC 2020 safety compliance for Dhaka flats, offices, and factories.',
      category: 'Property Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'rajuk occupancy certificate bangladesh',
        'fire safety license dhaka bangladesh',
        'bnbc 2020 building code compliance',
        'building construction act 1952 bangladesh',
        'flat occupancy certificate utility connection dhaka'
      ],
      heroIntro: 'Buying a flat or leasing commercial office space in Dhaka, Chattogram, or Gazipur without checking statutory building compliance can lead to sudden DESCO, Titas, or WASA utility disconnection, municipal sealing, or denied property insurance. Under the Building Construction Act, 1952, Dhaka Imarat Nirman Bidhimala 2008, Bangladesh National Building Code (BNBC) 2020, and the Fire Prevention and Extinction Act, 2003, developers and building owners carry strict statutory duties.',
      quickAnswer: {
        heading: 'At a Glance: Building Compliance, Occupancy & Fire Law (BD)',
        text: 'Constructing or occupying a multi-storey building in Bangladesh requires both an approved design permit and a post-completion Occupancy Certificate under Building Construction Rules, alongside BNBC 2020 safety compliance and an annual Fire Service License for commercial premises before legally transferring flats or operating offices.',
        points: [
          'Governing Laws: Building Construction Act 1952, Dhaka Imarat Nirman Bidhimala 2008, BNBC 2020 & Fire Prevention Act 2003',
          'Occupancy Certificate: Mandatory before occupying a completed multi-storey building or connecting permanent utilities',
          'Fire Safety NOC & License: Compulsory from Fire Service & Civil Defence for commercial, factory, hospital & high-rise premises',
          'Buyer Protection: Real Estate Development and Management Act 2010 penalizes developers for unauthorized plan deviations'
        ]
      },
      toc: [
        'RAJUK Plan Approval vs. Mandatory Occupancy Certificate',
        'BNBC 2020 Structural, Setback & High-Rise Fire Exit Requirements',
        'Obtaining & Renewing a Fire Safety License Under the 2003 Act',
        'Risks for Flat Buyers, Commercial Tenants & Factory Owners Without Compliance',
        'Challenging Arbitrary Sealing or Utility Disconnection in Bangladesh Courts'
      ],
      sections: [
        {
          h2: 'RAJUK Plan Approval vs. Mandatory Occupancy Certificate',
          content: '<p>Many flat buyers assume that seeing a stamped initial building plan from RAJUK, CDA, KDA, or a Municipality guarantees full legality. In reality, construction compliance involves two separate approvals under the <strong>Dhaka Metropolitan Building (Construction, Development, Protection and Removal) Rules, 2008</strong>:</p><ul><li><strong>Construction Permit (নকশা অনুমোদন):</strong> Grants authority to construct a building strictly matching approved FAR (Floor Area Ratio), setback clearances, parking slots, and height limits.</li><li><strong>Occupancy Certificate (অকুপেন্সি বা ব্যবহার সনদ):</strong> Issued <em>after</em> construction finishes and RAJUK/authority inspectors verify that as-built measurements match the sanctioned plan. Without an Occupancy Certificate, occupying the building is technically unlawful and exposes owners to utility disconnection notices and denial of <a href="/blog/flat-apartment-purchase-legal-checklist-bangladesh">clear apartment title verification</a>.</li></ul>'
        },
        {
          h2: 'BNBC 2020 Structural, Setback & High-Rise Fire Exit Requirements',
          content: '<p>Gazetted into enforceable law, the <strong>Bangladesh National Building Code (BNBC) 2020</strong> sets non-negotiable engineering, structural load, electrical, and life-safety standards supervised by licensed architects, civil structural engineers, and MEP specialists across Dhaka and major urban municipalities:</p><ul><li><strong>Setback & Emergency Access:</strong> Mandatory front, side, and rear open setbacks ensuring fire-tender access and natural ventilation; illegal boundary-to-boundary construction violates BNBC and Building Construction Act Section 3.</li><li><strong>High-Rise Fire Safety (Above 6 Storeys / 20 Meters):</strong> Buildings exceeding threshold heights require enclosed fire-rated staircases, pressurized lobbies, dedicated fire-water storage, sprinklers, automatic smoke detection, and unobstructed emergency exits.</li></ul>'
        },
        {
          h2: 'Obtaining & Renewing a Fire Safety License Under the 2003 Act',
          content: '<p>Under <strong>Section 4 of the Fire Prevention and Extinction Act, 2003</strong>, operating a commercial office, garment factory, restaurant, warehouse, clinic, or storage facility without a valid <strong>Fire License</strong> from the <strong>Bangladesh Fire Service & Civil Defence (FSCD)</strong> is a punishable offense carrying imprisonment, heavy fines, and premises sealing.</p><ol><li><strong>Pre-Construction Fire NOC:</strong> Required for multi-storey and commercial buildings before final RAJUK design clearance, alongside <a href="/blog/environment-clearance-certificate-bangladesh">DoE environmental clearance compliance</a> for factories and red-category projects.</li><li><strong>Annual Fire License & Inspection:</strong> Following installation of certified extinguishers, hydrant risers, and trained fire wardens, FSCD issues a building/business Fire License renewable annually upon inspection.</li></ol>'
        },
        {
          h2: 'Risks for Flat Buyers, Commercial Tenants & Factory Owners Without Compliance',
          content: '<p>Non-compliance creates immediate financial liability for everyone in the chain:</p><ul><li><strong>Flat Buyers & NRB Investors:</strong> Developers who add unauthorized rooftop penthouses or swallow basement parking into commercial shops prevent the entire building from getting an Occupancy Certificate—blocking bank home loans, <a href="/blog/flat-apartment-registration-fee-bangladesh">smooth flat registration</a>, and fire insurance payouts. Verify <a href="/blog/namjari-tracking-status-check-bangladesh-2026">land mutation and khatian title</a> before signing booking deeds.</li><li><strong>Corporate Tenants & Factories:</strong> Landlord non-compliance can invalidate commercial fire insurance policies and trigger sudden BIDA, Trade License, or environmental renewal refusals. Always insert a mandatory landlord warranty of Occupancy Certificate and valid Fire NOC inside <a href="/blog/commercial-lease-agreement-tenant-eviction-bangladesh-premises-rent-act">commercial lease agreements</a>.</li></ul>'
        },
        {
          h2: 'Challenging Arbitrary Sealing or Utility Disconnection in Bangladesh Courts',
          content: '<p>Under <strong>Section 3B of the Building Construction Act, 1952</strong>, RAJUK or the Authorized Officer must serve a formal <strong>Show Cause Notice</strong> giving the owner a statutory opportunity to be heard before sealing premises or demolishing alleged deviations. Proper legal representation during administrative hearings frequently enables building owners to submit corrective structural retrofits, obtain fire-safety regularization, and avoid sudden business closures.</p><p>Where mobile courts or utility agencies act without statutory notice, fail to review regularized revised plans, or target innocent flat buyers, aggrieved owners can seek immediate stay orders via statutory appeal under Section 15 of the Act or a <a href="/blog/rajuk-eviction-illegal-demolition-writ-petition-high-court-bangladesh">High Court Writ Petition against RAJUK action</a>.</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/services/land-lawyer', text: 'Real Estate & RAJUK Compliance Lawyer' },
        { to: '/services/supreme-court-lawyer', text: 'High Court Writ & Stay Orders' },
        { to: '/services/company-corporate-lawyer', text: 'Factory & Commercial Licensing' }
      ],
      faqs: [
        {
          q: 'Is an Occupancy Certificate mandatory before buying a flat in Dhaka?',
          a: 'Yes. Under Dhaka building construction rules, a completed multi-storey building should not be legally occupied or permanently connected to utilities without a post-construction RAJUK Occupancy Certificate verifying that the actual structure complies with the sanctioned plan without unauthorized floors or setback violations.'
        },
        {
          q: 'Can I sue a developer if they built extra floors or blocked my parking space?',
          a: 'Yes. Under the Real Estate Development and Management Act, 2010 and the Specific Relief Act, flat buyers can pursue statutory complaints, arbitration, or civil injunctions against developers who deviate from the sanctioned RAJUK plan, build illegal rooftop units, or usurp allotted garage spaces.'
        },
        {
          q: 'Who needs a Fire Safety License in Bangladesh?',
          a: 'Under Section 4 of the Fire Prevention and Extinction Act, 2003, all factories, warehouses, commercial shopping malls, offices, restaurants, hospitals, schools, and premises storing flammable goods must obtain an annual Fire Safety License from Bangladesh Fire Service and Civil Defence upon physical inspection.'
        },
        {
          q: 'Can DESCO, WASA, or Titas cut utility lines if a building lacks RAJUK approval?',
          a: 'Yes. RAJUK routinely instructs electricity, gas, and water authorities to disconnect utility connections serving unauthorized structures; however, under Section 3B of the Building Construction Act, the enforcing authority must follow due process and issue prior written show-cause notice before coercive demolition or sealing.'
        }
      ]
    },
    bn: {
      slug: 'rajuk-building-plan-fire-license-bnbc-ain-bangladesh',
      enSlug: 'rajuk-occupancy-certificate-fire-safety-bnbc-law-bangladesh',
      title: 'রাজউক নকশা, অকুপেন্সি সনদ, ফায়ার লাইসেন্স ও BNBC ২০২০ ভবন নির্মাণ আইন গাইড',
      metaTitle: 'রাজউক নকশা, অকুপেন্সি সনদ ও ফায়ার লাইসেন্স আইন',
      metaDescription: 'ঢাকা ও বাংলাদেশে ভবন নির্মাণে রাজউক প্ল্যান, বাধ্যতামূলক অকুপেন্সি বা বসবাসের সনদ, BNBC ২০২০ এবং ফায়ার সার্ভিস লাইসেন্স ও গ্যাস-বিদ্যুৎ সংযোগ সুরক্ষা আইন।',
      category: 'সম্পত্তি আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'রাজউক অকুপেন্সি সনদ নিয়ম',
        'ফায়ার সার্ভিস লাইসেন্স বাংলাদেশ',
        'বিএনবিসি ২০২০ ইমারত নির্মাণ আইন',
        'নকশা বহির্ভূত ভবন বিদ্যুৎ সংযোগ বিচ্ছিন্ন',
        'ফ্ল্যাট কেনার আগে রাজউক প্ল্যান যাচাই'
      ],
      heroIntro: 'ঢাকা, চট্টগ্রাম বা জেলা শহরে বহুতল ভবন নির্মাণ, ফ্ল্যাট ক্রয় কিংবা বাণিজ্যিক অফিস-কারখানা ভাড়া নেওয়ার ক্ষেত্রে কেবল প্রাথমিক প্ল্যান পাস দেখাই যথেষ্ট নয়। ইমারত নির্মাণ আইন ১৯৫২, ঢাকা ইমারত নির্মাণ বিধিমালা ২০০৮, বাংলাদেশ ন্যাশনাল বিল্ডিং কোড (BNBC) ২০২০ এবং অগ্নি প্রতিরোধ ও নির্বাপণ আইন ২০০৩ অনুযায়ী অকুপেন্সি সনদ ও ফায়ার লাইসেন্স না থাকলে গ্যাস-বিদ্যুৎ সংযোগ বিচ্ছিন্ন, ভবন সিলগালা এবং ফৌজদারি দণ্ডের ঝুঁকি থাকে।',
      quickAnswer: {
        heading: '⚡ ভবন নির্মাণ, অকুপেন্সি ও ফায়ার আইন — একনজরে মূল বিধান',
        text: 'ঢাকা ও বাংলাদেশে বহুতল ভবন ব্যবহার, গ্যাস-বিদ্যুৎ সংযোগ বা ফ্ল্যাট বিক্রির আগে কেবল প্রাথমিক রাজউক প্ল্যান পাস দেখানো যথেষ্ট নয়; নির্মাণ শেষে বাধ্যতামূলক অকুপেন্সি বা বসবাসের সনদ, BNBC ২০২০ অগ্নি-নিরাপত্তা মানদণ্ড এবং বাণিজ্যিক প্রতিষ্ঠানের জন্য বার্ষিক ফায়ার সার্ভিস লাইসেন্স গ্রহণ আইনত অপরিহার্য।',
        points: [
          'মূল আইন: Building Construction Act 1952, ইমারত নির্মাণ বিধিমালা ২০০৮, BNBC ২০২০ এবং অগ্নি প্রতিরোধ আইন ২০০৩',
          'অকুপেন্সি সনদ (বসবাসের সনদ): ভবন নির্মাণ শেষে রাজউকের চূড়ান্ত যাচাই ও অকুপেন্সি সনদ ছাড়া বসবাস বা বাণিজ্যিক ব্যবহার বেআইনি',
          'ফায়ার লাইসেন্স ও NOC: বাণিজ্যিক ভবন, রেস্তোরাঁ, গুদাম, হাসপাতাল ও কারখানার জন্য ফায়ার সার্ভিসের লাইসেন্স বাধ্যতামূলক',
          'ফ্ল্যাট ক্রেতার সুরক্ষা: ডেভেলপার অনুমোদিত নকশা ভেঙে অতিরিক্ত তলা বা পার্কিং দখল করলে রিয়েল এস্টেট আইন ২০১০-এ মামলাযোগ্য অপরাধ'
        ]
      },
      toc: [
        'রাজউকের নকশা অনুমোদন বনাম বাধ্যতামূলক অকুপেন্সি সনদ',
        'BNBC ২০২০ অনুযায়ী সেটব্যাক, কাঠামোগত নিরাপত্তা ও ফায়ার এক্সিট শর্ত',
        'অগ্নি প্রতিরোধ আইন ২০০৩ অনুযায়ী ফায়ার এনওসি ও লাইসেন্স নবায়ন',
        'প্ল্যান ও লাইসেন্স না থাকলে ফ্ল্যাট ক্রেতা ও ভাড়াটিয়াদের আর্থিক ঝুঁকি',
        'ভবন সিলগালা বা গ্যাস-বিদ্যুৎ সংযোগ বিচ্ছিন্নের বিরুদ্ধে আইনি প্রতিকার'
      ],
      sections: [
        {
          h2: 'রাজউকের নকশা অনুমোদন বনাম বাধ্যতামূলক অকুপেন্সি সনদ',
          content: '<p>অনেক ক্রেতা মনে করেন ডেভেলপারের কাছে রাজউক (RAJUK), সিডিএ বা পৌরসভার অনুমোদিত প্ল্যান থাকলেই সব বৈধ। অথচ <strong>ঢাকা ইমারত নির্মাণ বিধিমালা ২০০৮</strong> অনুযায়ী নির্মাণকাজে দুটি আলাদা ছাড়পত্র লাগে:</p><ul><li><strong>নির্মাণ অনুমোদন (Construction Permit):</strong> অনুমোদিত FAR, চারপাশের সেটব্যাক (ফাঁকা জায়গা), পার্কিং ও উচ্চতা মেনে ভবন গড়ার প্রাথমিক অনুমতি।</li><li><strong>অকুপেন্সি বা ব্যবহার সনদ (Occupancy Certificate):</strong> ভবন নির্মাণ শেষ হওয়ার পর কর্তৃপক্ষ সরেজমিনে পরিদর্শন করে নিশ্চিত হয় যে ভবনটি মূল নকশা মেনেই তৈরি হয়েছে—এরপরই বসবাস বা বাণিজ্যিক ব্যবহারের চূড়ান্ত সনদ দেয়। এটি না থাকলে <a href="/bn/blog/flat-apartment-registration-fee-bangladesh">ফ্ল্যাট হস্তান্তর</a>, ব্যাংক লোন ও ইউটিলিটি সংযোগ স্থায়ী ঝুঁকির মুখে পড়ে। তাই বুকিং দেওয়ার আগেই ভবনের অনুমোদিত আর্কিটেকচারাল নকশা ও সমাপনী সনদ যাচাই করা উচিত।</li></ul>'
        },
        {
          h2: 'BNBC ২০২০ অনুযায়ী সেটব্যাক, কাঠামোগত নিরাপত্তা ও ফায়ার এক্সিট শর্ত',
          content: '<p>গেজেটকৃত আইন হিসেবে কার্যকর <strong>BNBC 2020</strong> অনুসারে প্রতিটি স্থাপনায় নির্ধারিত নিরাপত্তা মান বজায় রাখা বাধ্যতামূলক। নকশা অনুযায়ী স্থাপত্য, কাঠামো ও ইলেক্ট্রো-মেকানিক্যাল প্রকৌশলীদের স্বাক্ষরিত সনদ ছাড়া বহুতল ভবনের ছাড়পত্র পাওয়া যায় না:</p><ul><li><strong>জরুরি সেটব্যাক:</strong> ভবনের সামনে ও পাশে ফায়ার সার্ভিসের গাড়ি ঢোকার ও আলো-বাতাসের নির্ধারিত ফাঁকা জায়গা রাখতে হয়; সীমানা দেয়াল ঘেঁষে অবৈধ বর্ধিতাংশ করলে ইমারত নির্মাণ আইনের ৩ ধারা লঙ্ঘিত হয়।</li><li><strong>বহুতল ভবনের অগ্নি-নিরাপত্তা (৬ তলা বা ২০ মিটারের ওপর):</strong> আবদ্ধ ফায়ার-রেটেড সিঁড়ি, স্মোক ডিটেক্টর, স্বয়ংক্রিয় স্প্রিংকলার, রিজার্ভ ওয়াটার ট্যাংক ও বাধাহীন জরুরি নির্গমন পথ (Emergency Exit) থাকা আইনত বাধ্যতামূলক।</li></ul>'
        },
        {
          h2: 'অগ্নি প্রতিরোধ আইন ২০০৩ অনুযায়ী ফায়ার এনওসি ও লাইসেন্স নবায়ন',
          content: '<p><strong>অগ্নি প্রতিরোধ ও নির্বাপণ আইন, ২০০৩-এর ধারা ৪</strong> অনুযায়ী ফায়ার সার্ভিস ও সিভিল ডিফেন্স (FSCD)-এর বৈধ লাইসেন্স ছাড়া কোনো কারখানা, গুদাম, বাণিজ্যিক ভবন, রেস্তোরাঁ বা হাসপাতাল পরিচালনা করা দণ্ডনীয় অপরাধ (যার শাস্তি কারাদণ্ড, জরিমানা ও প্রতিষ্ঠান সিলগালা)।</p><p>বহুতল ভবনের নকশা পাসের আগেই ফায়ার NOC নেওয়া এবং অগ্নিনির্বাপক যন্ত্র, হোজ রিল ও প্রশিক্ষিত অগ্নিকর্মী নিশ্চিত করে প্রতি বছর পরিদর্শন সাপেক্ষে ফায়ার লাইসেন্স নবায়ন করা বাধ্যতামূলক, যার পাশাপাশি শিল্প প্রকল্পে <a href="/bn/blog/poribesh-chharpatra-ecc-doe-notice-factory-bondho-tribunal-2026-bn">পরিবেশ ছাড়পত্র (ECC) নবায়ন</a> জরুরি।</p>'
        },
        {
          h2: 'প্ল্যান ও লাইসেন্স না থাকলে ফ্ল্যাট ক্রেতা ও ভাড়াটিয়াদের আর্থিক ঝুঁকি',
          content: '<p>ভবন মালিক বা ডেভেলপার নকশা ভাঙলে এর ভুক্তভোগী হন সাধারণ ক্রেতা ও ব্যবসায়ী:</p><ul><li><strong>ফ্ল্যাট ক্রেতাদের ক্ষতি:</strong> ডেভেলপার ছাদে অবৈধ তলা তুললে বা পার্কিং বিক্রি করলে পুরো ভবনের অকুপেন্সি সনদ আটকে যায়, ফলে ক্রেতারা ব্যাংক হোম লোন ও বিমা দাবি পান না। ফ্ল্যাট কেনার আগেই <a href="/bn/blog/flat-namjari-mutation-acland-niyom-2026-bn">ফ্ল্যাট নামজারি ও খতিয়ান</a> এবং অনুমোদিত নকশার মূল কপি যাচাই করে নিন।</li><li><strong>বাণিজ্যিক ভাড়াটিয়া ও শিল্প প্রতিষ্ঠান:</strong> ভবনের অকুপেন্সি সনদ ও ফায়ার লাইসেন্স না থাকলে ট্রেড লাইসেন্স নবায়ন, বিডা অনুমোদন ও ফায়ার ইন্স্যুরেন্স বাতিল হয়ে যায়; তাই <a href="/bn/blog/varatia-ucched-dokan-basa-106-dhara-legal-notice-2026-bn">বাণিজ্যিক ও দোকান ভাড়া চুক্তিতে</a> এগুলোর নিশ্চয়তা শর্ত হিসেবে রাখা উচিত।</li></ul>'
        },
        {
          h2: 'ভবন সিলগালা বা গ্যাস-বিদ্যুৎ সংযোগ বিচ্ছিন্নের বিরুদ্ধে আইনি প্রতিকার',
          content: '<p><strong>ইমারত নির্মাণ আইন ১৯৫২-এর ধারা ৩খ</strong> অনুযায়ী কোনো ভবন সিলগালা বা ভাঙার আগে অথরাইজড অফিসারকে অবশ্যই লিখিত <strong>কারণ দর্শানো নোটিশ (Show Cause Notice)</strong> দিয়ে শুনানির সুযোগ দিতে হয়। শুনানিতে সংশোধিত নকশা বা অগ্নি-নিরাপত্তা ব্যবস্থা গ্রহণের সুযোগ চাইলে অনেক সময় জরিমানা বা ভাঙচুর এড়ানো সম্ভব হয়।</p><p>আইনি নোটিশ ছাড়া হঠাৎ উচ্ছেদ, সংশোধিত নকশা বিবেচনা না করা বা নিরীহ ফ্ল্যাট ক্রেতাদের হয়রানি করলে আইনের ধারা ১৫ অনুযায়ী আপিল অথবা <a href="/bn/blog/rajuk-plan-setback-oboidho-nirman-nishedhagya-ain-2026-bn">রাজউক ও হাইকোর্টে স্থগিতাদেশের প্রতিকার</a> চাওয়া যায় এবং <a href="/bn/blog/writ-petition-haikort-dhap-khoroch-2026">হাইকোর্ট রিট পিটিশনের</a> মাধ্যমে মৌলিক অধিকার রক্ষা করা সম্ভব।</p>'
        }
      ],
      relatedServiceLinks: [
        { to: '/bn/services/land-lawyer', text: 'জমি ও ফ্ল্যাট আইনজীবী (রাজউক)' },
        { to: '/bn/services/supreme-court-lawyer', text: 'হাইকোর্ট রিট ও স্থগিতাদেশ' },
        { to: '/bn/services/company-corporate-lawyer', text: 'কারখানা ও বাণিজ্যিক লাইসেন্স' }
      ],
      faqs: [
        {
          q: 'ঢাকায় ফ্ল্যাট কেনার আগে কি অকুপেন্সি সনদ (Occupancy Certificate) দেখা জরুরি?',
          a: 'হ্যাঁ। ঢাকা ইমারত নির্মাণ বিধিমালা অনুযায়ী একটি বহুতল ভবন নির্মাণের পর সেটি অনুমোদিত নকশা মেনে তৈরি হয়েছে কি না তা যাচাই করে রাজউক অকুপেন্সি সনদ দেয়; এই সনদ ছাড়া বসবাস বা গ্যাস-বিদ্যুৎ সংযোগ স্থায়ী আইনি ঝুঁকিতে থাকে।'
        },
        {
          q: 'ডেভেলপার নকশার বাইরে অতিরিক্ত তলা বা পার্কিং দখল করলে ক্রেতার প্রতিকার কী?',
          a: 'রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন ২০১০ এবং সুনির্দিষ্ট প্রতিকার আইনের অধীনে ভুক্তভোগী ফ্ল্যাট ক্রেতারা রাজউকে লিখিত অভিযোগ, সালিশ এবং দেওয়ানি আদালতে স্থায়ী নিষেধাজ্ঞার মামলা দায়ের করে নকশা-বহির্ভূত নির্মাণ বন্ধ, পার্কিং পুনরুদ্ধার ও আর্থিক ক্ষতিপূরণ দাবি করতে পারেন।'
        },
        {
          q: 'বাংলাদেশে কাদের জন্য ফায়ার সার্ভিস লাইসেন্স নেওয়া বাধ্যতামূলক?',
          a: 'অগ্নি প্রতিরোধ ও নির্বাপণ আইন ২০০৩ অনুযায়ী দেশের সব কারখানা, গুদাম, বাণিজ্যিক মার্কেট, অফিস ভবন, রেস্তোরাঁ, হাসপাতাল, শিক্ষাপ্রতিষ্ঠান ও দাহ্য পদার্থ সংরক্ষণকারী প্রতিষ্ঠানের জন্য ফায়ার সার্ভিস থেকে বার্ষিক ফায়ার লাইসেন্স নেওয়া ও নবায়ন করা বাধ্যতামূলক।'
        },
        {
          q: 'নকশা বহির্ভূত হলে ডেসকো, ওয়াসা বা তিতাস কি গ্যাস-বিদ্যুৎ লাইন কাটতে পারে?',
          a: 'হ্যাঁ, অনুমোদনহীন বা নকশা-বহির্ভূত ভবনের ক্ষেত্রে রাজউকের নির্দেশে বিদ্যুৎ, গ্যাস ও পানি সরবরাহকারী সংস্থা সংযোগ বিচ্ছিন্ন করতে পারে; তবে ইমারত নির্মাণ আইন ১৯৫২-এর ধারা ৩খ অনুযায়ী কর্তৃপক্ষকে আগে লিখিত কারণ দর্শানো নোটিশ ও শুনানির সুযোগ দিতে হয়।'
        }
      ]
    }
  }
];

let written = 0;
for (const pair of pairs) {
  for (const [dir, data] of [[EN_DIR, pair.en], [BN_DIR, pair.bn]]) {
    if (!data.metaTitle || data.metaTitle.length > 58) {
      throw new Error(`metaTitle > 58 or empty for ${data.slug}: (${data.metaTitle?.length}) ${data.metaTitle}`);
    }
    const target = path.join(dir, `${data.slug}.json`);
    fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✅ Written: ${path.relative(ROOT, target)} (metaTitle=${data.metaTitle.length}ch, metaDesc=${data.metaDescription.length}ch)`);
    written++;
  }
}

console.log(`\n🎉 Successfully generated ${written} posts (${pairs.length} EN + ${pairs.length} BN) dated ${TODAY} (BD).`);
