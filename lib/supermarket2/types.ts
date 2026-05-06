export interface Product {
  id: number;
  slug: string;
  image: string;
  bannerImg?: string;
  category?: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  price?: string;
  descripTion?: string;
}

export interface Post {
  id: number;
  slug: string;
  image: string;
  bannerImg?: string;
  category?: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  descripTion?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  slug: string;
}

export interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  active: boolean;
}

export interface WishlistItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CompareItem {
  image: string;
  name: string;
  price: string;
  description: string;
  rating: number;
  ratingCount: number;
  weight: string;
  inStock: boolean;
}
