const fs = require('fs');
const path = './src/data/blogPostsBn.js';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
    { from: 'வழக்கமாக', to: 'সাধারণত' },
    { from: 'সাহা্য্য', to: 'সাহায্য' },
    { from: 'ক্যাশ বা খারিজ', to: 'কোয়াশ (Quash) বা বাতিল' },
    { from: 'কার্যপম্পাদন', to: 'কার্যসম্পাদন' },
    { from: 'নিষিধাজ্ঞা', to: 'নিষেধাজ্ঞা' },
    { from: 'বাড়িভাড়া আইন ১৯৯১', to: 'বাড়িভাড়া নিয়ন্ত্রণ আইন ১৯৯১' },
    { from: 'কর আইন অনুশীলনে এনবিআর ও কর আপিল ট্রাইব্যুনালে টিডিএস বিরোধে প্রতিনিধিত্বের', to: 'এনবিআর ও কর আপিল ট্রাইব্যুনালে টিডিএস বিরোধে আইনি প্রতিনিধিত্ব করার' }
];

let updatedContent = content;
replacements.forEach(r => {
    updatedContent = updatedContent.replace(r.from, r.to);
});

fs.writeFileSync(path, updatedContent, 'utf8');

console.log("Applied the following fixes:");
replacements.forEach(r => console.log(`- '${r.from}' -> '${r.to}'`));
