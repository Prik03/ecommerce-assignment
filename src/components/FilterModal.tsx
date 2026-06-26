import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useProductStore } from '../store/useProductStore';

const FilterModal = () => {
  const {
    isFilterOpen,
    selectedCategories,
    selectedBrands,
    toggleCategory,
    toggleBrand,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    clearFilters,
    categories,
    brands,
  } = useProductStore();

  const [filterSearch, setFilterSearch] = useState('');
  const term = filterSearch.trim().toLowerCase();

  const filteredCategories = term
    ? categories.filter((category) => category.toLowerCase().includes(term))
    : categories;

  const filteredBrands = term
    ? brands.filter((brand) => brand.toLowerCase().includes(term))
    : brands;

  return (
    <>
      <aside
        className={`sm:mt-0 left-0 sm:top-0 h-[88vh] sm:h-230 w-full max-w-full sm:max-w-[20%] z-50 sm:z-0 bg-[#f3f2f4] shadow-2xl overflow-auto p-4 transition-transform duration-300 fixed sm:sticky pb-10 ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isFilterOpen ? 'block' : 'hidden'}`}
        aria-label="Filter products"
      >
        <div className="mt-6 space-y-6 overflow-y-auto sticky top-0">
          <div className="flex items-center gap-2 rounded border border-gray-300 px-2 py-2 bg-white">
            <IoMdSearch className="text-gray-500 text-2xl" />
            <input
              type="text"
              value={filterSearch}
              onChange={(event) => setFilterSearch(event.target.value)}
              placeholder="Search..."
              className="w-full border-none text-sm outline-none"
              aria-label="Search Categories or Brands"
            />
          </div>
          <hr aria-hidden="true" className="text-gray-300 mt-2" />
          <section role="group" aria-labelledby="CategoriesGroup">
            <h3 className="mb-2 font-semibold" id="CategoriesGroup">
              Categories
            </h3>
            <div className="space-y-2 pr-1 p-2">
              {filteredCategories.map((category) => {
                const isChecked = selectedCategories.includes(category);
                return (
                  <label
                    key={category}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
                    />
                    <span>{category}</span>
                  </label>
                );
              })}
            </div>
          </section>
          <hr aria-hidden="true" className="text-gray-300 mt-2" />
          <section role="group" aria-labelledby="PriceGroup">
            <h3 className="mb-2 font-semibold" id="PriceGroup">
              Price range
            </h3>
            <div className="flex gap-3">
              <label className="flex-1 text-sm text-gray-600">
                Min
                <input
                  type="number"
                  min="0"
                  value={minPrice ?? ''}
                  placeholder="Min"
                  onChange={(event) =>
                    setMinPrice(
                      event.target.value ? Number(event.target.value) : null
                    )
                  }
                  className="mt-1 w-full rounded border border-gray-300 p-2 bg-white"
                />
              </label>
              <label className="flex-1 text-sm text-gray-600">
                Max
                <input
                  type="number"
                  min="0"
                  value={maxPrice ?? ''}
                  placeholder="Max"
                  onChange={(event) =>
                    setMaxPrice(
                      event.target.value ? Number(event.target.value) : null
                    )
                  }
                  className="mt-1 w-full rounded border border-gray-300 p-2 bg-white"
                />
              </label>
            </div>
          </section>
          <hr aria-hidden="true" className="text-gray-300 mt-2" />
          <section role="group" aria-labelledby="BrandsGroup">
            <h3 className="mb-2 font-semibold" id="BrandsGroup">
              Brands
            </h3>
            <div className="space-y-2 pr-1 p-2">
              {filteredBrands.map((brand) => {
                const isChecked = selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleBrand(brand)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800"
                    />
                    <span>{brand}</span>
                  </label>
                );
              })}
            </div>
          </section>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={clearFilters}
              disabled={
                selectedCategories.length === 0 &&
                selectedBrands.length === 0 &&
                minPrice === null &&
                maxPrice === null
              }
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Reset Filter"
            >
              Reset
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterModal;
