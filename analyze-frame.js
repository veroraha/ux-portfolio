import sharp from 'sharp';

async function analyze() {
  const image = sharp('/home/ubuntu/.cursor/projects/workspace/assets/c6cea2d9-4e58-4363-90ce-931802dde56e.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  // Find inner bounding box of black/transparent center
  // Sample along center horizontal line y = Math.floor(height/2)
  const cy = Math.floor(height / 2);
  let leftInner = 0;
  let rightInner = width - 1;

  for (let x = 0; x < width; x++) {
    const idx = (cy * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // if we find a bright pixel (gold frame) then move past it to black
    if (r < 25 && g < 25 && b < 25 && x > 50 && leftInner === 0) {
      leftInner = x;
    }
  }

  for (let x = width - 1; x >= 0; x--) {
    const idx = (cy * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (r < 25 && g < 25 && b < 25 && x < width - 50 && rightInner === width - 1) {
      rightInner = x;
    }
  }

  const cx = Math.floor(width / 2);
  let topInner = 0;
  let bottomInner = height - 1;

  for (let y = 0; y < height; y++) {
    const idx = (y * width + cx) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (r < 25 && g < 25 && b < 25 && y > 50 && topInner === 0) {
      topInner = y;
    }
  }

  for (let y = height - 1; y >= 0; y--) {
    const idx = (y * width + cx) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (r < 25 && g < 25 && b < 25 && y < height - 50 && bottomInner === height - 1) {
      bottomInner = y;
    }
  }

  console.log(`Inner black window coordinates at center: left=${leftInner}, right=${rightInner}, top=${topInner}, bottom=${bottomInner}`);
  console.log(`Inner box dimensions: width=${rightInner - leftInner}, height=${bottomInner - topInner}`);
}

analyze().catch(console.error);
