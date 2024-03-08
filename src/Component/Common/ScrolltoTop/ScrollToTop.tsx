'use client';

import useIsDarkMode from '@/hooks/useIsDarkMode';

export default function ScrollToTop() {
  const { isDarkMode } = useIsDarkMode();
  return (
    <svg
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      style={{
        cursor: 'pointer',
        position: 'fixed',
        bottom: '0',
        right: '0',
      }}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="32.000000pt"
      height="32.000000pt"
      viewBox="0 0 32.000000 32.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill={`${isDarkMode ? 'white' : 'black'}`}
        stroke="none"
      >
        <path
          d="M95 306 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124
   -15 327 -176 257z m142 -26 c87 -52 83 -198 -6 -245 -38 -19 -104 -19 -142 0
   -89 47 -93 193 -6 245 42 26 112 26 154 0z"
        />
        <path
          d="M136 165 c-22 -33 -20 -42 4 -20 19 17 21 17 40 0 11 -10 20 -15 20
   -11 0 11 -32 56 -40 56 -4 0 -15 -11 -24 -25z"
        />
      </g>
    </svg>
  );
}
