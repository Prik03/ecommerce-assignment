# Leegality E-commerce Assignment

A React + TypeScript + Vite ecommerce product listing application that fetches product data from the DummyJSON API, displays products in a paginated grid, and supports filtering, search, and product detail navigation.

## Features

- Product listing page with pagination
- Product detail page with product information and reviews
- Filter sidebar with category, brand, and price-range filters
- Search by product name using the navbar
- Shared state management with Zustand
- Loading skeletons and responsive product cards

## Setup instructions

1. Install dependencies:
   - npm install
2. Start the development server:
   - npm run dev
3. Build for production:
   - npm run build
4. Run lint checks:
   - npm run lint

## Assumptions made

- Product data is fetched from the public DummyJSON API.
- The listing page loads a larger batch of products client-side and applies filters before pagination.
- The filter drawer is intended for a simple assignment-level ecommerce experience rather than a full backend-driven filtering system.
- The app uses the current route and shared store state to preserve filters while navigating between pages.

## Architectural decisions

- React + Vite + TypeScript was used for a fast and modern frontend setup.
- Zustand was chosen for shared state across the product list, filters, and modal UI.
- React Router handles navigation between the listing page and product detail page.
- Axios is used in the API layer to keep product requests centralized in one place.
- Components such as ProductCard, ProductsContainer, FilterModal, Pagination, and Skeleton were separated to keep the UI modular and easier to maintain.

## Improvements if given more time

- Add server-side filtering and pagination for better performance.
- Add unit and integration tests with Vitest or React Testing Library.
- Improve accessibility further for keyboard navigation and screen readers.
- Add more filter options such as rating, stock status, and sorting.
- Add better error handling and empty-state UX for failed API requests.
