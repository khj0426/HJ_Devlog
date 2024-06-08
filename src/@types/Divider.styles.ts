import { CSSProperties, ComponentPropsWithoutRef } from 'react';

import { css } from 'styled-components';

export interface DividerProps extends ComponentPropsWithoutRef<'span'> {
  length: CSSProperties['width'];
  color?: CSSProperties['color'];
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  style?: CSSProperties;
  orientation?: 'horizontal' | 'vertical';
  thickness: CSSProperties['borderWidth'];
  opacity?: CSSProperties['opacity'];
}

const variantToStyles = (
  variant: Pick<DividerProps, 'orientation' | 'thickness' | 'color' | 'length'>
) => {
  switch (variant.orientation) {
    case 'horizontal':
      return {
        borderBottom: `${variant.thickness} solid ${variant.color}`,
        width: variant.length,
        height: variant.thickness,
      };
    case 'vertical':
      return {
        borderLeft: `${variant.thickness} solid ${variant.color}`,
        height: variant.length,
      };
  }
};

export const getDividerStyle = (props?: DividerProps) => {
  const orientation = props?.orientation ?? 'horizontal';
  const thickness = props?.thickness ?? '1.5px';
  const color = props?.color ?? '#e8e8e8';
  const length = props?.length ?? '100%';

  const getVariantStyle = variantToStyles({
    orientation,
    thickness,
    color,
    length,
  });

  return css({
    ...getVariantStyle,
    ...props?.style,
    margin: props?.margin,
    padding: props?.padding,
    opacity: props?.opacity,
  });
};
