import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { navigateToAuth, navigateToMain } from '../navigationRef';
import type { MainStackParamList } from '../types';

export function useMainStackNavigation() {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

  return {
    navigate(screen: keyof MainStackParamList, params?: object) {
      navigation.navigate(screen as string, params);
    },
    goBack: () => navigation.goBack(),
    reset(state: { index: number; routes: { name: keyof MainStackParamList }[] }) {
      navigation.dispatch(CommonActions.reset(state));
    },
  };
}

export function useRootNavigation() {
  return {
    goToAuth: navigateToAuth,
    goToMain: navigateToMain,
  };
}
