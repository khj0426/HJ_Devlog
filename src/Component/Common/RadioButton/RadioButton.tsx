import React, { CSSProperties, ComponentPropsWithoutRef } from 'react';

import styled from 'styled-components';

import {
  getRadioButtonStyle,
  sizeToRadioButtonStyles,
} from '@/@types/RadioButton.styles';
import Flex from '@/Component/Common/Flex/Flex';

type ExcludeSizePropsFromInput = Omit<
  ComponentPropsWithoutRef<'input'>,
  'size'
>;

type buttonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface RadioButtonProps extends ExcludeSizePropsFromInput {
  readonly colorScheme?: CSSProperties['color'];
  readonly buttonSize?: buttonSize;
  readonly isDisabled?: boolean;
  readonly value?: string | number | readonly string[];
  readonly isInValid?: boolean;
}

const StyledRadioButton = styled.input<RadioButtonProps>`
  ${(props) => getRadioButtonStyle(props)}
`;

const StyledRadioButtonLabel = styled.label<RadioButtonProps>`
  ${(props) => getRadioButtonStyle(props)}
`;

export default function RadioButton({
  colorScheme,
  buttonSize,
  value,
  isDisabled = false,
  isInValid = false,
  ...rest
}: RadioButtonProps) {
  return (
    <Flex
      {...rest}
      alignItems="center"
      gap="2px"
      style={{
        cursor: 'pointer',
        ...rest.style,
      }}
    >
      <StyledRadioButton
        type="radio"
        colorScheme={colorScheme}
        value={value?.toString()}
        isInValid={isInValid}
        isDisabled={isDisabled}
      ></StyledRadioButton>

      <StyledRadioButtonLabel
        htmlFor={value?.toString()}
        colorScheme={colorScheme}
        buttonSize={buttonSize}
        isInValid={isInValid}
        isDisabled={isDisabled}
        style={rest.style}
      >
        {value?.toString()}
      </StyledRadioButtonLabel>
    </Flex>
  );
}
