import { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getProductDetail } from '../constants/products';
import AccountScreen from '../screens/AccountScreen';
import CartScreen from '../screens/CartScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import FilterScreen from '../screens/FilterScreen';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MobileNumberScreen from '../screens/MobileNumberScreen';
import NumberSignInScreen from '../screens/NumberSignInScreen';
import OrderAcceptedScreen from '../screens/OrderAcceptedScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useFilterContext } from './FilterContext';
import { useFooterTabPress } from './hooks/useFooterTabPress';
import { useMainStackNavigation, useRootNavigation } from './hooks/useMainStackNavigation';
import { useProductNavigation } from './hooks/useProductNavigation';
import type {
  AuthStackParamList,
  ExploreStackParamList,
  MainStackParamList,
} from './types';

type AuthNavigation = NativeStackNavigationProp<AuthStackParamList>;
type ExploreNavigation = NativeStackNavigationProp<ExploreStackParamList>;

function useAuthFlowNavigation() {
  const navigation = useNavigation<AuthNavigation>();
  const { goToMain } = useRootNavigation();
  return { navigation, goToMain };
}

export function LoadingScreenConnector() {
  const navigation = useNavigation<AuthNavigation>();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Welcome'), 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <LoadingScreen />;
}

export function WelcomeScreenConnector() {
  const navigation = useNavigation<AuthNavigation>();
  return <WelcomeScreen onGetStarted={() => navigation.navigate('Number')} />;
}

export function NumberSignInScreenConnector() {
  const { navigation, goToMain } = useAuthFlowNavigation();
  return (
    <NumberSignInScreen
      onContinue={() => navigation.navigate('Mobile')}
      onFacebook={goToMain}
      onGoogle={goToMain}
    />
  );
}

export function MobileNumberScreenConnector() {
  const { navigation } = useAuthFlowNavigation();
  return (
    <MobileNumberScreen
      onBack={() => navigation.goBack()}
      onNext={() => navigation.navigate('Verification')}
    />
  );
}

export function VerificationScreenConnector() {
  const { navigation } = useAuthFlowNavigation();
  return (
    <VerificationScreen
      onBack={() => navigation.goBack()}
      onNext={() => navigation.navigate('Location')}
    />
  );
}

export function SelectLocationScreenConnector() {
  const { navigation, goToMain } = useAuthFlowNavigation();
  return (
    <SelectLocationScreen
      onBack={() => navigation.goBack()}
      onSubmit={goToMain}
    />
  );
}

export function LoginScreenConnector() {
  const { navigation, goToMain } = useAuthFlowNavigation();
  return (
    <LoginScreen
      onLogin={goToMain}
      onSignUp={() => navigation.navigate('SignUp')}
    />
  );
}

export function SignUpScreenConnector() {
  const { navigation, goToMain } = useAuthFlowNavigation();
  return (
    <SignUpScreen
      onLogin={() => navigation.navigate('Login')}
      onSignUp={goToMain}
    />
  );
}

export function HomeScreenConnector() {
  const openProduct = useProductNavigation();
  return <HomeScreen onProductPress={openProduct} />;
}

export function ExploreScreenConnector() {
  const navigation = useNavigation<ExploreNavigation>();

  return (
    <ExploreScreen
      onCategoryPress={(categoryId) =>
        navigation.navigate('CategoryProducts', { categoryId })
      }
      onSearchSubmit={(query) =>
        navigation.navigate('SearchResults', { query })
      }
    />
  );
}

export function SearchResultsScreenConnector() {
  const navigation = useNavigation<ExploreNavigation>();
  const route = useRoute<RouteProp<ExploreStackParamList, 'SearchResults'>>();
  const mainNavigation = useMainStackNavigation();
  const openProduct = useProductNavigation();

  return (
    <SearchResultsScreen
      onFilterPress={() => mainNavigation.navigate('Filters')}
      onProductPress={openProduct}
      onQueryChange={(query) =>
        navigation.setParams({ query })
      }
      query={route.params.query}
    />
  );
}

export function CategoryProductsScreenConnector() {
  const navigation = useNavigation<ExploreNavigation>();
  const route = useRoute<RouteProp<ExploreStackParamList, 'CategoryProducts'>>();
  const mainNavigation = useMainStackNavigation();
  const openProduct = useProductNavigation();

  return (
    <CategoryProductsScreen
      categoryId={route.params.categoryId}
      onBack={() => navigation.goBack()}
      onFilterPress={() => mainNavigation.navigate('Filters')}
      onProductPress={openProduct}
    />
  );
}

export function FavouriteScreenConnector() {
  const onTabPress = useFooterTabPress();
  const openProduct = useProductNavigation();

  return (
    <FavouriteScreen
      onAddAllToCart={() => onTabPress('cart')}
      onProductPress={openProduct}
    />
  );
}

export function CartScreenConnector() {
  const mainNavigation = useMainStackNavigation();

  return (
    <CartScreen
      onPlaceOrder={() => mainNavigation.navigate('OrderAccepted')}
    />
  );
}

export function AccountScreenConnector() {
  const { goToAuth } = useRootNavigation();

  return <AccountScreen onLogout={goToAuth} />;
}

export function ProductDetailScreenConnector() {
  const mainNavigation = useMainStackNavigation();
  const route = useRoute<RouteProp<MainStackParamList, 'ProductDetail'>>();

  return (
    <ProductDetailScreen
      onBack={() => mainNavigation.goBack()}
      product={getProductDetail(route.params.productId)}
    />
  );
}

export function FilterScreenConnector() {
  const mainNavigation = useMainStackNavigation();
  const { filters, setFilters } = useFilterContext();

  return (
    <FilterScreen
      initialFilters={filters}
      onApply={setFilters}
      onClose={() => mainNavigation.goBack()}
    />
  );
}

export function OrderAcceptedScreenConnector() {
  const mainNavigation = useMainStackNavigation();

  const goHome = () => {
    mainNavigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <OrderAcceptedScreen onBackHome={goHome} onTrackOrder={goHome} />
  );
}
