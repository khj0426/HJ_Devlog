import { CSSProperties } from 'react';

interface CloseButtonProps {
  sizes?: number;
  darkMode?: boolean;
  fill?: CSSProperties['color'];
  disabled?: boolean;
}

export default function CloseButtonIcon({
  sizes,
  darkMode,
  fill,
  disabled,
}: CloseButtonProps) {
  const darkModeColor = darkMode ? '#fafafa' : '#1c1e21';
  const currentColor = disabled ? '#cdcdcd' : darkModeColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={sizes ?? '24px'}
      viewBox="0 0 24 24"
      width={sizes ?? '24px'}
      fill={fill ?? currentColor}
      style={{
        cursor: 'pointer',
      }}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );
}
