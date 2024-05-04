const fontSizes = {
  xs: '1rem',
  sm: '1.2rem',
  md: '1.4rem',
  lg: '1.6rem',
  xl: '2rem',
} as const;

const fontWeights = {
  light: 300,
  medium: 400,
  bold: 700,
} as const;

const borderRadius = {
  xs: '2px',
  sm: '4px',
  md: '10px',
  lg: '12px',
  xl: '14px',
} as const;

const lineHeights = {
  condensed: '1.25',
  normal: '1.5',
  expanded: '1.75',
} as const;

export { fontSizes, fontWeights, borderRadius, lineHeights };
export type fontSizesType = typeof fontSizes;
export type fontWeightsType = typeof fontWeights;
export type borderRadiusType = typeof borderRadius;
export type lineHeightsType = typeof lineHeights;
