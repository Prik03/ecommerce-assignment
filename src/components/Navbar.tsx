import { IoMdCart, IoMdClose, IoMdMenu, IoMdSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') ?? '');

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

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <button
        className="text-white font-bold py-2 px-4 rounded text-4xl"
        aria-label="Menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
      >
        <IoMdMenu
          aria-hidden="true"
          className={isMenuOpen ? 'hidden' : 'block'}
        />
        <IoMdClose
          aria-hidden="true"
          className={isMenuOpen ? 'block' : 'hidden'}
        />
      </button>
      <div className="flex items-center space-x-2 bg-white text-black rounded p-2 w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/3">
        <IoMdSearch aria-hidden="true" />
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
