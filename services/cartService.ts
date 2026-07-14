import { apiRequest } from './api';
import type { ApiCartLine, ApiProduct } from './types';

export async function fetchCart() {
  const data = await apiRequest<{ success: boolean; items: ApiCartLine[] }>(
    '/cart',
    { auth: true },
  );
  return data.items;
}

export async function addCartItem(productId: string, quantity = 1) {
  const data = await apiRequest<{ success: boolean; items: ApiCartLine[] }>(
    '/cart/items',
    {
      method: 'POST',
      auth: true,
      body: { productId, quantity },
    },
  );
  return data.items;
}

export async function updateCartItem(productId: string, quantity: number) {
  const data = await apiRequest<{ success: boolean; items: ApiCartLine[] }>(
    `/cart/items/${encodeURIComponent(productId)}`,
    {
      method: 'PATCH',
      auth: true,
      body: { quantity },
    },
  );
  return data.items;
}

export async function removeCartItem(productId: string) {
  const data = await apiRequest<{ success: boolean; items: ApiCartLine[] }>(
    `/cart/items/${encodeURIComponent(productId)}`,
    {
      method: 'DELETE',
      auth: true,
    },
  );
  return data.items;
}

export async function bulkAddCartItems(
  items: { productId: string; quantity?: number }[],
) {
  const data = await apiRequest<{ success: boolean; items: ApiCartLine[] }>(
    '/cart/items/bulk',
    {
      method: 'POST',
      auth: true,
      body: { items },
    },
  );
  return data.items;
}

export async function fetchFavourites() {
  const data = await apiRequest<{ success: boolean; products: ApiProduct[] }>(
    '/favourites',
    { auth: true },
  );
  return data.products;
}

export async function addFavourite(productId: string) {
  const data = await apiRequest<{ success: boolean; product: ApiProduct }>(
    '/favourites',
    {
      method: 'POST',
      auth: true,
      body: { productId },
    },
  );
  return data.product;
}

export async function removeFavourite(productId: string) {
  await apiRequest<{ success: boolean }>(
    `/favourites/${encodeURIComponent(productId)}`,
    {
      method: 'DELETE',
      auth: true,
    },
  );
}

export async function createOrder(payload?: {
  deliveryMethod?: string;
  paymentLabel?: string;
  promoCode?: string;
}) {
  const data = await apiRequest<{
    success: boolean;
    order: { id: string; total: string; status: string };
  }>('/orders', {
    method: 'POST',
    auth: true,
    body: payload ?? {},
  });
  return data.order;
}
