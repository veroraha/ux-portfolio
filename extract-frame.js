import sharp from 'sharp';

async function processFrame() {
  const image = sharp('/home/ubuntu/.cursor/projects/workspace/assets/c6cea2d9-4e58-4363-90ce-931802dde56e.png');
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's create an alpha channel where:
  // 1. Outside border that is black is made transparent or trimmed
  // 2. Center window (x between ~74 and 333, y between ~89 and 525) that is pitch black is made transparent (alpha = 0)
  
  // Flood fill or distance-based keying for the black regions:
  // Let's check outer black vs inner black
  const outData = Buffer.from(data);

  // Inner box: approx left=74, right=333, top=89, bottom=525
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = outData[idx];
      const g = outData[idx + 1];
      const b = outData[idx + 2];

      // Inner window region
      if (x >= 73 && x <= 334 && y >= 88 && y <= 526) {
        // If it is black or near black (inner opening)
        if (r < 25 && g < 25 && b < 25) {
          outData[idx + 3] = 0; // Transparent
        } else {
          // Smooth edge feathering
          const brightness = Math.max(r, g, b);
          if (brightness < 60) {
            outData[idx + 3] = Math.min(255, Math.floor((brightness - 20) / 40 * 255));
          }
        }
      } else {
        // Outer region
        if (r < 20 && g < 20 && b < 20) {
          outData[idx + 3] = 0; // Transparent outside
        }
      }
    }
  }

  await sharp(outData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('/workspace/gold-frame-cutout.png');

  console.log('Saved /workspace/gold-frame-cutout.png');
}

processFrame().catch(console.error);
