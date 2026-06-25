import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import ProductCard from './ProductCard';

const ProductsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') ?? '';
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = Number(searchParams.get('page'));
    return Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  useEffect(() => {
    const pageParam = Number(searchParams.get('page'));
    const safePage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [searchParams, currentPage]);

  const handlePageChange = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', safePage.toString());
    nextParams.set('limit', pageSize.toString());

    if (searchTerm) {
      nextParams.set('q', searchTerm);
    } else {
      nextParams.delete('q');
    }

    setSearchParams(nextParams, { replace: true });
    setCurrentPage(safePage);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ProductCard
          page={currentPage}
          pageSize={pageSize}
          searchTerm={searchTerm}
          onDataLoaded={setTotalProducts}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductsContainer;
