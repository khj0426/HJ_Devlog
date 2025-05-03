import styled from "styled-components";
import {
  getDividerStyle,
  DividerProps,
} from "~/packages/blog/src/@types/Divider.styles";

const StyledDivider = styled.div<DividerProps>`
  ${(props) => getDividerStyle(props)}
`;

export default function Divider(dividerProps: DividerProps) {
  return (
    <StyledDivider {...dividerProps}>{dividerProps.children}</StyledDivider>
  );
}
