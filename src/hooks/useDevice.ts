import useMediaQuery from '@/hooks/useMediaQuery';
import mediaTheme from '@/style/theme/media';

export default function useDevice() {
  const isMobile = useMediaQuery({ query: mediaTheme.device.mobile });
  const isTablet = useMediaQuery({ query: mediaTheme.device.tablet });
  const isLaptop = useMediaQuery({ query: mediaTheme.device.laptop });
  const isDesktop = !isMobile && !isTablet && !isLaptop;

  return { isMobile, isTablet, isLaptop, isDesktop };
}
