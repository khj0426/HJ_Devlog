'use client';

import Image from 'next/image';
export default function ProfileImageWrapper({ imgurl }: { imgurl: string }) {
  return (
    <div>
      <Image
        src={imgurl}
        alt="About 페이지 프로필 이미지"
        width={300}
        height={350}
      ></Image>
    </div>
  );
}
