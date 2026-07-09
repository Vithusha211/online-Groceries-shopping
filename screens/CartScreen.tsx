import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
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
import { TOAST_MESSAGES } from '../constants/toastMessages';
import {
  CHECKOUT_TOTAL,
  CartItem,
  DEFAULT_CART_ITEMS,
  getCartLineProduct,
} from '../constants/cart';

const COLORS = {
  background: '#FFFFFF',
} as const;

const HORIZONTAL_PADDING = 25;

export type CartScreenProps = {
  onPlaceOrder?: () => void;
  containerStyle?: ViewStyle;
};

export function CartScreen({
  onPlaceOrder,
  containerStyle,
}: CartScreenProps) {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);
  const [checkoutVisible, setCheckoutVisible] = useState(true);
  const { showSuccess } = useToast();

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getCartLineProduct(item.productId);
          return product ? { ...item, product } : null;
        })
        .filter((line): line is CartItem & { product: NonNullable<ReturnType<typeof getCartLineProduct>> } =>
          Boolean(line),
        ),
    [items],
  );

  const updateQuantity = (id: string, nextQuantity: number) => {
    if (nextQuantity < 1) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header showBorder title="My Cart" />

      <ScrollView
        bounces
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartLines.map(({ id, product, quantity }) => (
          <MyCartItemRow
            key={id}
            iconBackground={product.iconBackground}
            iconColor={product.iconColor}
            iconName={product.iconName}
            meta={product.meta}
            price={product.price}
            quantity={quantity}
            title={product.title}
            onDecrement={() => updateQuantity(id, quantity - 1)}
            onIncrement={() => updateQuantity(id, quantity + 1)}
            onRemove={() => removeItem(id)}
          />
        ))}
      </ScrollView>

      <View style={styles.actionBar}>
        <Button onPress={() => setCheckoutVisible(true)} title="Go to Checkout" />
      </View>

      <CheckoutSheet
        onClose={() => setCheckoutVisible(false)}
        onDeliveryPress={() => showSuccess(TOAST_MESSAGES.deliverySelected)}
        onPaymentPress={() => showSuccess(TOAST_MESSAGES.cardSaved)}
        onPlaceOrder={() => {
          onPlaceOrder?.();
          setCheckoutVisible(false);
        }}
        onPromoPress={() => showSuccess(TOAST_MESSAGES.promoApplied)}
        totalCost={CHECKOUT_TOTAL}
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
