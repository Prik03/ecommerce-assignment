import { FaArrowRightLong } from 'react-icons/fa6';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-4 mb-4" aria-label="Pagination">
      <button
        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowRightLong className="inline-block mr-1 transform rotate-180" />
        Previous
      </button>
      <ul className="flex items-center">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === currentPage;

          return (
            <li key={pageNumber}>
              <button
                className={`px-4 py-2 mx-1 rounded ${
                  isActive
                    ? 'bg-blue-800 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`page ${pageNumber}`}
                aria-current={isActive && 'page'}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <FaArrowRightLong className="inline-block ml-1" />
      </button>
    </nav>
  );
};

export default Pagination;
