import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProductDetailData } from '../screens/ProductDetailScreen';

export type HomeProduct = {
  id: string;
  title: string;
  meta: string;
  price: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBackground: string;
};

const PRODUCT_DETAILS: Record<string, ProductDetailData> = {
  apple: {
    id: 'apple',
    title: 'Naturel Red Apple',
    meta: '1kg, Price',
    price: '$4.99',
    iconName: 'food-apple',
    iconColor: '#E74C3C',
    iconBackground: '#FFF0F0',
    nutritionLabel: '100gr',
    rating: 5,
  },
  bananas: {
    id: 'bananas',
    title: 'Organic Bananas',
    meta: '7pcs, Priceg',
    price: '$4.99',
    iconName: 'fruit-citrus',
    iconColor: '#F5C542',
    iconBackground: '#FFF8E8',
    nutritionLabel: '100gr',
    rating: 5,
  },
  pepper: {
    id: 'pepper',
    title: 'Bell Pepper Red',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'chili-hot',
    iconColor: '#E74C3C',
    iconBackground: '#FFF0F0',
    nutritionLabel: '100gr',
    rating: 4,
  },
  ginger: {
    id: 'ginger',
    title: 'Ginger',
    meta: '250gm, Priceg',
    price: '$4.99',
    iconName: 'seed',
    iconColor: '#D4A574',
    iconBackground: '#FBF4EC',
    nutritionLabel: '100gr',
    rating: 5,
  },
  beef: {
    id: 'beef',
    title: 'Beef Bone',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'food-steak',
    iconColor: '#C0392B',
    iconBackground: '#FFF0EE',
    nutritionLabel: '100gr',
    rating: 4,
  },
  chicken: {
    id: 'chicken',
    title: 'Broiler Chicken',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'food-drumstick',
    iconColor: '#E67E22',
    iconBackground: '#FFF4E8',
    nutritionLabel: '100gr',
    rating: 5,
  },
  'diet-coke': {
    id: 'diet-coke',
    title: 'Diet Coke',
    meta: '355ml, Price',
    price: '$1.99',
    iconName: 'bottle-soda',
    iconColor: '#C0392B',
    iconBackground: '#FFF5F5',
    nutritionLabel: '100ml',
    rating: 4,
  },
  sprite: {
    id: 'sprite',
    title: 'Sprite Can',
    meta: '325ml, Price',
    price: '$1.50',
    iconName: 'bottle-soda',
    iconColor: '#27AE60',
    iconBackground: '#F0FFF5',
    nutritionLabel: '100ml',
    rating: 5,
  },
  'apple-grape-juice': {
    id: 'apple-grape-juice',
    title: 'Apple & Grape Juice',
    meta: '2L, Price',
    price: '$15.99',
    iconName: 'cup',
    iconColor: '#8E44AD',
    iconBackground: '#F8F0FF',
    nutritionLabel: '100ml',
    rating: 5,
  },
  'orange-juice': {
    id: 'orange-juice',
    title: 'Orange Juice',
    meta: '2L, Price',
    price: '$15.99',
    iconName: 'fruit-citrus',
    iconColor: '#E67E22',
    iconBackground: '#FFF8F0',
    nutritionLabel: '100ml',
    rating: 5,
  },
  'coca-cola': {
    id: 'coca-cola',
    title: 'Coca Cola Can',
    meta: '325ml, Price',
    price: '$4.99',
    iconName: 'bottle-soda',
    iconColor: '#C0392B',
    iconBackground: '#FFF0F0',
    nutritionLabel: '100ml',
    rating: 4,
  },
  pepsi: {
    id: 'pepsi',
    title: 'Pepsi Can',
    meta: '330ml, Price',
    price: '$4.99',
    iconName: 'bottle-soda',
    iconColor: '#2980B9',
    iconBackground: '#F0F8FF',
    nutritionLabel: '100ml',
    rating: 4,
  },
  'egg-chicken-red': {
    id: 'egg-chicken-red',
    title: 'Egg Chicken Red',
    meta: '4pcs, Price',
    price: '$1.99',
    iconName: 'egg',
    iconColor: '#C0392B',
    iconBackground: '#FFF5F5',
    nutritionLabel: '100gr',
    rating: 5,
  },
  'egg-chicken-white': {
    id: 'egg-chicken-white',
    title: 'Egg Chicken White',
    meta: '180g, Price',
    price: '$1.50',
    iconName: 'egg',
    iconColor: '#BDC3C7',
    iconBackground: '#F8F8F8',
    nutritionLabel: '100gr',
    rating: 5,
  },
  'egg-pasta': {
    id: 'egg-pasta',
    title: 'Egg Pasta',
    meta: '30gm, Price',
    price: '$15.99',
    iconName: 'pasta',
    iconColor: '#D4A056',
    iconBackground: '#FFF8E8',
    nutritionLabel: '100gr',
    rating: 4,
  },
  'egg-noodles': {
    id: 'egg-noodles',
    title: 'Egg Noodles',
    meta: '30gm, Price',
    price: '$15.99',
    iconName: 'noodles',
    iconColor: '#E67E22',
    iconBackground: '#FFF4E8',
    nutritionLabel: '100gr',
    rating: 4,
  },
  'mayonnaise-eggless': {
    id: 'mayonnaise-eggless',
    title: 'Mayonnais Eggless',
    meta: '500ml, Price',
    price: '$9.99',
    iconName: 'bottle-tonic',
    iconColor: '#F5C542',
    iconBackground: '#FFFCE8',
    nutritionLabel: '100gr',
    rating: 4,
  },
  'egg-noodles-pack': {
    id: 'egg-noodles-pack',
    title: 'Egg Noodles',
    meta: '30gm, Price',
    price: '$12.99',
    iconName: 'noodles',
    iconColor: '#D35400',
    iconBackground: '#FFF0E8',
    nutritionLabel: '100gr',
    rating: 5,
  },
};

