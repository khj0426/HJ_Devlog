"use client";

import { useState } from "react";

import Drawer from "@hj-devlog/shared/src/components/Drawer/Drawer";
import DrawerImage from "@hj-devlog/shared/src/components/Drawer/DrawerImage";
import IconButton from "@hj-devlog/shared/src/components/IconButton/IconButton";

import ToggleDarkModeButton from "../../DarkMode/ToggoeButton";
import ReportButton from "../ReportButton/ReportButton";
import RssButton from "../RssButton/RssButton";
import SearchPostButton from "../SearchPost/SearchPost";

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
