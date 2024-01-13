'use client';

import type { CategoryItem } from '@/@types/CategoryType';

import Link from 'next/link';
import styled from 'styled-components';

const CategoryListStyle = styled.span`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline ${({ theme }) => theme.text};
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 11px;
  }
`;

const CategoryListWrapper = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    opacity: 0;
  }

  @media ${({ theme }) => theme.device.tablet} {
    opacity: 0;
  }
  gap: 15px;
  position: fixed;
  margin-top: 80px;
  right: 0;
  flex-direction: column;
  justify-content: center;
  max-height: 350px;
  overflow-y: auto;
`;
export default function CategoryList({
  category,
}: {
  category: CategoryItem[];
}) {
  return (
    <CategoryListWrapper>
      {category.map(({ category, categoryCount }) => {
        return (
          <CategoryListStyle key={category}>
            <Link href={`/category/${category}`}>
              💻 {category + categoryCount}
            </Link>
          </CategoryListStyle>
        );
      })}
    </CategoryListWrapper>
  );
}
