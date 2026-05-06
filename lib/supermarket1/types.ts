export type Money = number;

export type StoreTheme = {
  primary: string; primaryFg: string; accent: string;
  secondary?: string; text?: string;
  background: string; foreground: string; muted: string;
  surface: string; border: string; radius: "sm"|"md"|"lg";
  buttonRadius?: string; cardRadius?: string; fontStyle?: string;
};

export type StoreLogo = { src?: string; alt: string; text: string; };

export type StoreContact = {
  email: string; phone: string; address: string; hours?: string; phone2?: string;
};

export type StoreSocial = {
  instagram?: string; facebook?: string; twitter?: string; youtube?: string;
};

export type ProductBadge = "sale"|"new"|"hot"|"organic"|null;

export type Product = {
  id: string; handle: string; name: string;
  shortDescription?: string; description?: string;
  category?: string; images: string[];
  badge?: string | null; featured?: boolean; active?: boolean;
  price: Money; compareAtPrice?: Money; unit?: string; stock?: number;
  rating?: number;
};

export type Category = {
  id: string; handle: string; name: string;
  image?: string; icon?: string; parent?: string; active?: boolean;
};

export type HomeSection = { id: string; label: string; active: boolean; title?: string; subtitle?: string; };

export type AnnouncementBar = { text: string; active: boolean; };

export type SiteConfig = {
  name: string; tagline: string;
  logo: StoreLogo; theme: StoreTheme;
  contact: StoreContact; social: StoreSocial;
  announcement: AnnouncementBar;
  sections: HomeSection[];
  categories: Category[];
  products: Product[];
};
