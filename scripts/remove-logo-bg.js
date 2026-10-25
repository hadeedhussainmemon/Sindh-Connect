const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function removeBackground() {
  const inputPath = path.join(__dirname, '../public/logo.jpg');
  const outputPath = path.join(__dirname, '../public/logo.png');
  const faviconPath = path.join(__dirname, '../public/favicon.png');

  console.log('Reading image:', inputPath);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Extract raw RGBA pixel data
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Flood fill / color key to remove pure white / near-white background from exterior
  // We identify white background pixels (R > 235, G > 235, B > 235) connected from edges or overall outside
  // For flood fill from corners:
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isWhite(idx) {
    const r = data[idx * 4];
    const g = data[idx * 4 + 1];
    const b = data[idx * 4 + 2];
    // Background of this image is pure white / off-white (#FFFFFF / #FAFAFA / #F8F8F8)
    return r > 240 && g > 240 && b > 240;
  }

  // Push all border pixels to queue if they are white
  for (let x = 0; x < width; x++) {
    const topIdx = x;
    const btmIdx = (height - 1) * width + x;
    if (isWhite(topIdx)) { queue.push(topIdx); visited[topIdx] = 1; }
    if (isWhite(btmIdx)) { queue.push(btmIdx); visited[btmIdx] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    const rightIdx = y * width + (width - 1);
    if (!visited[leftIdx] && isWhite(leftIdx)) { queue.push(leftIdx); visited[leftIdx] = 1; }
    if (!visited[rightIdx] && isWhite(rightIdx)) { queue.push(rightIdx); visited[rightIdx] = 1; }
  }

  // BFS Flood fill
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // Make this exterior background pixel completely transparent
    data[curr * 4 + 3] = 0;

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n] && isWhite(n)) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }

  console.log(`Transformed ${queue.length} exterior background pixels to transparent.`);

  // Save as high-res transparent PNG
  await sharp(data, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  // Also update favicon.png with transparent background
  await sharp(data, { raw: { width, height, channels: 4 } })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconPath);

  console.log('Successfully saved transparent logo.png and favicon.png');
}

removeBackground().catch(err => {
  console.error('Error removing background:', err);
  process.exit(1);
});
