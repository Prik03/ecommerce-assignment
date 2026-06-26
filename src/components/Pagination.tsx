import { useEffect, useMemo, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | 'ellipsis';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 640);

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const maxVisiblePages = isMobile ? 3 : 5;

  const visiblePages = useMemo<PageItem[]>(() => {
    if (totalPages <= 1) {
      return [];
    }

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const halfWindow = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages: PageItem[] = [];
    const showLeftEllipsis = startPage > 2;
    const showRightEllipsis = endPage < totalPages - 1;

    if (showLeftEllipsis) {
      pages.push(1, 'ellipsis');
    } else {
      pages.push(
        ...Array.from(
          { length: Math.min(maxVisiblePages, totalPages) },
          (_, index) => index + 1
        )
      );
      return pages;
    }

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    if (showRightEllipsis) {
      pages.push('ellipsis', totalPages);
    } else if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, maxVisiblePages, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex flex-wrap justify-center mt-4 mb-4"
      aria-label="Pagination"
    >
      <button
        className="px-4 py-2 mx-1 my-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowRightLong className="inline-block mr-1 transform rotate-180" />
        Previous
      </button>
      <ul className="flex flex-wrap items-center justify-center">
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <li
                key={`ellipsis-${index}`}
                className="px-4 py-2 mx-1 my-1 text-gray-700"
              >
                ...
              </li>
            );
          }

          const isActive = page === currentPage;

          return (
            <li key={page}>
              <button
                className={`px-4 py-2 mx-1 my-1 rounded ${
                  isActive
                    ? 'bg-blue-800 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
                onClick={() => onPageChange(page)}
                aria-label={`page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="px-4 py-2 mx-1 my-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <FaArrowRightLong className="inline-block ml-1" />
      </button>
    </nav>
  );
};

export default Pagination;
