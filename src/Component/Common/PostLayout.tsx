'use client';
import styled from 'styled-components';
const StyledPostLayOut = styled.section`
  display: flex;
  padding-left: 5px;
  border-radius: 25px;
  margin: 25px auto;
  background: ${({ theme }) => theme.backgroundPost};

  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export default function PostLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <StyledPostLayOut>{children}</StyledPostLayOut>;
}
