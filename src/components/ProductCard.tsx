import StarRating from './StarRating';
import Skeleton from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

const ProductCard = () => {
  const { products, loading, error } = useProductStore();
  const navigate = useNavigate();

  return (
    <>
      {loading && (
        <div role="status" className="sr-only">
          Loading...
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && !error && (
        <p className="col-span-full text-center text-gray-500">
          No products found.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : products.map((product) => {
              const imageUrl = Array.isArray(product.images)
                ? product.images[0]
                : product.images;

              return (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={imageUrl}
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
              );
            })}
      </div>
    </>
  );
};

export default ProductCard;
