const fs = require('fs');

const enUpdates = [
    {
        slug: 'hire-criminal-lawyer-bangladesh',
        metaTitle: 'Need Urgent Help? Top Criminal Lawyer in Dhaka',
        metaDescription: 'Facing legal trouble in Dhaka? Hire an experienced criminal lawyer in Uttara today for bail, fraud, or defense. Fast, confidential legal solutions.'
    },
    {
        slug: 'company-registration-cost-bangladesh',
        metaTitle: 'Affordable Company Registration Lawyer Dhaka',
        metaDescription: 'Start your business fast! Contact our corporate lawyer in Uttara, Dhaka for a quick, hassle-free company registration and RJSC filing today.'
    },
    {
        slug: 'writ-petition-high-court-guide-bangladesh',
        metaTitle: 'High Court Writ Petition Expert in Dhaka',
        metaDescription: 'Rights violated? Get immediate legal solutions with our Supreme Court lawyer in Dhaka. File your writ petition fast with Advocate Md. Shah Alam.'
    },
    {
        slug: 'how-to-file-divorce-petition-bangladesh',
        metaTitle: 'File Divorce Fast: Top Family Lawyer in Dhaka',
        metaDescription: 'Thinking of divorce? Get discreet, fast, and urgent legal help from our experienced family lawyer in Uttara, Dhaka. Settle your disputes smoothly.'
    },
    {
        slug: 'land-registration-fees-process-bangladesh',
        metaTitle: 'Secure Land Registration Lawyer in Uttara, Dhaka',
        metaDescription: "Don't lose your property! Get expert legal solutions for land registration, vetting, and mutation from a trusted civil lawyer in Dhaka. Call now!"
    }
];

const bnUpdates = [
    {
        slug: 'criminal-lawyer-kivabe-neben-bangladesh',
        metaTitle: 'জরুরি ফৌজদারি আইনজীবী উত্তরা, ঢাকা (Criminal)',
        metaDescription: 'মামলা বা গ্রেফতারে আতঙ্কিত? দ্রুত জামিন ও আইনি সমাধানের জন্য ঢাকার উত্তরায় নির্ভরযোগ্য ক্রিমিনাল আইনজীবীর সাথে আজই যোগাযোগ করুন।'
    },
    {
        slug: 'jamin-khoroch-bangladesh',
        metaTitle: 'দ্রুত জামিন (Bail) পেতে উকিল ঢাকা | Urgent Help',
        metaDescription: 'প্রিয়জনের জামিন নিয়ে চিন্তিত? ঢাকার উত্তরায় আমাদের অভিজ্ঞ আইনজীবীর মাধ্যমে দ্রুত জামিন ও আইনি সমাধান নিশ্চিত করুন। এখনই কল করুন!'
    },
    {
        slug: 'mittha-mamla-kharej-bangladesh',
        metaTitle: 'মিথ্যা মামলা বাতিল (Quash) | হাইকোর্ট আইনজীবী',
        metaDescription: 'মিথ্যা মামলার হয়রানি? সুপ্রিম কোর্টের অভিজ্ঞ আইনজীবীর মাধ্যমে হাইকোর্টে ৫৬১এ ধারায় মামলা বাতিল (Quash) করুন। ঢাকার উত্তরায় আইনি সমাধান।'
    },
    {
        slug: 'divorce-mamla-dakhil-bangladesh',
        metaTitle: 'দ্রুত ডিভোর্স ও আইনি সমাধান | ফ্যামিলি উকিল ঢাকা',
        metaDescription: 'পারিবারিক কলহে অতিষ্ঠ? আইনিভাবে দ্রুত ডিভোর্স বা তালাকের জন্য ঢাকার উত্তরায় আমাদের অভিজ্ঞ পারিবারিক আইনজীবীর পরামর্শ নিন। গোপনীয়তা শতভাগ।'
    },
    {
        slug: 'police-abiyog-hoirani-bangladesh',
        metaTitle: 'থানায় জিডি বা FIR দায়ের | আইনি সহায়তা ঢাকা',
        metaDescription: 'হয়রানি বা হুমকির শিকার? উত্তরায় আমাদের আইনজীবীর মাধ্যমে থানায় সহজে জিডি বা এফআইআর (FIR) দায়ের করুন। দ্রুত আইনি সুরক্ষার জন্য কল করুন।'
    },
    {
        slug: 'cyber-crime-lawyer-neben-bangladesh',
        metaTitle: 'সাইবার ক্রাইম আইনজীবী ঢাকা | Urgent DSA Help',
        metaDescription: 'ডিজিটাল হয়রানি বা হ্যাকিংয়ের শিকার? সাইবার ট্রাইব্যুনালে দ্রুত আইনি পদক্ষেপ ও সুরক্ষার জন্য ঢাকার উত্তরায় আমাদের আইনজীবীকে কল করুন।'
    },
    {
        slug: 'jomi-nibondhon-fees-prokriya-bangladesh',
        metaTitle: 'জমি রেজিস্ট্রেশন উকিল উত্তরা | Land Lawyer Dhaka',
        metaDescription: 'জমির মালিকানা নিয়ে প্রতারিত হওয়ার ভয়? সাব-রেজিস্ট্রার অফিসে জমি রেজিস্ট্রেশন ও আইনি সমাধানের জন্য ঢাকার বিশ্বস্ত ভূমি আইনজীবীর পরামর্শ নিন।'
    },
    {
        slug: 'uttaradhikar-certificate-bangladesh',
        metaTitle: 'সাকসেশন (উত্তরাধিকার) সার্টিফিকেট | সিভিল উকিল',
        metaDescription: 'ব্যাংকে আটকে থাকা আত্মীয়ের টাকা তুলতে উত্তরাধিকার সার্টিফিকেট (Succession) লাগবে? ঢাকার উত্তরায় আমাদের দেওয়ানি আইনজীবীর মাধ্যমে দ্রুত সনদ পান।'
    },
    {
        slug: 'bhara-tikki-bibad-bangladesh',
        metaTitle: 'বাড়িওয়ালা-ভাড়াটিয়া বিরোধ সমাধান | উকিল ঢাকা',
        metaDescription: 'বেআইনি উচ্ছেদ বা ভাড়াটিয়া নিয়ে সমস্যা? বাড়িভাড়া নিয়ন্ত্রণ আইনে কার্যকরী আইনি সমাধানের জন্য ঢাকার সিভিল আইনজীবীর সাথে যোগাযোগ করুন।'
    },
    {
        slug: 'gharelu-nirjaton-aini-suraksha-bangladesh',
        metaTitle: 'পারিবারিক নির্যাতন আইনি সুরক্ষা | ফ্যামিলি উকিল',
        metaDescription: 'গার্হস্থ্য নির্যাতনের শিকার? ভয় পাবেন না। দ্রুত আদালতের সুরক্ষা আদেশ ও আইনি প্রতিকারের জন্য ঢাকার উত্তরায় আমাদের ফ্যামিলি ল ইয়ারকে কল করুন।'
    }
];

