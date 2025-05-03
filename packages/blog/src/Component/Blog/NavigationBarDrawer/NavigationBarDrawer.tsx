"use client";

import { useState } from "react";

import ReportButton from "~/packages/blog/src/Component/Blog/ReportButton/ReportButton";
import RssButton from "~/packages/blog/src/Component/Blog/RssButton/RssButton";
import SearchPostButton from "~/packages/blog/src/Component/Blog/SearchPost/SearchPost";
import ToggleDarkModeButton from "~/packages/blog/src/Component/DarkMode/ToggoeButton";
import Drawer from "~/packages/shared/src/components/Drawer/Drawer";
import DrawerImage from "~/packages/shared/src/components/Drawer/DrawerImage";
import IconButton from "~/packages/shared/src/components/IconButton/IconButton";

export default function NavigationBarDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <DrawerImage
        width={32}
        onClick={() => setDrawerOpen(!isDrawerOpen)}
        height={32}
      />
      <Drawer
        direction="right"
        handleOpen={setDrawerOpen}
        isOpen={isDrawerOpen}
      >
        <ul
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <IconButton
            icon={<ReportButton />}
            style={{
              border: "none",
            }}
          />

          <IconButton
            icon={<RssButton />}
            tabIndex={0}
            style={{
              border: "none",
            }}
          />
          <IconButton
            icon={<SearchPostButton />}
            tabIndex={0}
            style={{
              border: "none",
            }}
          />

          <IconButton
            icon={<ToggleDarkModeButton />}
            tabIndex={0}
            style={{
              border: "none",
            }}
          />
        </ul>
      </Drawer>
    </div>
  );
}
