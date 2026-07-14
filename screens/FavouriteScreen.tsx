import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Button from '../components/layout/Button';
import { FavouriteItemRow } from '../components/layout/Cards';
import Header from '../components/layout/Header';
import { useToast } from '../components/layout/Toast';
import { useAuth } from '../context/AuthContext';
import { TOAST_MESSAGES } from '../constants/toastMessages';
import type { HomeProduct } from '../constants/products';
import {
  bulkAddCartItems,
  fetchFavourites,
} from '../services/cartService';
import { toHomeProduct } from '../services/mappers';

const COLORS = {
  background: '#FFFFFF',
  primary: '#53B175',
} as const;

const HORIZONTAL_PADDING = 25;

export type FavouriteScreenProps = {
  onProductPress?: (productId: string) => void;
  onAddAllToCart?: () => void;
  containerStyle?: ViewStyle;
};

export function FavouriteScreen({
  onProductPress,
  onAddAllToCart,
  containerStyle,
}: FavouriteScreenProps) {
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const [favourites, setFavourites] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavourites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavourites([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const products = await fetchFavourites();
      setFavourites(products.map(toHomeProduct));
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not load favourites',
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, showError]);

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);

  const handleAddAllToCart = async () => {
    try {
      if (!isAuthenticated) {
        showError('Please log in to add items to cart');
        return;
      }
      if (!favourites.length) {
        showError('No favourites to add');
        return;
      }
      await bulkAddCartItems(
        favourites.map((product) => ({ productId: product.id, quantity: 1 })),
      );
      showSuccess(TOAST_MESSAGES.addAllToCart);
      onAddAllToCart?.();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not add to cart',
      );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header showBorder title="Favorurite" />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : (
        <ScrollView
          bounces
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {favourites.map((product) => (
            <FavouriteItemRow
              key={product.id}
              iconBackground={product.iconBackground}
              iconColor={product.iconColor}
              iconName={product.iconName}
              meta={product.meta}
              price={product.price}
              title={product.title}
              onPress={() => onProductPress?.(product.id)}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.actionBar}>
        <Button onPress={handleAddAllToCart} title="Add All To Cart" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  actionBar: {
    paddingBottom: 16,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
  },
});

export default FavouriteScreen;
