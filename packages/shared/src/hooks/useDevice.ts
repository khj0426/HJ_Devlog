import mediaTheme from "~/packages/blog/src/style/theme/media";

import useMediaQuery from "~/packages/shared/src/hooks/useMediaQuery";

export default function useDevice() {
  const isMobile = useMediaQuery({ query: mediaTheme.mobile });
  const isTablet = useMediaQuery({ query: mediaTheme.tablet });
  const isLaptop = useMediaQuery({ query: mediaTheme.laptop });
  const isDesktop = !isMobile && !isTablet && !isLaptop;

  return { isMobile, isTablet, isLaptop, isDesktop };
}
