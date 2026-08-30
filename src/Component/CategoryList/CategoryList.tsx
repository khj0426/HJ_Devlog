"use client";

import type { CategoryItem } from "@/@types/CategoryType";

import { Chip } from "@seed-design/react";
import { useRouter } from "next/navigation";

import styles from "./category-list.module.css";

export default function CategoryList({ category }: { category: CategoryItem[] }) {
  const router = useRouter();

  return (
    <nav className={styles.wrapper} aria-label="게시글 카테고리">
      <Chip.Root variant="solid" size="medium" onClick={() => router.push('/')}>
        <Chip.Label>전체</Chip.Label>
      </Chip.Root>
      {category.map(({ category: name, categoryCount }) => (
        <Chip.Root variant="outlineStrong" size="medium" key={name} onClick={() => router.push(`/category/${encodeURIComponent(name)}/1`)}>
          <Chip.Label>{name} {categoryCount}</Chip.Label>
        </Chip.Root>
      ))}
    </nav>
  );
}
