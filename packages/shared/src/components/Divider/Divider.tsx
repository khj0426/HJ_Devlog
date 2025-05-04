import styled from "styled-components";
import { DividerProps, getDividerStyle } from "../../@types/Divider.styles";

const StyledDivider = styled.div<DividerProps>`
  ${(props) => getDividerStyle(props)}
`;

export default function Divider(dividerProps: DividerProps) {
  return (
    <StyledDivider {...dividerProps}>{dividerProps.children}</StyledDivider>
  );
}
