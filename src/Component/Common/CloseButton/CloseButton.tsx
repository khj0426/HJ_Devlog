import { ComponentPropsWithoutRef, forwardRef } from 'react';

import CloseButtonIcon from './CloseButtonIcon';

import './index.css';

interface CloseButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: number;
  isDisabled?: boolean;
  darkMode?: boolean;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ size, isDisabled, darkMode, ...props }, ref) => {
    return (
      <button
        aria-label="Close"
        type="button"
        ref={ref}
        className={`close-button ${props.className}`}
        disabled={isDisabled}
        {...props}
      >
        <CloseButtonIcon sizes={size} darkMode={darkMode} />
      </button>
    );
  }
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
