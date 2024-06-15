import type { ButtonProps } from '@/@types/ButtonType';

import styled from 'styled-components';

import { getStyles } from '@/@types/Button.styles';

const StyledBaseButton = styled.button<ButtonProps>`
  ${(props) => getStyles(props)}
  font-weight: bold;
  cursor: pointer;
`;

export default function Button({
  variant = 'primary',
  style,
  size = 'small',
  disabled,
  onClick,
  label,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledBaseButton
      tabIndex={0}
      style={style}
      size={size}
      onClick={onClick}
      isDisabled={disabled}
      variant={variant}
      aria-label="Button Component"
      role="button"
      {...rest}
    >
      {label}
      {children}
    </StyledBaseButton>
  );
}
