import { FaArrowRightLong } from 'react-icons/fa6';

const Pagination = () => {
  return (
    <nav className="flex justify-center mt-4" aria-label="Pagination">
      <button className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center">
        <FaArrowRightLong className="inline-block mr-1 transform rotate-180" />
        Previous
      </button>
      <ul className="flex items-center">
        <li className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          <a href="/page/1" aria-label="page 1">
            1
          </a>
        </li>
        <li className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          <a href="/page/2" aria-label="page 2">
            2
          </a>
        </li>
        <li className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          <a href="/page/3" aria-label="page 3">
            3
          </a>
        </li>
      </ul>
      <button className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center">
        Next <FaArrowRightLong className="inline-block ml-1" />
      </button>
    </nav>
  );
};

export default Pagination;