function updateFile(filePath, updates) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    updates.forEach(u => {
        let targetSlugMatch = new RegExp(`slug:\\s*['"]${u.slug}['"]`);
        let slugIndex = content.search(targetSlugMatch);
        if (slugIndex === -1) {
            console.error(`Slug ${u.slug} not found!`);
            return;
        }

        let chunkEnd = content.indexOf('},', slugIndex);
        if (chunkEnd === -1) chunkEnd = content.indexOf('}', slugIndex);

        let chunk = content.substring(slugIndex, chunkEnd);

        // Escape single quotes for putting them into strings safely
        const safeTitle = u.metaTitle.replace(/'/g, "\\'");
        const safeDesc = u.metaDescription.replace(/'/g, "\\'");
        
        chunk = chunk.replace(/(metaTitle:\s*['"])(.*?)(['"])/, `$1${safeTitle}$3`);
        chunk = chunk.replace(/(metaDescription:\s*['"])(.*?)(['"])/, `$1${safeDesc}$3`);

        content = content.substring(0, slugIndex) + chunk + content.substring(chunkEnd);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

updateFile('./src/data/blogPosts.js', enUpdates);
updateFile('./src/data/blogPostsBn.js', bnUpdates);

const { execSync } = require('child_process');
// Quick syntax check
try {
    const enPosts = require('./src/data/blogPosts.js');
    const bnPosts = require('./src/data/blogPostsBn.js');
    console.log("Validation: Syntax is structurally valid.");
    
    // Check titles for exact deduplication mapping
    const seenTitles = new Set();
    let hasDups = false;
    enPosts.default.concat(bnPosts.default).forEach(p => {
        if (seenTitles.has(p.metaTitle)) {
            console.error("Duplicate Title found:", p.metaTitle);
            hasDups = true;
        }
        seenTitles.add(p.metaTitle);
    });
    if (!hasDups) {
        console.log("Validation: No duplicate titles found.");
    }
} catch (e) {
    console.error("Syntax Validation failed:", e);
    process.exit(1);
}
