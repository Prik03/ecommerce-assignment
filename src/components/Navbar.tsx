import { IoMdCart, IoMdClose, IoMdMenu, IoMdSearch } from 'react-icons/io';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          placeholder="Search Products ..."
          className="bg-white text-black border-none focus:outline-none"
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
