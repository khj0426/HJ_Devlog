import { css } from 'styled-components';

import { BadgeProps, BadgeSize, BadgeVariant } from '@/@types/BadgeType';
import { buttonTheme } from '@/style/theme/button';
import { borderRadius, lineHeights, fontSizes } from '@/style/theme/size';

const variantToStyles = (variant: BadgeVariant) => {
  switch (variant) {
    case 'negative':
      return {
        color: buttonTheme.variant_color.negative,
        backgroundColor: buttonTheme.variant_backgroundColor.light_red,
      };

    case 'secondary':
      return {
        color: buttonTheme.variant_backgroundColor.secondary,
        backgroundColor: buttonTheme.variant_backgroundColor.light_blue,
      };

    case 'positive':
      return {
        color: buttonTheme.variant_backgroundColor.positive,
        backgroundColor: buttonTheme.variant_backgroundColor.light_green,
      };
    case 'primary-filled':
      return {
        color: buttonTheme.variant_color.white,
        backgroundColor: buttonTheme.variant_backgroundColor.blue,
      };

    case 'warning':
      return {
        color: buttonTheme.variant_backgroundColor.warning,
        backgroundColor: buttonTheme.variant_backgroundColor.light_orange,
      };

    case 'primary':
    default:
      return {
        color: buttonTheme.variant_backgroundColor.blue,
        backgroundColor: buttonTheme.variant_backgroundColor.light_blue,
      };
  }
};

const sizeToStyles = (size: BadgeSize) => {
  switch (size) {
    case 'small':
      return {
        lineHeight: lineHeights.condensed,
        padding: '0 20px',
        minHeight: '30px',
      };

    case 'default':
    default:
      return {
        lineHeight: lineHeights.normal,
        padding: '0 25px',
        minHeight: '50px',
      };
  }
};

export const getBadgeStyle = (props?: BadgeProps) => {
  const variant = props?.variant ?? 'primary';
  const size = props?.size ?? 'small';
  const getVariantStyle = variantToStyles(variant);
  const getSizeStyle = sizeToStyles(size);

  const baseStyle = {
    overflow: 'hidden',
    verticalAlign: 'middle',
    borderRadius: '5px',
    border: 'none',
  };

  return css({
    ...baseStyle,
    ...getVariantStyle,
    ...getSizeStyle,
    ...props?.style,
  });
};
