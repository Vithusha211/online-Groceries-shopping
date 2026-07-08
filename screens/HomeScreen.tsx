import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  CategoryCard,
  ExploreCategoryCard,
  ProductCard,
} from '../components/layout/Cards';
import Footer, { FooterTab } from '../components/layout/Footer';
import { HomeHeader } from '../components/layout/Header';
import InputField from '../components/layout/InputField';
import PromoBanner from '../components/layout/PromoBanner';
import {
  BEST_SELLING,
  EXCLUSIVE_OFFERS,
  GROCERY_PRODUCTS,
  HomeProduct,
} from '../constants/products';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  primary: '#53B175',
} as const;

const HORIZONTAL_PADDING = 25;
const GRID_GAP = 13;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

type CategoryItem = {
  id: string;
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
};

const GROCERY_CATEGORIES: CategoryItem[] = [
  {
    id: 'pulses',
    title: 'Pulses',
    iconName: 'barley',
    iconColor: '#C97B3B',
    backgroundColor: '#F8E8D8',
  },
  {
    id: 'rice',
    title: 'Rice',
    iconName: 'rice',
    iconColor: '#8B9A6B',
    backgroundColor: '#E8F4E0',
  },
];

export type HomeScreenProps = {
  location?: string;
  activeTab?: FooterTab;
  onTabPress?: (tab: FooterTab) => void;
  onProductPress?: (productId: string) => void;
  containerStyle?: ViewStyle;
};

function SectionHeader({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.7}
        onPress={onSeeAll}
      >
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProductGrid({
  products,
  onAdd,
  onProductPress,
}: {
  products: HomeProduct[];
  onAdd?: (id: string) => void;
  onProductPress?: (id: string) => void;
}) {
  return (
    <View style={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          containerStyle={{ width: cardWidth }}
          iconBackground={product.iconBackground}
          iconColor={product.iconColor}
          iconName={product.iconName}
          meta={product.meta}
          price={product.price}
          title={product.title}
          onAdd={() => onAdd?.(product.id)}
          onPress={() => onProductPress?.(product.id)}
        />
      ))}
    </View>
  );
}

export function HomeScreen({
  location = 'Dhaka, Banassree',
  activeTab = 'shop',
  onTabPress,
  onProductPress,
  containerStyle,
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const contentBottomPadding = useMemo(() => 24, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <InputField.Screen style={styles.keyboardView}>
        <HomeHeader
          location={location}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ScrollView
          bounces
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: contentBottomPadding },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <PromoBanner />

          <View style={styles.section}>
            <SectionHeader title="Exclusive Offer" />
            <ProductGrid
              onProductPress={onProductPress}
              products={EXCLUSIVE_OFFERS}
            />
          </View>

          <View style={styles.section}>
            <SectionHeader title="Best Selling" />
            <ProductGrid
              onProductPress={onProductPress}
              products={BEST_SELLING}
            />
          </View>

          <View style={styles.section}>
            <SectionHeader title="Groceries" />
            <ScrollView
              horizontal
              contentContainerStyle={styles.categoryRow}
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
            >
              {GROCERY_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  backgroundColor={category.backgroundColor}
                  containerStyle={styles.categoryCard}
                  iconColor={category.iconColor}
                  iconName={category.iconName}
                  title={category.title}
                />
              ))}
            </ScrollView>
            <ProductGrid
              onProductPress={onProductPress}
              products={GROCERY_PRODUCTS}
            />
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
  },
  section: {
    marginTop: 24,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.title,
    fontSize: 24,
    fontWeight: '600',
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  productGrid: {
    columnGap: GRID_GAP,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: GRID_GAP,
  },
  categoryRow: {
    gap: 12,
    marginBottom: 16,
    paddingRight: HORIZONTAL_PADDING,
  },
  categoryCard: {
    marginRight: 0,
  },
});

export default HomeScreen;
