import fs from 'fs/promises'; // Node.js의 File System Promises API를 사용
import path from 'node:path';
import { join } from 'path';

import sharp from 'sharp';

export default async function getBase64BlurImage({
  src,
  width,
  height,
  blurSize,
}: {
  src: string;
  width?: number;
  height?: number;
  blurSize?: number;
}) {
  const publicDirectory = join(process.cwd(), 'public');

  const imageBuffer = await fs.readFile(join(publicDirectory, src));

  const blurImage = await sharp(imageBuffer)
    .resize(width, height)
    .blur(blurSize ?? 10)
    .toBuffer();

  const img = `data:image/png;base64,${blurImage.toString('base64')}`;
  return {
    blurImage: img,
    img: {
      src,
      width,
      height,
    },
  };
}
