import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import StarRating from './StarRating';
import Skeleton from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = () => {
  const [Loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<null | string>(null);
  const PAGE_SIZE = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts(PAGE_SIZE, 0);
        setProducts(data.products);
        console.log(data.products);
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
      {Loading && (
        <div role="status" className="sr-only">
          Loading...
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {Loading
        ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <Skeleton key={index} />
          ))
        : products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto rounded-md"
              />
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-bold mt-2">{product.title}</h3>
              </Link>
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
