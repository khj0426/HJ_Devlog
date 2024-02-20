'use client';

import Button from '@/Component/Common/Button';

interface PaginationProps {
  totalPage: number;
  limit: number;
  handleOnClickPage: (_curPage: number) => void;
}

export default function Pagination({
  totalPage,
  limit,
  handleOnClickPage,
}: PaginationProps) {
  const numPages = Math.ceil(totalPage / limit);

  return (
    <div
      style={{
        display: 'flex',
        gap: '2px',
        marginBottom: '50px',
      }}
    >
      {Array.from({ length: numPages }).map((_, i) => {
        return (
          <Button
            onClick={() => handleOnClickPage(i + 1)}
            label={`${i + 1}`}
            key={i}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '5px',
            }}
          />
        );
      })}
    </div>
  );
}
