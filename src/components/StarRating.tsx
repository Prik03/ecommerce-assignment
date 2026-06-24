import { IoMdStar } from 'react-icons/io';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <IoMdStar
            key={i}
            className={
              i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'
            }
            aria-hidden="true"
          />
        ))}
      </div>
    </>
  );
};

export default StarRating;
