import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const svgPath = join(__dirname, '../public/icons/9hBGq301.svg');
const outputDir = join(__dirname, '../public/icons');

async function generateIcons() {
  for (const size of sizes) {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(join(outputDir, `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }
  console.log('All icons generated!');
}

generateIcons().catch(console.error);
