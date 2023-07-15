'use client';

import type { CategoryItem } from '@/@types/CategoryType';

export default function CategoryList({
  category,
}: {
  category: CategoryItem[];
}) {
  return category.map(({ category, categoryCount }) => (
    <span key={category}>{category + categoryCount}</span>
  ));
}
