import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const SRC = resolve('public/images/Chambers Photos');
const DEST = resolve('public/images/chambers');

if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const files = [
  { src: 'Adv Md. Shah Alam.jpg',                     out: 'adv-shah-alam-photo.webp',  w: 800 },
  { src: 'Front Perspective of the Chamber Uttara.jpg', out: 'chamber-front.webp',        w: 1200 },
  { src: 'Left Side Angle of the Chamber Uttara.jpg',   out: 'chamber-left.webp',         w: 1200 },
  { src: 'Rear Side Angle of the Chamber Uttara.jpg',   out: 'chamber-rear.webp',         w: 1200 },
];

for (const f of files) {
  const srcPath  = `${SRC}/${f.src}`;
  const destPath = `${DEST}/${f.out}`;
  const info = await sharp(srcPath)
    .resize({ width: f.w, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(destPath);
  console.log(`✓ ${f.out} — ${(info.size / 1024).toFixed(0)}KB`);
}
console.log('Done!');
