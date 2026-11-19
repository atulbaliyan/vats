import { Product, ProductSize, SportType } from '../types';
import { FilterState } from '../components/products/ProductFilters';
import { SortOption } from '../components/products/SortDropdown';

export const ALL_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const ALL_SPORTS: SportType[] = [
  'Training',
  'Running',
  'Cricket',
  'Football',
  'Gym & Fitness',
  'Lifestyle',
];
export const DEFAULT_MAX_PRICE = 5000;
export const DEFAULT_MIN_PRICE = 999;

/**
 * Creates the initial or reset filter state
 */
export function createDefaultFilters(
  maxPriceLimit: number = DEFAULT_MAX_PRICE,
  initialSport?: SportType | null,
  initialSub?: string | null
): FilterState {
  return {
    sports: initialSport ? [initialSport] : [],
    sizes: [],
    subCategories: initialSub ? [initialSub] : [],
    maxPrice: maxPriceLimit,
  };
}

/**
 * Pure function: Filters products according to multi-dimensional criteria
 */
export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    // 1. Sport filter
    if (filters.sports.length > 0 && !filters.sports.includes(product.sport)) {
      return false;
    }

    // 2. Size filter (product must offer at least one selected size)
    if (
      filters.sizes.length > 0 &&
      !product.sizes.some((size) => filters.sizes.includes(size))
    ) {
      return false;
    }

    // 3. Subcategory / apparel type filter
    if (
      filters.subCategories.length > 0 &&
      !filters.subCategories.includes(product.subCategory)
    ) {
      return false;
    }

    // 4. Price filter
    if (product.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

/**
 * Pure function: Sorts products immutably based on the requested sort strategy
 */
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const cloned = [...products];

  switch (sortBy) {
    case 'price-asc':
      return cloned.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return cloned.sort((a, b) => b.price - a.price);

    case 'rating':
      return cloned.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

    case 'newest':
      return cloned.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    case 'featured':
    default:
      return cloned.sort((a, b) => {
        const aScore = (a.isBestSeller ? 2 : 0) + (a.isTrending ? 1 : 0);
        const bScore = (b.isBestSeller ? 2 : 0) + (b.isTrending ? 1 : 0);
        return bScore - aScore;
      });
  }
}

/**
 * Dynamically extracts available filter facet values from a collection of products
 */
export function deriveAvailableFilters(products: Product[]) {
  const sportsSet = new Set<SportType>();
  const subCategorySet = new Set<string>();
  const sizesSet = new Set<ProductSize>();

  let maxPrice = DEFAULT_MIN_PRICE;
  let minPrice = Infinity;

  products.forEach((p) => {
    sportsSet.add(p.sport);
    subCategorySet.add(p.subCategory);
    p.sizes.forEach((s) => sizesSet.add(s));

    if (p.price > maxPrice) maxPrice = p.price;
    if (p.price < minPrice) minPrice = p.price;
  });

  return {
    availableSports: Array.from(sportsSet),
    availableSubCategories: Array.from(subCategorySet),
    availableSizes: ALL_SIZES.filter((s) => sizesSet.has(s)),
    minPrice: minPrice === Infinity ? DEFAULT_MIN_PRICE : minPrice,
    maxPriceLimit: Math.max(DEFAULT_MAX_PRICE, Math.ceil(maxPrice / 500) * 500),
  };
}
