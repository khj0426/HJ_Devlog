import { ImageResponse } from 'next/server';

import convertRemoteImageToBase64 from '@/utils/convertRemoteImagetoBase64';
import getCurrentBasePath from '@/utils/getCurrentBasePath';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const imageURL = decodeURIComponent(
    `${getCurrentBasePath()}/images/Profile.jpg`
  );

  const getResizedImage = await convertRemoteImageToBase64(imageURL, 350, 350);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          zIndex: '99',
          width: '100%',
          height: '100%',
          background: 'white',
          justifyContent: 'space-around',
        }}
      >
        <img
          src={`${getResizedImage}`}
          style={{
            width: '350px',
            height: 'auto',
            objectFit: 'contain',
          }}
        ></img>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 20px',
          }}
        >
          <p
            style={{
              fontSize: '38px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
            }}
          >
            프론트엔드 개발자, 김효중
          </p>
          <p style={{ fontSize: '32px', margin: '0' }}>
            용기를 잃지 않기 위한 이력서
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
