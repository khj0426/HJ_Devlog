import { ReactNode } from "react";

import { ArchiveMinus } from "@hj-devlog/shared/libraryies/icon";
import Link from "next/link";

const RssButton = ({ children }: { children?: ReactNode }) => {
  return (
    <Link href="/feed.xml">
      <ArchiveMinus
        size="32"
        color="#FF8A65"
        variant="Bold"
        style={{
          cursor: "pointer",
        }}
      />
      {children}
    </Link>
  );
};

export default RssButton;
