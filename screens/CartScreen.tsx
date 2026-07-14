import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Button from '../components/layout/Button';
import CheckoutSheet from '../components/layout/CheckoutSheet';
import { MyCartItemRow } from '../components/layout/Cards';
import Header from '../components/layout/Header';
import { useToast } from '../components/layout/Toast';
import { useAuth } from '../context/AuthContext';
import { TOAST_MESSAGES } from '../constants/toastMessages';
import type { HomeProduct } from '../constants/products';
import {
  createOrder,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '../services/cartService';
import type { ApiCartLine } from '../services/types';
import { toHomeProduct } from '../services/mappers';

const COLORS = {
  background: '#FFFFFF',
  primary: '#53B175',
} as const;

const HORIZONTAL_PADDING = 25;

type CartLine = {
  id: string;
  productId: string;
  quantity: number;
  product: HomeProduct;
  priceValue: number;
};

export type CartScreenProps = {
  onPlaceOrder?: () => void;
  containerStyle?: ViewStyle;
};

function mapLines(items: ApiCartLine[]): CartLine[] {
  return items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    product: toHomeProduct(item.product),
    priceValue: item.product.priceValue,
  }));
}

export function CartScreen({
  onPlaceOrder,
  containerStyle,
}: CartScreenProps) {
  const { isAuthenticated } = useAuth();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const { showSuccess, showError } = useToast();

  const totalCost = useMemo(() => {
    const total = lines.reduce(
      (sum, line) => sum + line.priceValue * line.quantity,
      0,
    );
    return `$${total.toFixed(2)}`;
  }, [lines]);

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setLines([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const items = await fetchCart();
      setLines(mapLines(items));
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Could not load cart');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, showError]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateQuantity = async (productId: string, nextQuantity: number) => {
    try {
      if (nextQuantity < 1) {
        const items = await removeCartItem(productId);
        setLines(mapLines(items));
        return;
      }
      const items = await updateCartItem(productId, nextQuantity);
      setLines(mapLines(items));
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not update cart',
      );
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const items = await removeCartItem(productId);
      setLines(mapLines(items));
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not remove item',
      );
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await createOrder({
        deliveryMethod: 'Select Method',
        paymentLabel: 'Card',
      });
      setCheckoutVisible(false);
      setLines([]);
      showSuccess('Order placed successfully');
      onPlaceOrder?.();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not place order',
      );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header showBorder title="My Cart" />

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
          {lines.map(({ id, product, quantity, productId }) => (
            <MyCartItemRow
              key={id}
              iconBackground={product.iconBackground}
              iconColor={product.iconColor}
              iconName={product.iconName}
              meta={product.meta}
              price={product.price}
              quantity={quantity}
              title={product.title}
              onDecrement={() => updateQuantity(productId, quantity - 1)}
              onIncrement={() => updateQuantity(productId, quantity + 1)}
              onRemove={() => removeItem(productId)}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.actionBar}>
        <Button
          onPress={() => setCheckoutVisible(true)}
          title="Go to Checkout"
        />
      </View>

      <CheckoutSheet
        onClose={() => setCheckoutVisible(false)}
        onDeliveryPress={() => showSuccess(TOAST_MESSAGES.deliverySelected)}
        onPaymentPress={() => showSuccess(TOAST_MESSAGES.cardSaved)}
        onPlaceOrder={handlePlaceOrder}
        onPromoPress={() => showSuccess(TOAST_MESSAGES.promoApplied)}
        totalCost={totalCost}
        visible={checkoutVisible}
      />
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

export default CartScreen;
