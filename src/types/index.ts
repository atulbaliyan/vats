export type SportType = 'Training' | 'Running' | 'Cricket' | 'Football' | 'Gym & Fitness' | 'Lifestyle';

export type CategoryType = 'men' | 'women' | 'sports' | 'collections' | 'teamwear';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  subCategory: string; // e.g. "T-Shirts", "Trackpants", "Hoodies", "Jerseys", "Shorts"
  sport: SportType;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  fabricCare: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  defaultColor: string;
}

export interface CartItem {
  id: string; // unique item composite key: `${productId}-${color}-${size}`
  product: Product;
  selectedColor: string;
  selectedSize: ProductSize;
  quantity: number;
}

export interface TeamwearInquiry {
  name: string;
  organization: string;
  email: string;
  phone: string;
  sport: string;
  estimatedQuantity: string;
  customizationRequirements: string;
  message?: string;
}
