import { CSSProperties, ComponentPropsWithoutRef, forwardRef } from 'react';

import styled from 'styled-components';

import CloseButtonIcon from './CloseButtonIcon';

import './index.css';

interface CloseButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: number;
  isDisabled?: boolean;
  darkMode?: boolean;
  fill?: CSSProperties['color'];
  backgroundColor?: CSSProperties['backgroundColor'];
}

const StyledCloseButtonBackDrop = styled.button<{
  backgroundColor?: CSSProperties['backgroundColor'];
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ size, isDisabled, darkMode, fill, backgroundColor, ...props }, ref) => {
    return (
      <StyledCloseButtonBackDrop
        aria-label="Close"
        type="button"
        ref={ref}
        className={`close-button ${props.className}`}
        disabled={isDisabled}
        backgroundColor={backgroundColor}
        {...props}
      >
        <CloseButtonIcon
          sizes={size}
          darkMode={darkMode}
          fill={fill}
          disabled={isDisabled}
        />
      </StyledCloseButtonBackDrop>
    );
  }
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
