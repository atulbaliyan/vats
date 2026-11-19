import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { TeamwearPage } from './pages/TeamwearPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchPage } from './pages/SearchPage';
import { CheckoutPage } from './pages/CheckoutPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Store Routes */}
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="men" element={<CategoryPage />} />
          <Route path="women" element={<CategoryPage />} />
          <Route path="sports" element={<CategoryPage />} />
          <Route path="collections" element={<CategoryPage />} />
          <Route path="teamwear" element={<TeamwearPage />} />
          <Route path="product/:slug" element={<ProductDetailPage />} />

          {/* Commerce & Account Routes */}
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="search" element={<SearchPage />} />

          {/* Editorial & Information */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
