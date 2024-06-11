'use client';
import { ReactNode } from 'react';

import { ArrowLeft2, ArrowRight2 } from 'iconic-react';
import Link from 'next/link';
import styled from 'styled-components';

import Flex from '@/Component/Common/Flex/Flex';
import IconButton from '@/Component/Common/IconButton/IconButton';

export default function NavigationButton({
  type,
  onClick,
  link,
  children,
}: {
  link: string;
  type: 'prev' | 'next';
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <NavigationButtonContainer>
      <Link href={link}>
        <Flex gap={'5px'} width={'100%'} justifyContent="space-around">
          {type === 'prev' && (
            <Flex justifyContent="center" alignItems="center">
              <StyledIconButton
                onClick={onClick}
                icon={<ArrowLeft2 />}
              ></StyledIconButton>
            </Flex>
          )}

          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {children}
          </Flex>
          {type === 'next' && (
            <Flex justifyContent="center" alignItems="center">
              <StyledIconButton
                onClick={onClick}
                icon={<ArrowRight2 />}
              ></StyledIconButton>
            </Flex>
          )}
        </Flex>
      </Link>
    </NavigationButtonContainer>
  );
}

const NavigationButtonContainer = styled.div`
  width: 300px;
  height: 64px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.currentTheme.toggleBorder};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.currentTheme.backgroundPost};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledIconButton = styled(IconButton)`
  padding: 10px;
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.currentTheme.text};
  transition: background-color 0.3s, transform 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;
