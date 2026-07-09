import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Button from '../components/layout/Button';
import { FavouriteItemRow } from '../components/layout/Cards';
import Header from '../components/layout/Header';
import { getFavouriteProducts } from '../constants/products';
import { useToast } from '../components/layout/Toast';
import { TOAST_MESSAGES } from '../constants/toastMessages';

const COLORS = {
  background: '#FFFFFF',
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
  const favourites = useMemo(() => getFavouriteProducts(), []);
  const { showSuccess } = useToast();

  const handleAddAllToCart = () => {
    showSuccess(TOAST_MESSAGES.addAllToCart);
    onAddAllToCart?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header showBorder title="Favorurite" />

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
