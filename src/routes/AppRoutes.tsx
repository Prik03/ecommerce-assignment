import { Routes, Route } from 'react-router-dom';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductOverviewPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductListingPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
  </Routes>
);

export default AppRoutes;
