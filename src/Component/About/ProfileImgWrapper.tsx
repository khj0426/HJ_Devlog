import Image from 'next/image';

export default async function ProfileImageWrapper({
  imgurl,
}: {
  imgurl: string;
}) {
  return (
    <Image
      placeholder="blur"
      src={imgurl}
      alt="About 페이지 프로필 이미지"
      width={300}
      height={300}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcKgkAAWkAwC+Aq/wAAAAASUVORK5CYII="
      priority
    />
  );
}
