import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Loading: undefined;
  Welcome: undefined;
  Number: undefined;
  Mobile: undefined;
  Verification: undefined;
  Location: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type ExploreStackParamList = {
  ExploreHome: undefined;
  SearchResults: { query: string };
  CategoryProducts: { categoryId: string };
};

export type MainTabParamList = {
  Shop: undefined;
  Explore: NavigatorScreenParams<ExploreStackParamList>;
  Favourite: undefined;
  Cart: undefined;
  Account: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ProductDetail: { productId: string };
  Filters: undefined;
  OrderAccepted: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};
