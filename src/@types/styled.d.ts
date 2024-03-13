import 'styled-components';
import type { lightThemeTypes, darkThemeTypes } from '@/style/theme/darkMode';
import type { deviceType } from '@/style/theme/media';

declare module 'styled-components' {
  export interface DefaultTheme {
    currentTheme: lightThemeTypes | darkThemeTypes;
    device: deviceType;
  }
}
