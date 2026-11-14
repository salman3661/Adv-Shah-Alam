import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const SHOTS_DIR = path.join(process.cwd(), 'baseline', 'shots');
fs.mkdirSync(SHOTS_DIR, { recursive: true });

const templates = [
  { name: 'home-bn', url: 'https://www.advmdshahalam.me/' },
  { name: 'home-en', url: 'https://www.advmdshahalam.me/en' },
  { name: 'service-en', url: 'https://www.advmdshahalam.me/services/criminal-lawyer' },
  { name: 'service-bn', url: 'https://www.advmdshahalam.me/bn/services/criminal-lawyer' },
  { name: 'blog-index-en', url: 'https://www.advmdshahalam.me/blog' },
  { name: 'blog-index-bn', url: 'https://www.advmdshahalam.me/bn/blog' },
  { name: 'blog-post-en', url: 'https://www.advmdshahalam.me/blog/anticipatory-bail-bangladesh' },
  { name: 'blog-post-bn', url: 'https://www.advmdshahalam.me/bn/blog/jamin-ki-koto-prokar-kivabe-paben' },
  { name: 'contact-en', url: 'https://www.advmdshahalam.me/contact' },
  { name: 'contact-bn', url: 'https://www.advmdshahalam.me/bn/contact' },
  { name: 'advocate-bio', url: 'https://www.advmdshahalam.me/advocate-md-shah-alam' },
  { name: 'review', url: 'https://www.advmdshahalam.me/review' },
  { name: 'education', url: 'https://www.advmdshahalam.me/education' },
  { name: 'privacy-policy', url: 'https://www.advmdshahalam.me/privacy-policy' },
  { name: 'terms-of-service', url: 'https://www.advmdshahalam.me/terms-of-service' },
  { name: 'nrb-legal-help', url: 'https://www.advmdshahalam.me/nrb-legal-help' },
  { name: '404-soft', url: 'https://www.advmdshahalam.me/non-existent-route-baseline-check' }
];

const viewports = [
  { label: '390px', width: 390, height: 844 },
  { label: '1366px', width: 1366, height: 900 }
];

async function captureShot(t, vp) {
  const outFile = path.join(SHOTS_DIR, `${t.name}-${vp.label}.png`);
  await execFileAsync('/usr/bin/chromium', [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--ignore-certificate-errors',
    '--hide-scrollbars',
    `--window-size=${vp.width},${vp.height}`,
    `--screenshot=${outFile}`,
    t.url
  ], { timeout: 30000 });
  const stat = fs.statSync(outFile);
  console.log(`Captured ${path.basename(outFile)} (${(stat.size / 1024).toFixed(1)} KB)`);
}

async function main() {
  const tasks = [];
  for (const t of templates) {
    for (const vp of viewports) {
      tasks.push({ t, vp });
    }
  }

  const CONCURRENCY = 4;
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const current = tasks[idx++];
      try {
        await captureShot(current.t, current.vp);
      } catch (e) {
        console.error(`Failed ${current.t.name}-${current.vp.label}:`, e.message);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log(`Completed all ${tasks.length} baseline screenshots.`);
}

main();
