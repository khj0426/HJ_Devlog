'use client';
import styled from 'styled-components';
const StyledPostLayOut = styled.section`
  margin-top: 25px;
  width: 100%;
  display: flex;
`;

export default function PostLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <StyledPostLayOut>{children}</StyledPostLayOut>;
}
