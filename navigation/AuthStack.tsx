import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoadingScreenConnector,
  LoginScreenConnector,
  MobileNumberScreenConnector,
  NumberSignInScreenConnector,
  SelectLocationScreenConnector,
  SignUpScreenConnector,
  VerificationScreenConnector,
  WelcomeScreenConnector,
} from './ScreenConnectors';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="Loading" component={LoadingScreenConnector} />
      <Stack.Screen name="Welcome" component={WelcomeScreenConnector} />
      <Stack.Screen name="Number" component={NumberSignInScreenConnector} />
      <Stack.Screen name="Mobile" component={MobileNumberScreenConnector} />
      <Stack.Screen
        name="Verification"
        component={VerificationScreenConnector}
      />
      <Stack.Screen name="Location" component={SelectLocationScreenConnector} />
      <Stack.Screen name="Login" component={LoginScreenConnector} />
      <Stack.Screen name="SignUp" component={SignUpScreenConnector} />
    </Stack.Navigator>
  );
}
