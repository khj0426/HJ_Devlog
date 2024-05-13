import fs from 'fs/promises';
import { join } from 'path';

import { ImageResponse } from 'next/server';
import sharp from 'sharp';

import getCurrentBasePath from '@/utils/getCurrentBasePath';
import { getPostBySlug } from '~/lib/api';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug, [
    'title',
    'data',
    'slug',
    'category',
    'excerpt',
    'date',
    'image',
  ]);
  try {
    const convertImage = await sharp(`${post.image}`)
      .resize({
        width: 1200,
        height: 630,
        fit: sharp.fit.cover,
      })
      .toFormat('png')
      .toBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            backgroundImage: `
          data:image/png;base64,${convertImage.toString('base64')}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p>{post.title}</p>
            <p>{post.excerpt}</p>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
    console.error(e);
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p>{post.title}</p>
            <p>{post.excerpt}</p>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
