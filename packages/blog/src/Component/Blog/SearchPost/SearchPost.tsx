import { ReactNode } from "react";

import { SearchNormal } from "@hj-devlog/shared/libraryies/icon";

import useModal from "~/src/hooks/useModal";

import PostSearchModal from "../PostSerachModal/PostSearchModal";

export default function SearchPostButton({
  children,
}: {
  children?: ReactNode;
}) {
  const { modal, openModal } = useModal("POST_SEARCH_MODAL_STATE");

  return (
    <>
      <SearchNormal
        size="32"
        onClick={openModal}
        style={{
          cursor: "pointer",
        }}
        color="#FF8A65"
      />
      {children}
      {modal.isOpen && <PostSearchModal />}
    </>
  );
}
