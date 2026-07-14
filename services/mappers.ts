import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { HomeProduct } from '../constants/products';
import type { ProductDetailData } from '../screens/ProductDetailScreen';
import type { ApiProduct } from './types';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export function toHomeProduct(product: ApiProduct): HomeProduct {
  return {
    id: product.slug || product.id,
    title: product.title,
    meta: product.meta,
    price: product.price,
    iconName: product.iconName as IconName,
    iconColor: product.iconColor,
    iconBackground: product.iconBackground,
  };
}

export function toProductDetail(product: ApiProduct): ProductDetailData {
  return {
    id: product.slug || product.id,
    title: product.title,
    meta: product.meta,
    price: product.price,
    iconName: product.iconName as IconName,
    iconColor: product.iconColor,
    iconBackground: product.iconBackground,
    description: product.description,
    nutritionLabel: product.nutritionLabel,
    rating: product.rating,
  };
}
