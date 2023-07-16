'use client';

import styled from 'styled-components';
import type { CategoryItem } from '@/@types/CategoryType';

const CategoryListStyle = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  display: flex;
  cursor: pointer;
  &:hover {
    text-decoration: underline ${({ theme }) => theme.text};
  }
`;

const CategoryListWrapper = styled.div`
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
  return category.map(({ category, categoryCount }) => (
    <CategoryListWrapper key={category}>
      <CategoryListStyle># {category + categoryCount}</CategoryListStyle>
    </CategoryListWrapper>
  ));
}
