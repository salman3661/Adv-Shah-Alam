const fs = require('fs');

/**
 * We map sentences to append inside the first paragraph (or replacing the first `</p>`)
 * for each blog post.
 */
const enInjections = {
    'hire-criminal-lawyer-bangladesh': [
        ' Understanding <a href="/blog/company-registration-cost-bangladesh" style="color:var(--accent); font-weight:500;">corporate legal compliance for business owners</a> is also critical.',
        ' In some situations, <a href="/blog/writ-petition-high-court-guide-bangladesh" style="color:var(--accent); font-weight:500;">quashing criminal proceedings via writ</a> can provide immediate relief.',
        ' This is especially relevant when <a href="/blog/how-to-file-divorce-petition-bangladesh" style="color:var(--accent); font-weight:500;">defending against false dowry cases</a> in family disputes.'
    ],
    'company-registration-cost-bangladesh': [
        ' Failing to comply may result in <a href="/blog/hire-criminal-lawyer-bangladesh" style="color:var(--accent); font-weight:500;">criminal liability in corporate fraud</a>.',
        ' Additionally, if you are <a href="/blog/land-registration-fees-process-bangladesh" style="color:var(--accent); font-weight:500;">acquiring commercial land for your startup</a>, ensure proper vetting.'
    ],
    'writ-petition-high-court-guide-bangladesh': [
        ' Before proceeding, <a href="/blog/hire-criminal-lawyer-bangladesh" style="color:var(--accent); font-weight:500;">consulting a criminal defense advocate</a> is highly recommended.'
    ],
    'how-to-file-divorce-petition-bangladesh': [
        ' You should also consider the rules for <a href="/blog/land-registration-fees-process-bangladesh" style="color:var(--accent); font-weight:500;">transferring property ownership legally</a> if joint assets exist.'
    ],
    'land-registration-fees-process-bangladesh': [
        ' This applies whether you are an individual or <a href="/blog/company-registration-cost-bangladesh" style="color:var(--accent); font-weight:500;">registering a real estate company structure</a>.',
        ' It is also crucial when <a href="/blog/how-to-file-divorce-petition-bangladesh" style="color:var(--accent); font-weight:500;">dividing joint property after marriage dissolution</a>.',
        ' For major disputes, <a href="/blog/writ-petition-high-court-guide-bangladesh" style="color:var(--accent); font-weight:500;">challenging illegal land acquisition in court</a> might be necessary.'
    ]
};

