import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FooterTab } from '../../components/layout/Footer';
import type { MainTabParamList } from '../types';

export function useFooterTabPress() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (tab: FooterTab) => {
    switch (tab) {
      case 'shop':
        navigation.navigate('Shop');
        break;
      case 'explore':
        navigation.navigate('Explore', { screen: 'ExploreHome' });
        break;
      case 'cart':
        navigation.navigate('Cart');
        break;
      case 'favourite':
        navigation.navigate('Favourite');
        break;
      case 'account':
        navigation.navigate('Account');
        break;
    }
  };
}
