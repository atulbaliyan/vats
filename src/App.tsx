import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BrandedLoadingFallback } from './components/common/BrandedLoadingFallback';

// Route-level code splitting via dynamic imports
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const TeamwearPage = lazy(() => import('./pages/TeamwearPage').then((m) => ({ default: m.TeamwearPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Storefront Routes Wrapped in Branded Suspense Fallback */}
          <Route
            index
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="shop"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <ShopPage />
              </Suspense>
            }
          />
          <Route
            path="men"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="women"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="sports"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="collections"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="teamwear"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <TeamwearPage />
              </Suspense>
            }
          />
          <Route
            path="product/:slug"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <ProductDetailPage />
              </Suspense>
            }
          />

          {/* Commerce & Search Routes */}
          <Route
            path="cart"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="wishlist"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <WishlistPage />
              </Suspense>
            }
          />
          <Route
            path="checkout"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <CheckoutPage />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <SearchPage />
              </Suspense>
            }
          />

          {/* Editorial & Information */}
          <Route
            path="about"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<BrandedLoadingFallback />}>
                <ContactPage />
              </Suspense>
            }
          />

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
