import { readFile } from 'fs/promises';
import path from 'node:path';

import { getPlaiceholder } from 'plaiceholder';
export default async function getBase64BlurImage({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) {
  const buffer = await readFile(
    path.join(process.cwd(), path.join('/public', src))
  );

  const blurImage = await getPlaiceholder(buffer, {
    size: 10,
  });

  return {
    ...blurImage,
    img: {
      src,
      width,
      height,
    },
  };
}