const bnInjections = {
    'criminal-lawyer-kivabe-neben-bangladesh': [
        ' এছাড়া <a href="/bn/blog/jamin-khoroch-bangladesh" style="color:var(--accent); font-weight:500;">আদালতে জামিন ফি ও বন্ড</a> সম্পর্কে পূর্বধারণা রাখা জরুরি।',
        ' সঠিক পদক্ষেপের মাধ্যমে <a href="/bn/blog/mittha-mamla-kharej-bangladesh" style="color:var(--accent); font-weight:500;">মিথ্যা অভিযোগ থেকে আইনি অব্যাহতি</a> পাওয়া সম্ভব।'
    ],
    'jamin-khoroch-bangladesh': [
        ' জটিল মামলায় <a href="/bn/blog/criminal-lawyer-kivabe-neben-bangladesh" style="color:var(--accent); font-weight:500;">অভিজ্ঞ ক্রিমিনাল উকিলের পরামর্শ</a> নেওয়া সবচেয়ে বেশি দরকার।'
    ],
    'mittha-mamla-kharej-bangladesh': [
        ' এ বিষয়ে <a href="/bn/blog/criminal-lawyer-kivabe-neben-bangladesh" style="color:var(--accent); font-weight:500;">ফৌজদারি মামলা পরিচালনার দক্ষতা</a> সবচেয়ে বেশি ভূমিকা রাখে।',
        ' বিশেষত <a href="/bn/blog/cyber-crime-lawyer-neben-bangladesh" style="color:var(--accent); font-weight:500;">ডিজিটাল নিরাপত্তা আইনের মিথ্যা হয়রানি প্রতিকার</a> এর ক্ষেত্রে এটি প্রযোজ্য।'
    ],
    'divorce-mamla-dakhil-bangladesh': [
        ' পরবর্তীতে <a href="/bn/blog/uttaradhikar-certificate-bangladesh" style="color:var(--accent); font-weight:500;">মৃত স্বামীর ব্যাংক অ্যাকাউন্ট থেকে মোহরানা তোলা</a> বা অন্যান্য আর্থিক বিষয়গুলোও সুরাহা করতে হতে পারে।',
        ' প্রায়শই দেখা যায় <a href="/bn/blog/gharelu-nirjaton-aini-suraksha-bangladesh" style="color:var(--accent); font-weight:500;">শারীরিক ও মানসিক নির্যাতনের কারণে তালাক</a> বা বিচ্ছেদের সিদ্ধান্ত নিতে হয়।'
    ],
    'police-abiyog-hoirani-bangladesh': [
        ' এর পাশাপাশি <a href="/bn/blog/jamin-khoroch-bangladesh" style="color:var(--accent); font-weight:500;">গ্রেফতারের পর দ্রুত জামিনের ব্যবস্থা</a> করাও আইনজীবীর দায়িত্ব।',
        ' যদি ঘটনা ইন্টারনেটে হয়, তবে <a href="/bn/blog/cyber-crime-lawyer-neben-bangladesh" style="color:var(--accent); font-weight:500;">ফেসবুক হ্যাকিং বা ব্ল্যাকমেইলের বিরুদ্ধে জিডি</a> করা অত্যাবশ্যক।',
        ' এছাড়া <a href="/bn/blog/bhara-tikki-bibad-bangladesh" style="color:var(--accent); font-weight:500;">বেআইনি উচ্ছেদের হুমকির বিরুদ্ধে জিডি</a> করতেও একই নিয়ম প্রযোজ্য।'
    ],
    'cyber-crime-lawyer-neben-bangladesh': [
        ' সঠিক প্রমাণ থাকলে <a href="/bn/blog/mittha-mamla-kharej-bangladesh" style="color:var(--accent); font-weight:500;">ভিত্তিহীন সাইবার মামলা খারিজ</a> করা সহজ হয়।',
        ' প্রাথমিক সুরক্ষার জন্য <a href="/bn/blog/police-abiyog-hoirani-bangladesh" style="color:var(--accent); font-weight:500;">অনলাইন হুমকির বিরুদ্ধে থানায় অভিযোগ</a> করা উচিত।'
    ],
    'jomi-nibondhon-fees-prokriya-bangladesh': [
        ' বিশেষ করে <a href="/bn/blog/uttaradhikar-certificate-bangladesh" style="color:var(--accent); font-weight:500;">পৈতৃক সম্পত্তি হস্তান্তরের আইনি প্রক্রিয়া</a> সম্পাদনে এটি অনেক কাজে দেয়।',
        ' এছাড়া <a href="/bn/blog/bhara-tikki-bibad-bangladesh" style="color:var(--accent); font-weight:500;">বাণিজ্যিক স্পেস ভাড়ার চুক্তিপত্র প্রস্তুত</a> করার ক্ষেত্রেও আইনের সঠিক প্রয়োগ জরুরি।'
    ],
    'uttaradhikar-certificate-bangladesh': [
        ' এর সাথে সম্পর্কযুক্ত আরেকটি বিষয় হলো <a href="/bn/blog/divorce-mamla-dakhil-bangladesh" style="color:var(--accent); font-weight:500;">ডিভোর্সের পর উত্তরাধিকার ও মোহরানা আদায়</a>।',
        ' পরবর্তীতে <a href="/bn/blog/jomi-nibondhon-fees-prokriya-bangladesh" style="color:var(--accent); font-weight:500;">উত্তরাধিকার সূত্রে পাওয়া জমির নামজারি</a> করতেও এই সার্টিফিকেট প্রয়োজন হয়।'
    ],
    'bhara-tikki-bibad-bangladesh': [
        ' অনেক সময় নতুন <a href="/bn/blog/jomi-nibondhon-fees-prokriya-bangladesh" style="color:var(--accent); font-weight:500;">সম্পত্তি কিনে বাড়িভাড়া চুক্তির নিয়ম</a> সম্পর্কে જાણা অপরিহার্য হয়ে পড়ে।'
    ],
    'gharelu-nirjaton-aini-suraksha-bangladesh': [
        ' চরম পর্যায়ে <a href="/bn/blog/divorce-mamla-dakhil-bangladesh" style="color:var(--accent); font-weight:500;">পারিবারিক নির্যাতনের পর বিবাহ বিচ্ছেদের আবেদন</a> করতে হতে পারে।',
        ' তবে প্রাথমিক সুরক্ষার জন্য <a href="/bn/blog/police-abiyog-hoirani-bangladesh" style="color:var(--accent); font-weight:500;">পারিবারিক নির্যাতনের বিরুদ্ধে থানায় এফআইআর</a> করা বুদ্ধিমানের কাজ।'
    ]
};

function injectLinks(filePath, injectionMap) {
    let content = fs.readFileSync(filePath, 'utf8');

    for (const [slug, linksToAppend] of Object.entries(injectionMap)) {
        // Find the block for this slug
        const slugPattern = new RegExp(`slug:\\s*['"]${slug}['"]`);
        let startIdx = content.search(slugPattern);
        if (startIdx === -1) {
            console.error(`Slug not found: ${slug}`);
            continue;
        }

        // Find the sections array within this post (usually a bit further down)
        let sectionsIdx = content.indexOf('sections:', startIdx);
        if (sectionsIdx === -1) continue;

        // Find the very first '</p>' tag inside the sections array
        let firstPClosedIdx = content.indexOf('</p>', sectionsIdx);
        if (firstPClosedIdx === -1) continue;
        
        // Ensure this </p> belongs to the current post chunk!
        let endOfObjectIdx = content.indexOf('}, {', startIdx);
        if (endOfObjectIdx === -1) endOfObjectIdx = content.indexOf('};', startIdx);
        
        if (firstPClosedIdx > endOfObjectIdx) {
            // </p> is not in this post? weird, skip
            continue;
        }

        // We will inject the combined sentences right before the </p>
        let injectionText = linksToAppend.join('');
        
        content = 
            content.substring(0, firstPClosedIdx) + 
            injectionText + 
            content.substring(firstPClosedIdx);
            
        console.log(`Injected ${linksToAppend.length} link(s) into ${slug}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

injectLinks('./src/data/blogPosts.js', enInjections);
injectLinks('./src/data/blogPostsBn.js', bnInjections);
console.log("Successfully injected all internal contextual links.");

