import sharp from 'sharp';
import { readFileSync } from 'fs';

const svgBuffer = readFileSync('./public/images/favicons/notebook-icon.svg');

const sizes = [
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
];

async function generateFavicons() {
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/images/favicons/${name}`);
    console.log(`✓ Generated ${name}`);
  }

  // Also generate favicon.ico from 32x32
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile('./public/favicon.ico');
  console.log('✓ Generated favicon.ico');
}

generateFavicons().catch(console.error);
