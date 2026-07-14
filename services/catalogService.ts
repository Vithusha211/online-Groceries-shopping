import { apiRequest } from './api';
import type { ApiCategory, ApiProduct } from './types';

export async function fetchProducts(params?: {
  q?: string;
  categoryId?: string;
  section?: string;
  brands?: string[];
  filterCategories?: string[];
}) {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.categoryId) search.set('categoryId', params.categoryId);
  if (params?.section) search.set('section', params.section);
  if (params?.brands?.length) search.set('brands', params.brands.join(','));
  if (params?.filterCategories?.length) {
    search.set('filterCategories', params.filterCategories.join(','));
  }
  const query = search.toString();
  const data = await apiRequest<{ success: boolean; products: ApiProduct[] }>(
    `/products${query ? `?${query}` : ''}`,
  );
  return data.products;
}

export async function fetchProduct(slug: string) {
  const data = await apiRequest<{ success: boolean; product: ApiProduct }>(
    `/products/${encodeURIComponent(slug)}`,
  );
  return data.product;
}

export async function fetchCategories() {
  const data = await apiRequest<{ success: boolean; categories: ApiCategory[] }>(
    '/categories',
  );
  return data.categories;
}

export async function fetchCategoryProducts(slug: string) {
  const data = await apiRequest<{
    success: boolean;
    category: { id: string; title: string };
    products: ApiProduct[];
  }>(`/categories/${encodeURIComponent(slug)}/products`);
  return data;
}

export async function fetchFilterOptions() {
  const data = await apiRequest<{
    success: boolean;
    categories: { id: string; label: string }[];
    brands: { id: string; label: string }[];
  }>('/filters/options');
  return data;
}

export async function fetchZones() {
  const data = await apiRequest<{
    success: boolean;
    zones: { id: string; name: string }[];
  }>('/locations/zones');
  return data.zones;
}
