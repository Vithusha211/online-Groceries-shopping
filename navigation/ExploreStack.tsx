import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CategoryProductsScreenConnector,
  ExploreScreenConnector,
  SearchResultsScreenConnector,
} from './ScreenConnectors';
import type { ExploreStackParamList } from './types';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export function ExploreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreHome" component={ExploreScreenConnector} />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreenConnector}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreenConnector}
      />
    </Stack.Navigator>
  );
}
