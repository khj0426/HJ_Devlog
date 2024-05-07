import type { BadgeProps } from '@/@types/BadgeType';

import styled from 'styled-components';

import { getBadgeStyle } from '@/@types/Badge.styles';

const StyledBadge = styled.button<BadgeProps>`
  ${(props) => getBadgeStyle(props)}
  font-weight: bold;
  cursor: pointer;
`;

export default function Badge({
  variant,
  style,
  size,
  disabled,
  onClick,
  children,
  ...rest
}: BadgeProps) {
  const ariaLabel = 'Badge Component';

  return (
    <StyledBadge
      tabIndex={0}
      style={style}
      size={size}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </StyledBadge>
  );
}
