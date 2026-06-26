import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import { useProductStore } from '../store/useProductStore';
import FilterModal from './FilterModal';

const ProductsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') ?? '';
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = Number(searchParams.get('page'));
    return Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  });
  const limitParam = Number(searchParams.get('limit'));
  const pageSize = Number.isNaN(limitParam) || limitParam < 1 ? 10 : limitParam;

  const {
    totalProducts,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    fetchProducts,
  } = useProductStore();

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  useEffect(() => {
    const pageParam = Number(searchParams.get('page'));
    const safePage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    if (safePage !== currentPage) {
      setCurrentPage(safePage);
      return;
    }

    void fetchProducts({ page: currentPage, pageSize, searchTerm });
  }, [
    currentPage,
    fetchProducts,
    pageSize,
    searchParams,
    searchTerm,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
  ]);

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
      <div className="flex w-full">
        <FilterModal />
        <div className="flex-1 min-w-0">
          <ProductCard />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsContainer;
