'use client';

import styled, { keyframes } from 'styled-components';

export interface SpinnerProps {
  timing?: number;
  size?: number;
  width?: number;
  disabled?: boolean;
}

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<Required<SpinnerProps>>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ width }) => width}px solid rgba(0, 0, 0, 0.2);
  border-top: ${({ width }) => width}px solid black;
  border-radius: 50%;
  animation: ${rotate} ${({ timing }) => timing}s linear infinite;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Spinner = ({
  timing = 2,
  size = 50,
  width = 5,
  disabled = false,
}: SpinnerProps) => {
  return (
    <StyledSpinner
      timing={timing}
      size={size}
      width={width}
      disabled={disabled}
    />
  );
};

export default Spinner;
