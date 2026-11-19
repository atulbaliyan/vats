import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CategoryType } from '../types';
import { useProductFilter } from '../hooks/useProductFilter';
import { CatalogLayout } from '../components/products/CatalogLayout';

export const CategoryPage: React.FC = () => {
  const location = useLocation();

  // Determine active category and editorial metadata from route path
  const { activeCategory, pageTitle, pageSubtitle } = useMemo(() => {
    if (location.pathname.startsWith('/women')) {
      return {
        activeCategory: 'women' as CategoryType,
        pageTitle: "Women's Activewear",
        pageSubtitle:
          'Sculpt seamless compression, squat-proof leggings, and medium-impact sports bras.',
      };
    }
    if (location.pathname.startsWith('/sports')) {
      return {
        activeCategory: 'sports' as CategoryType,
        pageTitle: 'Sports & Disciplines',
        pageSubtitle:
          'Performance gear purpose-built for cricket, football, running, and heavy fitness.',
      };
    }
    if (location.pathname.startsWith('/collections')) {
      return {
        activeCategory: 'collections' as CategoryType,
        pageTitle: 'Collections & Limited Drops',
        pageSubtitle:
          'Heavyweight 280 GSM cotton drops and bonded tech fleece streetwear capsules.',
      };
    }
    return {
      activeCategory: 'men' as CategoryType,
      pageTitle: "Men's Performance",
      pageSubtitle:
        'Engineered training gear, moisture-wicking tees, and tapered track pants.',
    };
  }, [location.pathname]);

  // Derive base products for this specific category slice
  const baseProducts = useMemo(() => {
    if (activeCategory === 'sports') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const filterResult = useProductFilter(baseProducts);

  return (
    <CatalogLayout
      categoryTag={`CATEGORY // ${activeCategory.toUpperCase()}`}
      title={pageTitle}
      description={pageSubtitle}
      products={filterResult.products}
      totalCount={filterResult.totalCount}
      filters={filterResult.filters}
      sortBy={filterResult.sortBy}
      availableSports={filterResult.availableSports}
      availableSizes={filterResult.availableSizes}
      availableSubCategories={filterResult.availableSubCategories}
      minPrice={filterResult.minPrice}
      maxPriceLimit={filterResult.maxPriceLimit}
      onFilterChange={filterResult.setFilters}
      onResetFilters={filterResult.resetFilters}
      onSortChange={filterResult.setSortBy}
    />
  );
};
