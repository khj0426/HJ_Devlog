'use client';

import styled, { css } from 'styled-components';

const PostLayOutPC = css`
  width: min(100% - 40px, 760px);
`;

const PostLayOutMobile = css`
  width: min(100% - 32px, 760px);
`;

const StyledPostLayout = styled.article`
  ${PostLayOutPC}
  display: flex;
  margin: 64px auto;
  flex-direction: column;
  margin-bottom: 50px;
  color: var(--seed-color-fg-neutral);
  font-size: 17px;
  line-height: 1.85;

  > h1 {
    margin: 0 0 24px;
    font-size: clamp(38px, 7vw, 64px);
    line-height: 1.15;
    letter-spacing: -0.045em;
  }

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
