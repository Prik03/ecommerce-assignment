import { create } from 'zustand';
import { getProducts } from '../api/productApi';

type FilterState = {
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

type ProductStore = FilterState & {
  isFilterOpen: boolean;
  products: Product[];
  totalProducts: number;
  loading: boolean;
  error: string | null;
  categories: string[];
  brands: string[];
  toggleCategory: (value: string) => void;
  toggleBrand: (value: string) => void;
  setMinPrice: (value: number | null) => void;
  setMaxPrice: (value: number | null) => void;
  clearFilters: () => void;
  toggleFilterOpen: () => void;
  closeFilter: () => void;
  fetchProducts: (options: {
    page: number;
    pageSize: number;
    searchTerm?: string;
  }) => Promise<void>;
};

const applyFilters = (items: Product[], filters: FilterState) => {
  return items.filter((item) => {
    const matchesCategory =
      filters.selectedCategories.length === 0 ||
      filters.selectedCategories.includes(item.category);
    const matchesBrand =
      filters.selectedBrands.length === 0 ||
      filters.selectedBrands.includes(item.brand);
    const matchesMinPrice =
      filters.minPrice === null || item.price >= filters.minPrice;
    const matchesMaxPrice =
      filters.maxPrice === null || item.price <= filters.maxPrice;

    return (
      matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice
    );
  });
};

export const useProductStore = create<ProductStore>((set, get) => ({
  selectedCategories: [],
  selectedBrands: [],
  minPrice: null,
  maxPrice: null,
  isFilterOpen: false,
  products: [],
  totalProducts: 0,
  loading: false,
  error: null,
  categories: [],
  brands: [],
  toggleCategory: (value) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(value)
        ? state.selectedCategories.filter((item) => item !== value)
        : [...state.selectedCategories, value],
    })),
  toggleBrand: (value) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(value)
        ? state.selectedBrands.filter((item) => item !== value)
        : [...state.selectedBrands, value],
    })),
  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  clearFilters: () =>
    set({
      selectedCategories: [],
      selectedBrands: [],
      minPrice: null,
      maxPrice: null,
    }),
  toggleFilterOpen: () =>
    set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  closeFilter: () => set({ isFilterOpen: false }),
  fetchProducts: async ({ page, pageSize, searchTerm = '' }) => {
    set({ loading: true, error: null });

    try {
      const limit = 100;
      const data = await getProducts(limit, 0, searchTerm);
      const allProducts: Product[] = Array.isArray(data.products)
        ? data.products
        : [];
      const filteredProducts = applyFilters(allProducts, {
        selectedCategories: get().selectedCategories,
        selectedBrands: get().selectedBrands,
        minPrice: get().minPrice,
        maxPrice: get().maxPrice,
      });
      const skip = (page - 1) * pageSize;
      const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);

      set({
        products: paginatedProducts,
        totalProducts: filteredProducts.length,
        categories: Array.from(
          new Set(
            allProducts
              .map((item: Product) => item.category)
              .filter((category): category is string => Boolean(category))
          )
        ).sort(),
        brands: Array.from(
          new Set(
            allProducts
              .map((item: Product) => item.brand)
              .filter((brand): brand is string => Boolean(brand))
          )
        ).sort(),
      });
    } catch {
      set({
        products: [],
        totalProducts: 0,
        error: 'Failed to fetch products',
      });
    } finally {
      set({ loading: false });
    }
  },
}));
