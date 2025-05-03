"use client";

import type { Item } from "~/packages/blog/src/@types/postItem";

import { useEffect } from "react";

import Link from "next/link";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { postRecommendModalClose } from "~/packages/blog/src/app/Providers/Recoil/globalAtom";
import Modal from "~/packages/shared/src/components/Modal/Modal";
import ModalCloseButton from "~/packages/shared/src/components/Modal/ModalCloseButton";
import ModalContent from "~/packages/shared/src/components/Modal/ModalContent";
import ModalFooter from "~/packages/shared/src/components/Modal/ModalFooter";
import ModalHeader from "~/packages/shared/src/components/Modal/ModalHeader";
import PostItem from "~/packages/blog/src/Component/Post/PostItem";
import useIntersectionObserver from "~/packages/shared/src/hooks/useIntersectionObserver";
import useModal from "~/packages/shared/src/hooks/useModal";

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