const CATEGORY_PRODUCT_IDS: Record<string, string[]> = {
  beverages: [
    'diet-coke',
    'sprite',
    'apple-grape-juice',
    'orange-juice',
    'coca-cola',
    'pepsi',
  ],
};

export function getProductDetail(id: string): ProductDetailData | undefined {
  return PRODUCT_DETAILS[id];
}

export function getCategoryProducts(categoryId: string): HomeProduct[] {
  const ids = CATEGORY_PRODUCT_IDS[categoryId] ?? [];
  return ids
    .map((id) => PRODUCT_DETAILS[id])
    .filter((product): product is ProductDetailData => Boolean(product))
    .map(toHomeProduct);
}

function toHomeProduct({
  id,
  title,
  meta,
  price,
  iconName,
  iconColor,
  iconBackground,
}: ProductDetailData): HomeProduct {
  return {
    id,
    title,
    meta,
    price,
    iconName,
    iconColor,
    iconBackground,
  };
}

export function searchProducts(query: string): HomeProduct[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  return Object.values(PRODUCT_DETAILS)
    .filter((product) => product.title.toLowerCase().includes(normalizedQuery))
    .map(toHomeProduct);
}

export const EXCLUSIVE_OFFERS: HomeProduct[] = [
  {
    id: 'bananas',
    title: 'Organic Bananas',
    meta: '7pcs, Priceg',
    price: '$4.99',
    iconName: 'fruit-citrus',
    iconColor: '#F5C542',
    iconBackground: '#FFF8E8',
  },
  {
    id: 'apple',
    title: 'Red Apple',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'food-apple',
    iconColor: '#E74C3C',
    iconBackground: '#FFF0F0',
  },
];

export const BEST_SELLING: HomeProduct[] = [
  {
    id: 'pepper',
    title: 'Bell Pepper Red',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'chili-hot',
    iconColor: '#E74C3C',
    iconBackground: '#FFF0F0',
  },
  {
    id: 'ginger',
    title: 'Ginger',
    meta: '250gm, Priceg',
    price: '$4.99',
    iconName: 'seed',
    iconColor: '#D4A574',
    iconBackground: '#FBF4EC',
  },
];

export const GROCERY_PRODUCTS: HomeProduct[] = [
  {
    id: 'beef',
    title: 'Beef Bone',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'food-steak',
    iconColor: '#C0392B',
    iconBackground: '#FFF0EE',
  },
  {
    id: 'chicken',
    title: 'Broiler Chicken',
    meta: '1kg, Priceg',
    price: '$4.99',
    iconName: 'food-drumstick',
    iconColor: '#E67E22',
    iconBackground: '#FFF4E8',
  },
];
