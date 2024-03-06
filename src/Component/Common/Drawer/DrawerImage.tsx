import { ComponentPropsWithoutRef } from 'react';

import useIsDarkMode from '@/hooks/useIsDarkMode';

interface DrawerImageProps extends ComponentPropsWithoutRef<'svg'> {}

export default function DrawerImage({
  width,
  height,
  ...rest
}: DrawerImageProps) {
  const { isDarkMode } = useIsDarkMode();
  return (
    <svg
      version="1.0"
      width={`${width}pt`}
      height={`${height}pt`}
      viewBox="0 0 32.000000 32.000000"
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      <g
        transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill={`${isDarkMode ? 'white' : 'black'}`}
        stroke="none"
      >
        <path d="M0 245 l0 -25 160 0 160 0 0 25 0 25 -160 0 -160 0 0 -25z" />
        <path
          d="M0 160 c0 -19 7 -20 160 -20 153 0 160 1 160 20 0 19 -7 20 -160 20
          -153 0 -160 -1 -160 -20z"
        />
        <path d="M0 75 l0 -25 160 0 160 0 0 25 0 25 -160 0 -160 0 0 -25z" />
      </g>
    </svg>
  );
}
