export interface JewelryShop1Config {
  brand: {
    name: string;
    tagline: string;
    logo: string;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    fax: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  hero: {
    slides: Array<{
      id: string;
      heading: string;
      image: string;
    }>;
  };
  about: {
    heading: string;
    subtitle: string;
    description: string;
    image: string;
    phone: string;
    year: string;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    count: number;
  }>;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    featured: boolean;
    inStock: boolean;
    likes: number;
    description: string;
    sizes: string[];
    colors: string[];
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    text: string;
    image: string;
  }>;
  blog: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
    category: string;
  }>;
  instagram: string[];
  shipping: {
    freeShippingMin: number;
    standardRate: number;
    expressRate: number;
  };
  footer: {
    description: string;
    copyright: string;
  };
}
