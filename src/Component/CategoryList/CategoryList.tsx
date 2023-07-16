'use client';

import styled from 'styled-components';
import type { CategoryItem } from '@/@types/CategoryType';

const CategoryListStyle = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline ${({ theme }) => theme.text};
  }
`;

const CategoryListWrapper = styled.div`
  gap: 15px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
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
            # {category + categoryCount}
          </CategoryListStyle>
        );
      })}
    </CategoryListWrapper>
  );
}
