const deviceSizes = {
  mobile: '450px',
  tablet: '900px',
  laptop: '1024px',
} as const;

export type deviceSizesType = typeof deviceSizes;

const device = {
  mobile: `screen and (max-width:${deviceSizes.mobile})`,
  tablet: `screen and (max-width:${deviceSizes.tablet})`,
  laptop: `screen and (max-width:${deviceSizes.laptop})`,
} as const;

export type deviceType = typeof device;

export default device;
