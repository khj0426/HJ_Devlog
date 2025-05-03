'use client';
import Button from '@/Component/Common/Button/Button';
import Flex from '@/Component/Common/Flex/Flex';

interface PaginationProps {
  numPages: number;
  handleOnClickPage?: (_curPage: number) => void;
}

export default function Pagination({
  numPages,
  handleOnClickPage,
}: PaginationProps) {
  return (
    <Flex gap={'2px'} margin={'50px'}>
      {Array.from({ length: numPages }).map((_, i) => {
        return (
          <Button
            variant="secondary"
            onClick={() => handleOnClickPage && handleOnClickPage(i + 1)}
            key={i}
            style={{
              width: '50px',
              height: '50px',
              border: '2.5px solid',
            }}
            label={i + 1}
          ></Button>
        );
      })}
    </Flex>
  );
}
