"use client";

import { useState } from "react";

import Drawer from "@hj-devlog/shared/src/components/Drawer/Drawer";
import IconButton from "@hj-devlog/shared/src/components/IconButton/IconButton";
import {
  Activity,
  AddCircle,
  CalendarSearch,
} from "@hj-devlog/shared/libraryies/icon";

export default function BackOfficeDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <div>
      <Activity
        cursor={"pointer"}
        size={50}
        onClick={() => setDrawerOpen(!isDrawerOpen)}
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
            icon={
              <AddCircle
                size="32"
                color="#FF8A65"
                variant="Bold"
                style={{
                  cursor: "pointer",
                }}
              />
            }
            style={{
              border: "none",
            }}
          />

          <IconButton
            icon={
              <CalendarSearch
                size="32"
                color="#FF8A65"
                variant="Bold"
                style={{
                  cursor: "pointer",
                }}
              />
            }
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
