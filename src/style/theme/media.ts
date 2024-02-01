const deviceSizes = {
  mobile: '450px',
  tablet: '900px',
  laptop: '1024px',
} as const;

const device = {
  mobile: `screen and (max-width:${deviceSizes.mobile})`,
  tablet: `screen and (max-width:${deviceSizes.tablet})`,
  laptop: `screen and (max-width:${deviceSizes.laptop})`,
} as const;

const mediaTheme = {
  device,
};

export default mediaTheme;
