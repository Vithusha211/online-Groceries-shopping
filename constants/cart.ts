import { HomeProduct, getProductDetail } from './products';

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
};

export const DEFAULT_CART_ITEMS: CartItem[] = [
  { id: 'cart-pepper', productId: 'pepper', quantity: 1 },
  { id: 'cart-egg', productId: 'egg-chicken-red', quantity: 1 },
];

export const CHECKOUT_TOTAL = '$13.97';

export function getCartLineProduct(productId: string): HomeProduct | null {
  const product = getProductDetail(productId);
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    title: product.title,
    meta: product.meta,
    price: product.price,
    iconName: product.iconName,
    iconColor: product.iconColor,
    iconBackground: product.iconBackground,
  };
}
