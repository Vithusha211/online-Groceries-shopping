import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { MainStackParamList } from '../types';

export function useProductNavigation() {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

  return (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };
}
