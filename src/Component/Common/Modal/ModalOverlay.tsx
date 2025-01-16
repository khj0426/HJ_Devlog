import { ReactNode, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
import styled from "styled-components";

import useModal from "@/hooks/useModal";
import useTimeout from "@/hooks/useTimeout";

const StyledBackDrop = styled.div`
  z-index: 555;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  bottom: 0;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function ModalOverlay({
  id,
  children,
  disabledAutoFocus,
  closeAfterTransition,
  transitionTime,
  onTransitionEnd,
  onTransitionEnter,
}: {
  id: string;
  children: ReactNode;
  disabledAutoFocus?: boolean;
  closeAfterTransition?: boolean;
  transitionTime?: number;
  onTransitionEnd?: () => void;
  onTransitionEnter?: () => void;
}) {
  const { closeModal, modal } = useModal(id);

  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keyup", handleEscapeClick);

    return () => {
      window.removeEventListener("keyup", handleEscapeClick);
    };
  }, [closeModal]);

  const transitionDelay = closeAfterTransition ? transitionTime : undefined;

  useTimeout(closeModal, transitionDelay);

  return (
    <CSSTransition
      in={modal.isOpen}
      appear
      unmountOnExit
      mountOnEnter
      classNames="modal"
      timeout={transitionTime ?? 0}
      onEntered={onTransitionEnter}
      onExited={onTransitionEnd}
    >
      <StyledBackDrop autoFocus={!disabledAutoFocus}>{children}</StyledBackDrop>
    </CSSTransition>
  );
}
