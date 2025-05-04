"use client";

import { useEffect } from "react";

import useIntersectionObserver from "@hj-devlog/shared/src/hooks/useIntersectionObserver";
import Link from "next/link";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { Item } from "~/@types/postItem";
import { postRecommendModalClose } from "~/src/app/Providers/Recoil/globalAtom";
import useModal from "~/src/hooks/useModal";

import Modal from "../../Modal/Modal";
import ModalCloseButton from "../../Modal/ModalCloseButton";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";

const StyledRecommendPostModalWrapper = styled.div`
  color: ${({ theme }) => theme.currentTheme.text};
  background-color: ${({ theme }) => theme.currentTheme.backgroundPost};
`;
export default function RecommendPostModal({
  randomPosts,
}: {
  randomPosts: Item[];
}) {
  const [close, setClose] = useRecoilState(postRecommendModalClose);
  const { modal, closeModal, openModal } = useModal(
    "POST_RECOMMEND_MODAL_STATE"
  );
  const { target } = useIntersectionObserver({
    threshold: 1,
    callback: () => openModal(),
  });
  useEffect(() => {
    closeModal();
  }, []);
  return (
    <>
      {!close && (
        <StyledRecommendPostModalWrapper>
          <Modal id={modal.id} disabledPortal>
            <ModalContent
              closeOutSideClick={closeModal}
              width={"300px"}
              height={"400px"}
            >
              <ModalHeader
                as="h4"
                style={{
                  color: "#495057",
                }}
              >
                🥰읽어주셔서 감사합니다
              </ModalHeader>
              <p
                style={{
                  color: "#495057",
                }}
              >
                🧡이런글은 어떠신가요?
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "16px",
                  justifyContent: "space-between",
                }}
              >
                {randomPosts.map((post) => {
                  return (
                    <Link
                      key={post.title}
                      href={`/blog/${post.slug}`}
                      style={{
                        color: "#495057",
                      }}
                    >
                      {post.title}
                    </Link>
                  );
                })}
              </div>
              <ModalFooter>
                <ModalCloseButton
                  onClick={() => {
                    closeModal();
                    setClose(true);
                  }}
                  style={{
                    background: "#ededed",
                  }}
                />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </StyledRecommendPostModalWrapper>
      )}

      <div ref={target}></div>
    </>
  );
}
