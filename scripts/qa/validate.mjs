#!/usr/bin/env node
import fs from 'node:fs';

const file = process.argv[2];
const lang = process.argv[3] || 'en';
if (!file) {
  console.error('Usage: node scripts/qa/validate.mjs <post.json> [en|bn]');
  process.exit(1);
}

const d = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const strip = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const wc = (s) => strip(s).split(/\s+/).filter(Boolean).length;

if (!d.title || d.title.length > 58 || d.title.length < 25) errors.push(`Title length ${d.title?.length} out of 25..58`);
if (!d.metaDescription || d.metaDescription.length < 130 || d.metaDescription.length > 165) errors.push(`Meta description length ${d.metaDescription?.length} out of 130..165`);
if (!d.slug || !/^[a-z0-9-]+$/.test(d.slug)) errors.push(`Invalid slug: ${d.slug}`);

const bodyHtml = (d.sections || []).map((s) => `${s.h2 || ''} ${s.content || ''}`).join(' ');
const totalWords = wc(d.heroIntro) + wc((d.quickAnswer?.points || []).join(' ')) + wc(bodyHtml) + wc((d.faqs || []).map((f) => `${f.question} ${f.answer}`).join(' '));
const minWords = lang === 'bn' ? 700 : 900;
if (totalWords < minWords) errors.push(`Word count ${totalWords} < ${minWords}`);

const statuteRegex = lang === 'bn'
  ? /(ধারা|আইন|অধ্যাদেশ|বিধি|CrPC|CPC|Penal Code|Act)/i
  : /(Section|Article|Order|Rule|Act,?\s*\d{4}|Ordinance)/i;
if (!statuteRegex.test(bodyHtml)) errors.push('Missing statute/section citation');

const links = [...bodyHtml.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
if (links.length < 8) errors.push(`Internal links ${links.length} < 8`);
if ((d.faqs || []).length < 5) errors.push(`FAQs ${(d.faqs || []).length} < 5`);

console.log({ slug: d.slug, lang, totalWords, links: links.length, faqs: (d.faqs || []).length, errors });
if (errors.length) process.exit(1);
