import { useEffect } from 'react';
import ProductsContainer from '../components/ProductsContainer';

const ProductListingPage = () => {
  useEffect(() => {
    document.title = 'Leegality';
  }, []);

  return (
    <main className="relative">
      <ProductsContainer />
    </main>
  );
};

export default ProductListingPage;
