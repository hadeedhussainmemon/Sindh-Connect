const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function updateFavicons() {
  const logoPngPath = path.join(__dirname, '../public/logo.png');
  const faviconSvgPath = path.join(__dirname, '../public/favicon.svg');
  const faviconIcoPath = path.join(__dirname, '../public/favicon.ico');
  const faviconPngPath = path.join(__dirname, '../public/favicon.png');

  // 1. Read transparent logo
  const logoBuffer = fs.readFileSync(logoPngPath);
  const imgBase64 = logoBuffer.toString('base64');

  // 2. Create crisp SVG embedded favicon
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <image href="data:image/png;base64,${imgBase64}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
</svg>`;
  fs.writeFileSync(faviconSvgPath, svg, 'utf8');

  // 3. Create square 64x64 and 32x32 transparent favicon.ico / favicon.png
  await sharp(logoBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconIcoPath);

  await sharp(logoBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconPngPath);

  console.log('Successfully updated favicon.svg, favicon.ico, and favicon.png');
}

updateFavicons().catch(console.error);
