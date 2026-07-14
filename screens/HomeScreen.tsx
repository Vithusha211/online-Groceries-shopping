import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { CategoryCard, ProductCard } from '../components/layout/Cards';
import { HomeHeader } from '../components/layout/Header';
import InputField from '../components/layout/InputField';
import PromoBanner from '../components/layout/PromoBanner';
import { useToast } from '../components/layout/Toast';
import { useAuth } from '../context/AuthContext';
import { TOAST_MESSAGES } from '../constants/toastMessages';
import {
  BEST_SELLING,
  EXCLUSIVE_OFFERS,
  GROCERY_PRODUCTS,
  HomeProduct,
} from '../constants/products';
import { addCartItem } from '../services/cartService';
import { fetchProducts } from '../services/catalogService';
import { toHomeProduct } from '../services/mappers';

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
  location,
  onProductPress,
  containerStyle,
}: HomeScreenProps) {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [exclusive, setExclusive] = useState<HomeProduct[]>(EXCLUSIVE_OFFERS);
  const [bestSelling, setBestSelling] = useState<HomeProduct[]>(BEST_SELLING);
  const [grocery, setGrocery] = useState<HomeProduct[]>(GROCERY_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const resolvedLocation =
    location ??
    (user?.location
      ? `${user.location.zone}, ${user.location.area}`
      : 'Dhaka, Banassre');

  const contentBottomPadding = useMemo(() => 24, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [exclusiveProducts, bestProducts, groceryProducts] =
          await Promise.all([
            fetchProducts({ section: 'exclusive' }),
            fetchProducts({ section: 'bestSelling' }),
            fetchProducts({ section: 'grocery' }),
          ]);
        if (!active) return;
        if (exclusiveProducts.length) {
          setExclusive(exclusiveProducts.map(toHomeProduct));
        }
        if (bestProducts.length) {
          setBestSelling(bestProducts.map(toHomeProduct));
        }
        if (groceryProducts.length) {
          setGrocery(groceryProducts.map(toHomeProduct));
        }
      } catch {
        // Keep local fallbacks if API is offline
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleAddToCart = useCallback(
    async (productId: string) => {
      try {
        if (!isAuthenticated) {
          showError('Please log in to add items to cart');
          return;
        }
        await addCartItem(productId, 1);
        showSuccess(TOAST_MESSAGES.addToCart);
      } catch (error) {
        showError(
          error instanceof Error ? error.message : 'Could not add to cart',
        );
      }
    },
    [isAuthenticated, showError, showSuccess],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <InputField.Screen style={styles.keyboardView}>
        <HomeHeader
          location={resolvedLocation}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        ) : (
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
                onAdd={handleAddToCart}
                onProductPress={onProductPress}
                products={exclusive}
              />
            </View>

            <View style={styles.section}>
              <SectionHeader title="Best Selling" />
              <ProductGrid
                onAdd={handleAddToCart}
                onProductPress={onProductPress}
                products={bestSelling}
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
                onAdd={handleAddToCart}
                onProductPress={onProductPress}
                products={grocery}
              />
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
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.title,
    fontSize: 22,
    fontWeight: '600',
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 14,
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
    width: 220,
  },
});

export default HomeScreen;
