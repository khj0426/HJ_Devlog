import { CSSProperties, ReactNode, useRef } from "react";

import styled from "styled-components";

import useClickAway from "@/hooks/useClickAway";

const StyledModalContent = styled.div<{
  backgroundColor?: CSSProperties["backgroundColor"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}>`
  border: 0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  color: #000000;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "white"};
  width: ${({ width }) => width ?? "auto"};
  height: ${({ height }) => height ?? "auto"};
  outline: none;
  overflow: hidden;
`;

export default function ModalContent({
  children,
  backgroundColor,
  closeOutSideClick,
  width,
  height,
}: {
  children: ReactNode;
  backgroundColor?: CSSProperties["backgroundColor"];
  closeOutSideClick?: () => void;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  useClickAway(contentRef, closeOutSideClick);
  return (
    <StyledModalContent
      backgroundColor={backgroundColor}
      ref={contentRef}
      width={width}
      height={height}
    >
      {children}
    </StyledModalContent>
  );
}
