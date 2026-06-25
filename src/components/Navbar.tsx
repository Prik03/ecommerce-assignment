import { IoMdCart, IoMdClose, IoMdMenu, IoMdSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') ?? '');
  const location = useLocation();
  const navigate = useNavigate();
  const toggleFilterOpen = useProductStore((state) => state.toggleFilterOpen);
  const { isFilterOpen } = useProductStore();

  useEffect(() => {
    setSearchValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set('q', value.trim());
    } else {
      nextParams.delete('q');
    }

    nextParams.set('page', '1');
    setSearchParams(nextParams, { replace: true });
  };

  const handleMenuClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    toggleFilterOpen();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <button
        className="rounded px-4 py-2 text-4xl font-bold text-white"
        aria-label="Open filters"
        onClick={handleMenuClick}
        aria-expanded={isFilterOpen}
      >
        <IoMdMenu
          aria-hidden="true"
          className={isFilterOpen ? 'hidden' : 'block'}
        />
        <IoMdClose
          aria-hidden="true"
          className={isFilterOpen ? 'block' : 'hidden'}
        />
      </button>
      <div className="flex items-center space-x-2 bg-white text-black rounded p-2 w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/3">
        <IoMdSearch aria-hidden="true" className="text-gray-500 text-2xl" />
        <input
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search Products ..."
          className="bg-white text-black border-none focus:outline-none w-full"
          aria-label="Search"
        />
      </div>
      <div>
        <button
          className="text-white font-bold py-2 px-4 rounded text-4xl"
          aria-label="Cart"
        >
          <IoMdCart aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
