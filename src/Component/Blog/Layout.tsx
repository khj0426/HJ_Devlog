'use client';

import styled, { css } from 'styled-components';

const PostLayOutPC = css`
  min-width: 60%;
  max-width: 60%;
`;

const PostLayOutMobile = css`
  min-width: 80%;
  max-width: 80%;
`;

const StyledPostLayout = styled.article`
  ${PostLayOutPC}
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  margin-bottom: 50px;
  font-size: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    ${PostLayOutMobile}
  }
`;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  return <StyledPostLayout>{children}</StyledPostLayout>;
}
