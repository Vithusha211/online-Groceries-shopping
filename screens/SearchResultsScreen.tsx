import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ProductCard } from '../components/layout/Cards';
import Footer, { FooterTab } from '../components/layout/Footer';
import Header from '../components/layout/Header';
import InputField from '../components/layout/InputField';
import { searchProducts } from '../constants/products';

const COLORS = {
  background: '#FFFFFF',
} as const;

const HORIZONTAL_PADDING = 25;
const GRID_GAP = 15;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

export type SearchResultsScreenProps = {
  query: string;
  activeTab?: FooterTab;
  onQueryChange?: (query: string) => void;
  onTabPress?: (tab: FooterTab) => void;
  onFilterPress?: () => void;
  onProductPress?: (productId: string) => void;
  containerStyle?: ViewStyle;
};

export function SearchResultsScreen({
  query,
  activeTab = 'explore',
  onQueryChange,
  onTabPress,
  onFilterPress,
  onProductPress,
  containerStyle,
}: SearchResultsScreenProps) {
  const products = useMemo(() => searchProducts(query), [query]);

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <InputField.Screen style={styles.keyboardView}>
        <Header
          onRightPress={onFilterPress}
          rightAction="filter"
          searchBarOnly
          searchValue={query}
          showSearch
          title=""
          onSearchChange={onQueryChange}
        />

        <ScrollView
          bounces
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                containerStyle={{ width: cardWidth }}
                iconBackground={product.iconBackground}
                iconColor={product.iconColor}
                iconName={product.iconName}
                meta={product.meta}
                price={product.price}
                size="large"
                title={product.title}
                onAdd={() => onProductPress?.(product.id)}
                onPress={() => onProductPress?.(product.id)}
              />
            ))}
          </View>
        </ScrollView>

        <Footer activeTab={activeTab} onTabPress={onTabPress ?? (() => {})} />
      </InputField.Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
  },
  grid: {
    columnGap: GRID_GAP,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: GRID_GAP,
  },
});

export default SearchResultsScreen;
