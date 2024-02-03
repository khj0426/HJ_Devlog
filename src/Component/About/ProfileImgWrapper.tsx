import Image from 'next/image';

import getBase64BlurImage from '@/utils/getBase64BlurImage';
export default async function ProfileImageWrapper({
  imgurl,
}: {
  imgurl: string;
}) {
  const { base64 } = await getBase64BlurImage({
    src: imgurl,
  });
  return (
    <Image
      placeholder="blur"
      src={imgurl}
      alt="About 페이지 프로필 이미지"
      width={300}
      height={300}
      blurDataURL={base64}
      priority
    />
  );
}
