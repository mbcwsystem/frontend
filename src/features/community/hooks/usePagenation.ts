import { useEffect, useState } from 'react';

interface UsePagenationProps<T> {
  items: T[];
  itemsPerPage: number;
}

export function usePagenation<T>({ items, itemsPerPage }: UsePagenationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    currentItems,
    startIndex,
    setCurrentPage,
  };
}
