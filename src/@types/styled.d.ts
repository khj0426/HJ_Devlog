import 'styled-components';
import type { lightThemeTypes, darkThemeTypes } from '@/style/theme/darkMode';
import type { deviceType } from '@/style/theme/media';

import {
  borderRadiusType,
  fontSizesType,
  fontWeightsType,
} from '@/style/theme/size';

declare module 'styled-components' {
  export interface DefaultTheme {
    currentTheme: lightThemeTypes | darkThemeTypes;
    device: deviceType;
    fontSize: fontSizesType;
    fontWeight: fontWeightsType;
    borderRadius: borderRadiusType;
  }
}
