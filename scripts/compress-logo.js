const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeLogos() {
  const publicDir = path.join(__dirname, '../public');
  const logoPng = path.join(publicDir, 'logo.png');
  const logoWebp = path.join(publicDir, 'logo.webp');
  const faviconSvg = path.join(publicDir, 'favicon.svg');
  const faviconPng = path.join(publicDir, 'favicon.png');
  const faviconIco = path.join(publicDir, 'favicon.ico');

  const inputBuffer = fs.readFileSync(logoPng);

  // 1. Highly optimized 256x256 PNG for logo (< 40 KB instead of 786 KB)
  await sharp(inputBuffer)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 80, compressionLevel: 9, effort: 10 })
    .toFile(logoPng);

  // 2. Ultra-fast WebP version (< 15 KB)
  await sharp(inputBuffer)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, effort: 6 })
    .toFile(logoWebp);

  // 3. Crisp Favicon PNG 64x64 (< 6 KB)
  await sharp(inputBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(faviconPng);

  // 4. Favicon ICO 32x32 (< 3 KB)
  await sharp(inputBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 75 })
    .toFile(faviconIco);

  // 5. Lightweight SVG (embed 64px image base64, so it's ~4 KB instead of 1 MB)
  const small64Buffer = await sharp(inputBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const b64 = small64Buffer.toString('base64');
  const miniSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><image href="data:image/png;base64,${b64}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet" /></svg>`;
  fs.writeFileSync(faviconSvg, miniSvg, 'utf8');

  console.log('Logo and favicon compression complete!');
}

optimizeLogos().catch(console.error);
