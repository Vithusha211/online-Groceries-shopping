export type ApiUser = {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  location: { zone: string; area: string } | null;
};

export type ApiProduct = {
  id: string;
  _id: string;
  slug: string;
  title: string;
  meta: string;
  price: string;
  priceValue: number;
  description?: string;
  nutritionLabel?: string;
  rating: number;
  iconName: string;
  iconColor: string;
  iconBackground: string;
  categoryIds: string[];
  filterCategoryIds: string[];
  brandId?: string;
  sections: string[];
};

export type ApiCategory = {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  sortOrder: number;
};

export type ApiCartLine = {
  id: string;
  productId: string;
  quantity: number;
  product: ApiProduct;
};

export type AuthResponse = {
  success: boolean;
  token: string;
  user: ApiUser;
};
