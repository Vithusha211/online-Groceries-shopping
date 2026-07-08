import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FooterTab } from './components/layout/Footer';
import { DEFAULT_FILTER_STATE, FilterState } from './constants/filters';
import { getProductDetail } from './constants/products';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import ExploreScreen from './screens/ExploreScreen';
import FilterScreen from './screens/FilterScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import MobileNumberScreen from './screens/MobileNumberScreen';
import NumberSignInScreen from './screens/NumberSignInScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import SelectLocationScreen from './screens/SelectLocationScreen';
import SignUpScreen from './screens/SignUpScreen';
import VerificationScreen from './screens/VerificationScreen';
import WelcomeScreen from './screens/WelcomeScreen';

type AppScreen =
  | 'loading'
  | 'welcome'
  | 'number'
  | 'mobile'
  | 'verification'
  | 'location'
  | 'login'
  | 'signup'
  | 'home'
  | 'explore'
  | 'category'
  | 'search'
  | 'filters'
  | 'product';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('loading');
  const [selectedProductId, setSelectedProductId] = useState('apple');
  const [selectedCategoryId, setSelectedCategoryId] = useState('beverages');
  const [searchQuery, setSearchQuery] = useState('');
  const [productReturnScreen, setProductReturnScreen] = useState<AppScreen>('home');
  const [filterReturnScreen, setFilterReturnScreen] = useState<AppScreen>('search');
  const [activeFilters, setActiveFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const openFilters = (returnScreen: AppScreen) => {
    setFilterReturnScreen(returnScreen);
    setScreen('filters');
  };

  const openProduct = (productId: string, returnScreen: AppScreen) => {
    setSelectedProductId(productId);
    setProductReturnScreen(returnScreen);
    setScreen('product');
  };

  const handleTabPress = (tab: FooterTab) => {
    if (tab === 'shop') {
      setScreen('home');
      return;
    }
    if (tab === 'explore') {
      setScreen('explore');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setScreen('welcome'), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (screen === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      {screen === 'welcome' ? (
        <WelcomeScreen onGetStarted={() => setScreen('number')} />
      ) : screen === 'number' ? (
        <NumberSignInScreen
          onContinue={() => setScreen('mobile')}
          onFacebook={() => setScreen('home')}
          onGoogle={() => setScreen('home')}
        />
      ) : screen === 'mobile' ? (
        <MobileNumberScreen
          onBack={() => setScreen('number')}
          onNext={() => setScreen('verification')}
        />
      ) : screen === 'verification' ? (
        <VerificationScreen
          onBack={() => setScreen('mobile')}
          onNext={() => setScreen('location')}
        />
      ) : screen === 'location' ? (
        <SelectLocationScreen
          onBack={() => setScreen('verification')}
          onSubmit={() => setScreen('home')}
        />
      ) : screen === 'login' ? (
        <LoginScreen
          onLogin={() => setScreen('home')}
          onSignUp={() => setScreen('signup')}
        />
      ) : screen === 'signup' ? (
        <SignUpScreen
          onLogin={() => setScreen('login')}
          onSignUp={() => setScreen('home')}
        />
      ) : screen === 'product' ? (
        <ProductDetailScreen
          onBack={() => setScreen(productReturnScreen)}
          product={getProductDetail(selectedProductId)}
        />
      ) : screen === 'filters' ? (
        <FilterScreen
          initialFilters={activeFilters}
          onApply={setActiveFilters}
          onClose={() => setScreen(filterReturnScreen)}
        />
      ) : screen === 'search' ? (
        <SearchResultsScreen
          onFilterPress={() => openFilters('search')}
          onProductPress={(productId) => openProduct(productId, 'search')}
          onQueryChange={setSearchQuery}
          onTabPress={handleTabPress}
          query={searchQuery}
        />
      ) : screen === 'category' ? (
        <CategoryProductsScreen
          categoryId={selectedCategoryId}
          onBack={() => setScreen('explore')}
          onFilterPress={() => openFilters('category')}
          onProductPress={(productId) => openProduct(productId, 'category')}
        />
      ) : screen === 'explore' ? (
        <ExploreScreen
          onCategoryPress={(categoryId) => {
            setSelectedCategoryId(categoryId);
            setScreen('category');
          }}
          onSearchSubmit={(query) => {
            setSearchQuery(query);
            setScreen('search');
          }}
          onTabPress={handleTabPress}
        />
      ) : (
        <HomeScreen
          onProductPress={(productId) => openProduct(productId, 'home')}
          onTabPress={handleTabPress}
        />
      )}
    </SafeAreaProvider>
  );
}
