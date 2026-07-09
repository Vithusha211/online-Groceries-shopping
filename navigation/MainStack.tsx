import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FilterScreenConnector,
  OrderAcceptedScreenConnector,
  ProductDetailScreenConnector,
} from './ScreenConnectors';
import { MainTabsNavigator } from './MainTabs';
import type { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreenConnector} />
      <Stack.Screen
        name="Filters"
        component={FilterScreenConnector}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="OrderAccepted"
        component={OrderAcceptedScreenConnector}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
}
