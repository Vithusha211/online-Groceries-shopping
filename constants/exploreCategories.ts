import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ExploreCategory = {
  id: string;
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
};

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: 'fruits-vegetables',
    title: 'Frash Fruits & Vegetable',
    iconName: 'fruit-grapes',
    iconColor: '#6B8E4E',
    backgroundColor: '#E8F4E0',
  },
  {
    id: 'oil-ghee',
    title: 'Cooking Oil & Ghee',
    iconName: 'bottle-tonic',
    iconColor: '#D4A056',
    backgroundColor: '#F8E8D8',
  },
  {
    id: 'meat-fish',
    title: 'Meat & Fish',
    iconName: 'food-steak',
    iconColor: '#C97B7B',
    backgroundColor: '#FFE8E8',
  },
  {
    id: 'bakery-snacks',
    title: 'Bakery & Snacks',
    iconName: 'bread-slice',
    iconColor: '#9B7BB8',
    backgroundColor: '#F0E8F8',
  },
  {
    id: 'dairy-eggs',
    title: 'Dairy & Eggs',
    iconName: 'cheese',
    iconColor: '#C9A84C',
    backgroundColor: '#FFF8E0',
  },
  {
    id: 'beverages',
    title: 'Beverages',
    iconName: 'bottle-soda',
    iconColor: '#5B8FA8',
    backgroundColor: '#E8F0F8',
  },
];
