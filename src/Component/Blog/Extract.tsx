'use client';
import styled from 'styled-components';

const StyledPostExtract = styled.h5`
  color: #808080;
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 14px;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 13px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 11px;
  }
`;

export default function PostExtract({ extract }: { extract: string }) {
  return <StyledPostExtract>{extract}</StyledPostExtract>;
}
