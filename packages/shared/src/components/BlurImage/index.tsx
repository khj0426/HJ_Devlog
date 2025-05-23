import { ComponentPropsWithoutRef } from "react";

import Image from "next/image";
import getBase64BlurImage from "~/packages/blog/src/utils/getBase64BlurImage";

interface BlurImageProps extends ComponentPropsWithoutRef<"img"> {
  blurSize: number;
  blurWidth: number;
  blurHeight: number;
}

export default async function BlurImage({
  src,
  blurHeight,
  blurWidth,
  blurSize,
}: BlurImageProps) {
  const { blurImage } = await getBase64BlurImage({
    src: src ?? "",
    blurSize,
  });
  return (
    <Image
      src={src ?? ""}
      alt="blur된 이미지"
      width={blurWidth}
      height={blurHeight}
      placeholder="blur"
      blurDataURL={blurImage}
    />
  );
}
