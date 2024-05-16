import sharp from 'sharp';

import { get } from './axiosClient';
const convertRemoteImageToBase64 = async (
  url: string,
  width: number,
  height: number
) => {
  try {
    const inputBuffer = await get<Buffer>(url, {
      responseType: 'arraybuffer',
    });

    const outputBuffer = sharp(inputBuffer.data)
      .png()
      .resize({
        width,
        height,
        fit: 'cover',
      })
      .toBuffer();

    const outputBufferToBase64 = (await outputBuffer).toString('base64');

    return `data:image/png;base64,${outputBufferToBase64}`;
  } catch (e) {
    throw e;
  }
};

export default convertRemoteImageToBase64;
