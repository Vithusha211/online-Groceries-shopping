import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackNavigator } from './AuthStack';
import { FilterProvider } from './FilterContext';
import { MainStackNavigator } from './MainStack';
import { navigationRef } from './navigationRef';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <FilterProvider>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
          <Stack.Screen name="Main" component={MainStackNavigator} />
        </Stack.Navigator>
      </FilterProvider>
    </NavigationContainer>
  );
}
