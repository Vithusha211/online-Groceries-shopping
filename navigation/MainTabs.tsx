import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Footer, { FooterTab } from '../components/layout/Footer';
import {
  AccountScreenConnector,
  CartScreenConnector,
  FavouriteScreenConnector,
  HomeScreenConnector,
} from './ScreenConnectors';
import { ExploreStackNavigator } from './ExploreStack';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ROUTE_TO_TAB: Record<keyof MainTabParamList, FooterTab> = {
  Shop: 'shop',
  Explore: 'explore',
  Favourite: 'favourite',
  Cart: 'cart',
  Account: 'account',
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const activeRoute = state.routes[state.index].name as keyof MainTabParamList;
  const activeTab = ROUTE_TO_TAB[activeRoute];

  return (
    <Footer
      activeTab={activeTab}
      onTabPress={(tab) => {
        const routeName = (Object.keys(ROUTE_TO_TAB) as (keyof MainTabParamList)[]).find(
          (key) => ROUTE_TO_TAB[key] === tab,
        );
        if (routeName) {
          navigation.navigate(routeName);
        }
      }}
    />
  );
}

export function MainTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Shop" component={HomeScreenConnector} />
      <Tab.Screen name="Explore" component={ExploreStackNavigator} />
      <Tab.Screen name="Favourite" component={FavouriteScreenConnector} />
      <Tab.Screen name="Cart" component={CartScreenConnector} />
      <Tab.Screen name="Account" component={AccountScreenConnector} />
    </Tab.Navigator>
  );
}
