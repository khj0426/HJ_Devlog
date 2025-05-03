import "styled-components";
import type {
  lightThemeTypes,
  darkThemeTypes,
} from "~/packages/blog/src/style/theme/darkMode";
import type { deviceType } from "~/packages/blog/src/style/theme/media";

import {
  borderRadiusType,
  fontSizesType,
  fontWeightsType,
} from "~/packages/blog/src/style/theme/size";

declare module "styled-components" {
  export interface DefaultTheme {
    currentTheme: lightThemeTypes | darkThemeTypes;
    device: deviceType;
    fontSize: fontSizesType;
    fontWeight: fontWeightsType;
    borderRadius: borderRadiusType;
  }
}
