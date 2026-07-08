import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ProductCard } from '../components/layout/Cards';
import Header from '../components/layout/Header';
import { EXPLORE_CATEGORIES } from '../constants/exploreCategories';
import { getCategoryProducts } from '../constants/products';

const COLORS = {
  background: '#FFFFFF',
} as const;

const HORIZONTAL_PADDING = 25;
const GRID_GAP = 15;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

export type CategoryProductsScreenProps = {
  categoryId: string;
  onBack?: () => void;
  onFilterPress?: () => void;
  onProductPress?: (productId: string) => void;
  containerStyle?: ViewStyle;
};

function getCategoryTitle(categoryId: string): string {
  return (
    EXPLORE_CATEGORIES.find((category) => category.id === categoryId)?.title ??
    'Products'
  );
}

export function CategoryProductsScreen({
  categoryId,
  onBack,
  onFilterPress,
  onProductPress,
  containerStyle,
}: CategoryProductsScreenProps) {
  const products = getCategoryProducts(categoryId);
  const title = getCategoryTitle(categoryId);

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header
        leftAction="back"
        onLeftPress={onBack}
        onRightPress={onFilterPress}
        rightAction="filter"
        title={title}
      />

      <ScrollView
        bounces
        contentContainerStyle={styles.scrollContent}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
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

export default CategoryProductsScreen;
