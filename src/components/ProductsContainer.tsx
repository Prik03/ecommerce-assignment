import Pagination from './Pagination';
import ProductCard from './ProductCard';

const ProductsContainer = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ProductCard />
      </div>
      <Pagination />
    </>
  );
};

export default ProductsContainer;
