import sharp from 'sharp';
import fs from 'fs';

// Process an image: make the outside black border transparent so it looks like a real physical gold frame hanging on the museum wall
async function processFramedImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const outData = Buffer.from(data);

  // We want to make pure black outside the frame transparent (alpha = 0)
  // Let's check outer corners and edges
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = outData[idx];
      const g = outData[idx + 1];
      const b = outData[idx + 2];

      // Only check pixels near edges or outer regions (x < 60 or x > width-60 or y < 60 or y > height-60)
      if (x < 65 || x > width - 65 || y < 65 || y > height - 65) {
        if (r < 22 && g < 22 && b < 22) {
          outData[idx + 3] = 0; // make transparent
        }
      }
    }
  }

  // Also upscale slightly for crisp retina rendering on desktop
  await sharp(outData, { raw: { width, height, channels: 4 } })
    .resize(width * 2, height * 2, { kernel: 'lanczos3' })
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved processed image: ${outputPath}`);
}

async function main() {
  // 1. otw: 0cb464c3-773e-48b8-91fd-99e219f00964.png (Tesla in-car navigation / On The Way)
  await processFramedImage('/home/ubuntu/.cursor/projects/workspace/assets/0cb464c3-773e-48b8-91fd-99e219f00964.png', './otw/framed-otw.png');
  await processFramedImage('/home/ubuntu/.cursor/projects/workspace/assets/0cb464c3-773e-48b8-91fd-99e219f00964.png', './public/otw/framed-otw.png');

  // 2. bttf: 5efe0f3e-e5f8-48e7-98a0-fc3f57411098.png (Music / Boombox project)
  await processFramedImage('/home/ubuntu/.cursor/projects/workspace/assets/5efe0f3e-e5f8-48e7-98a0-fc3f57411098.png', './bttf/framed-bttf.png');
  await processFramedImage('/home/ubuntu/.cursor/projects/workspace/assets/5efe0f3e-e5f8-48e7-98a0-fc3f57411098.png', './public/bttf/framed-bttf.png');

  // 3. flix: b9edbaf4-ad0c-4157-b28a-6e4644e27a9b.png (Netflix / Flixtape project)
  await processFramedImage('/home/ubuntu/.cursor/projects/workspace/assets/b9edbaf4-ad0c-4157-b28a-6e4644e27a9b.png', './flix/framed-flix.png');
  await processFramedImage('/home/ubuntu/.cursor/projects/workspace/assets/b9edbaf4-ad0c-4157-b28a-6e4644e27a9b.png', './public/flix/framed-flix.png');

  console.log('All 3 user images successfully installed as project artworks!');
}

main().catch(console.error);
