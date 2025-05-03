import { useState } from 'react';
interface usePageNationProps<T> {
  limit: number;
  item: T[];
}

export default function usePageNation<T>({
  limit,
  item,
}: usePageNationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(item.length / limit);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const pageData = () => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    return item.slice(start, end);
  };

  const changePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeNextPage = () => {
    if (currentPage !== item.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return {
    currentPage,
    pageCount,
    changePage,
    pageData,
    changeNextPage,
    changePrevPage,
    setCurrentPage,
  };
}
