'use client';
import styled from 'styled-components';
const StyledPostLayOut = styled.section`
  margin-top: 25px;
`;

export default function PostLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <StyledPostLayOut>{children}</StyledPostLayOut>;
}
