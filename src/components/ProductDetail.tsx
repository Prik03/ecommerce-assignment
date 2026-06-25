import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { FaArrowRightLong } from 'react-icons/fa6';

const ProductDetail = (products: Product) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-3 ml-2">
        <button
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center disabled:opacity-50"
          onClick={() => navigate(`/`)}
        >
          <FaArrowRightLong className="inline-block mr-1 transform rotate-180" />
          Back
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="w-[45%] border-r border-gray-200 p-2 m-5 sticky top-0">
          <img src={products.images[0]} />
        </div>
        <div className="w-[50%]">
          <h1 className="text-4xl font-bold">{products.title}</h1>

          <div className="flex items-center mt-3">
            <div className="text-3xl font-bold text-black mt-4">
              ${products.price.toFixed(2)}
            </div>
            <span className="flex items-center mt-2 text-2xl ml-2">
              <StarRating rating={products.rating} />
              {`(${products.rating.toFixed(1)})`}{' '}
              <span className="sr-only">rating</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="font-semibold text-xl">Brand:</span>
            <span className="ml-1">{products.brand}</span>
          </div>
          <div className="mt-1">
            <span className="font-semibold text-xl">Category:</span>
            <span className="ml-1">{products.category}</span>
          </div>
          <hr className="mt-4 text-gray-200" aria-hidden="true" />
          <div className="mt-4">
            <h2 className="text-3xl font-bold">Description</h2>
            <p className="mt-4">{products.description}</p>
          </div>
          <hr className="mt-4 text-gray-200" aria-hidden="true" />
          <div className="mt-4">
            <h2 className="text-3xl font-bold">Reviews</h2>
            <div className="mt-4">
              {products.reviews.map((review, index) => (
                <div key={index} className="mb-3">
                  <div className="flex items-center justify-between w-[40%]">
                    <h3 className="text-xl font-semibold">
                      {review.reviewerName}
                    </h3>
                    <div className="flex items-center text-2xl ml-6">
                      <StarRating rating={review.rating} />
                      {`(${review.rating.toFixed(1)})`}{' '}
                      <span className="sr-only">rating</span>
                    </div>
                  </div>
                  <p className="mt-1.5">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
