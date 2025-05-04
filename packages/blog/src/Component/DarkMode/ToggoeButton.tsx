import { ReactNode } from "react";

import Flex from "@hj-devlog/shared/src/components/Flex/Flex";
import { Moon, Sun1 } from "@hj-devlog/shared/libraryies/icon";
import { useRecoilState } from "recoil";

import { themeAtom } from "~/src/app/Providers/Recoil/globalAtom";

export default function ToggleDarkModeButton({
  children,
}: {
  children?: ReactNode;
}) {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeAtom);

  const handleClickToggleImage = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      sessionStorage.setItem("theme", "dark");
      return;
    }
    sessionStorage.setItem("theme", "light");
    setCurrentTheme("light");
  };
  return (
    <Flex onClick={handleClickToggleImage}>
      {currentTheme === "light" ? (
        <Moon
          tabIndex={0}
          size="32"
          variant="Bold"
          color="#FF8A65"
          style={{
            cursor: "pointer",
          }}
        />
      ) : (
        <Sun1
          tabIndex={0}
          variant="Bold"
          size="32"
          color="#FF8A65"
          style={{
            cursor: "pointer",
          }}
        />
      )}
    </Flex>
  );
}
