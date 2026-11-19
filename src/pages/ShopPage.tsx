import React from 'react';
import { PRODUCTS } from '../data/products';
import { useProductFilter } from '../hooks/useProductFilter';
import { CatalogLayout } from '../components/products/CatalogLayout';

export const ShopPage: React.FC = () => {
  const filterResult = useProductFilter(PRODUCTS);

  return (
    <CatalogLayout
      categoryTag="PERFORMANCE CATALOG"
      title="Shop All Gear"
      description="Explore the complete line of VATS Sports apparel, engineered for uncompromising durability, moisture dispersion, and athletic mobility."
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
