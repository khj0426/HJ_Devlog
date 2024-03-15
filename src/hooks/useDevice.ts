import useMediaQuery from '@/hooks/useMediaQuery';
import mediaTheme from '@/style/theme/media';

export default function useDevice() {
  const isMobile = useMediaQuery({ query: mediaTheme.mobile });
  const isTablet = useMediaQuery({ query: mediaTheme.tablet });
  const isLaptop = useMediaQuery({ query: mediaTheme.laptop });
  const isDesktop = !isMobile && !isTablet && !isLaptop;

  return { isMobile, isTablet, isLaptop, isDesktop };
}
