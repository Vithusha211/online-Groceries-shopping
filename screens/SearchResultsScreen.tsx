import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ProductCard } from '../components/layout/Cards';
import Header from '../components/layout/Header';
import InputField from '../components/layout/InputField';
import type { HomeProduct } from '../constants/products';
import { searchProducts } from '../constants/products';
import { fetchProducts } from '../services/catalogService';
import { toHomeProduct } from '../services/mappers';

const COLORS = {
  background: '#FFFFFF',
  primary: '#53B175',
} as const;

const HORIZONTAL_PADDING = 25;
const GRID_GAP = 15;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

export type SearchResultsScreenProps = {
  query: string;
  onQueryChange?: (query: string) => void;
  onFilterPress?: () => void;
  onProductPress?: (productId: string) => void;
  containerStyle?: ViewStyle;
};

export function SearchResultsScreen({
  query,
  onQueryChange,
  onFilterPress,
  onProductPress,
  containerStyle,
}: SearchResultsScreenProps) {
  const [products, setProducts] = useState<HomeProduct[]>(() =>
    searchProducts(query),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchProducts({ q: query.trim() });
        if (!active) return;
        setProducts(data.length ? data.map(toHomeProduct) : searchProducts(query));
      } catch {
        if (active) setProducts(searchProducts(query));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [query]);

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

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        ) : (
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
        )}
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
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
