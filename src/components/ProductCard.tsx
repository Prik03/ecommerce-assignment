import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import StarRating from './StarRating';

const ProductCard = () => {
  const [Loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<null | string>(null);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts(PAGE_SIZE, 0);
        console.log(data);
        setProducts(data.products);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {Loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={product.images}
            alt={product.title}
            className="w-full h-auto rounded-md"
          />
          <h3 className="text-lg font-bold mt-2">{product.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xl font-bold text-green-500 mt-2">
              ${product.price.toFixed(2)}
            </div>
            <span className="flex items-center mt-2 text-2xl">
              <StarRating rating={product.rating} />
              {`(${product.rating.toFixed(1)})`}{' '}
              <span className="sr-only">rating</span>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
