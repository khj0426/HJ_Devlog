import { css } from 'styled-components';

import { ButtonSize, ButtonVariant, ButtonProps } from '@/@types/ButtonType';
import { buttonTheme } from '@/style/theme/button';
import { borderRadius, lineHeights, fontSizes } from '@/style/theme/size';

const variantToStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'secondary':
      return {
        color: buttonTheme.variant_color.white,
        backgroundColor: buttonTheme.variant_backgroundColor.secondary,
        borderColor: buttonTheme.border_color.gray,
        '&:hover': {
          opacity: 0.8,
        },
        '&:focus': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.blue}`,
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: 'unset',
        },
        '&:focus-visible': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.blue}`,
        },
      };

    case 'positive':
      return {
        color: buttonTheme.variant_color.white,
        backgroundColor: buttonTheme.variant_backgroundColor.positive,
        borderColor: 'transparent',
        '&:hover': {
          opacity: 0.8,
        },
        '&:focus-visible': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.positive}`,
        },
      };

    case 'negative':
      return {
        color: buttonTheme.variant_color.negative,
        backgroundColor: buttonTheme.variant_backgroundColor.transparent,
        '&:hover': {
          opacity: 0.8,
          backgroundColor: buttonTheme.variant_color.negative,
          color: buttonTheme.variant_backgroundColor.negative,
        },
        '&:focus-visible': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.negative}`,
        },
      };
    case 'transparent':
      return {
        color: buttonTheme.variant_color.secondary,
        background: 'none',
        borderColor: 'transparent',
        boxShadow: 'none',
        '&:hover': {
          opacity: 0.8,
        },
        '&:focus': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.blue}`,
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: 'unset',
        },
        '&:focus-visible': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.blue}`,
        },
      };
    case 'primary':
    default:
      return {
        color: buttonTheme.variant_color.white,
        backgroundColor: buttonTheme.variant_backgroundColor.blue,
        borderColor: 'transparent',
        '&:hover': {
          backgroundColor: buttonTheme.variant_backgroundColor.dark_blue,
        },
        '&:focus-visible': {
          boxShadow: `0px 0px 8px 2px ${buttonTheme.variant_backgroundColor.transparent}`,
        },
      };
  }
};

const sizeToStyles = (size: ButtonSize) => {
  switch (size) {
    case 'medium':
      return {
        fontSizes: fontSizes.sm,
        lineHeights: lineHeights.normal,
        padding: '15px',
        minHeight: '35px',
      };
    case 'large':
      return {
        fontSizes: fontSizes.md,
        lineHeights: lineHeights.expanded,
        padding: '20px',
        minHeight: '40px',
      };
    case 'small':
    default:
      return {
        fontSize: fontSizes.xs,
        lineHeights: lineHeights.condensed,
        padding: '10px',
        minHeight: '20px',
      };
  }
};

export const getStyles = (props?: ButtonProps) => {
  const variantStyles = props?.variant ? variantToStyles(props.variant) : {};
  const sizeStyles = props?.size ? sizeToStyles(props.size) : {};
  const baseStyle = {
    boxSizing: 'border-box',
    border: '1px solid',
    borderRadius: borderRadius.sm,
    opacity: props?.isDisabled ? 0.5 : 1,
    cursor: props?.isDisabled ? 'not-allowed' : 'pointer',
    overflow: 'hidden',
    flexShrink: 0,
    outline: 'none',
    textDecoration: 'none',
    maxWidth: '180px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  return css({ ...sizeStyles, ...variantStyles, ...baseStyle });
};
