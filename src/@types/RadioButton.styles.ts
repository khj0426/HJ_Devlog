import { css } from 'styled-components';

import { RadioButtonProps } from '@/Component/Common/RadioButton/RadioButton';
import { fontSizes } from '@/style/theme/size';
export const sizeToRadioButtonStyles = (
  buttonSize: RadioButtonProps['buttonSize']
) => {
  switch (buttonSize) {
    case 'xs':
      return {
        fontSize: '12px',
        lineHeight: '1.2',
        minHeight: '20px',
      };

    case 'sm':
      return {
        fontSize: fontSizes.xs,
        lineHeight: '1.4',
        minHeight: '25px',
      };

    case 'md':
      return {
        fontSize: fontSizes.sm,
        lineHeight: '1.6',
        minHeight: '30px',
      };

    case 'lg':
      return {
        fontSize: fontSizes.md,
        lineHeight: '1.8',
        minHeight: '35px',
      };

    case 'xl':
      return {
        fontSize: fontSizes.lg,
        lineHeight: '2.0',
        minHeight: '40px',
      };

    default:
      return {
        lineHeight: '1.6',
        minHeight: '30px',
      };
  }
};
export const getRadioButtonStyle = (props: RadioButtonProps) => {
  const size = props?.buttonSize ?? 'sm';
  const getSizeStyle = sizeToRadioButtonStyles(size);
  const color = props?.isInValid ? '#E53E3E' : props?.colorScheme ?? 'inherit';

  return css`
    color: ${color};
    border-radius: 0;
    ${getSizeStyle};
    ${props?.isDisabled &&
    css`
      color: #e0e0e0;
      cursor: not-allowed;
    `}
    ${props?.isInValid &&
    css`
      color: #e53e3e;
    `}
  `;
};
