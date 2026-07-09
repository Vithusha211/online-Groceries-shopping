import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';

const COLORS = {
  overlay: 'rgba(24, 23, 37, 0.45)',
  sheet: '#FFFFFF',
  text: '#181725',
  muted: '#7C7C7C',
  border: '#E2E2E2',
  masterRed: '#EB001B',
  masterOrange: '#F79E1B',
} as const;

const HORIZONTAL_PADDING = 25;

type CheckoutRowProps = {
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
  onPress?: () => void;
};

function CheckoutRow({ label, value, valueNode, onPress }: CheckoutRowProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      disabled={!onPress}
      onPress={onPress}
      style={styles.row}
    >
      <Text style={styles.rowLabel}>{label}</Text>

      <View style={styles.rowRight}>
        {valueNode ?? (
          <Text numberOfLines={1} style={styles.rowValue}>
            {value}
          </Text>
        )}
        <Feather color={COLORS.muted} name="chevron-right" size={18} />
      </View>
    </TouchableOpacity>
  );
}

function MastercardIcon() {
  return (
    <View style={styles.mastercard}>
      <View style={[styles.mastercardCircle, styles.mastercardRed]} />
      <View style={[styles.mastercardCircle, styles.mastercardOrange]} />
    </View>
  );
}

export type CheckoutSheetProps = {
  visible: boolean;
  totalCost: string;
  deliveryLabel?: string;
  promoLabel?: string;
  onClose?: () => void;
  onDeliveryPress?: () => void;
  onPaymentPress?: () => void;
  onPromoPress?: () => void;
  onTotalPress?: () => void;
  onPlaceOrder?: () => void;
  onTermsPress?: () => void;
  containerStyle?: ViewStyle;
};

export function CheckoutSheet({
  visible,
  totalCost,
  deliveryLabel = 'Select Method',
  promoLabel = 'Pick discount',
  onClose,
  onDeliveryPress,
  onPaymentPress,
  onPromoPress,
  onTotalPress,
  onPlaceOrder,
  onTermsPress,
  containerStyle,
}: CheckoutSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.modalRoot}>
        <Pressable accessibilityRole="button" onPress={onClose} style={styles.overlay} />

        <View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 16) },
            containerStyle,
          ]}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Checkout</Text>
            <TouchableOpacity
              accessibilityLabel="Close checkout"
              accessibilityRole="button"
              hitSlop={12}
              onPress={onClose}
            >
              <Feather color={COLORS.text} name="x" size={22} />
            </TouchableOpacity>
          </View>

          <CheckoutRow
            label="Delivery"
            onPress={onDeliveryPress}
            value={deliveryLabel}
          />
          <CheckoutRow
            label="Pament"
            onPress={onPaymentPress}
            valueNode={<MastercardIcon />}
          />
          <CheckoutRow
            label="Promo Code"
            onPress={onPromoPress}
            value={promoLabel}
          />
          <CheckoutRow
            label="Total Cost"
            onPress={onTotalPress}
            value={totalCost}
          />

          <Text style={styles.terms}>
            By placing an order you agree to our{' '}
            <Text onPress={onTermsPress} style={styles.termsBold}>
              Terms
            </Text>{' '}
            And{' '}
            <Text onPress={onTermsPress} style={styles.termsBold}>
              Conditions
            </Text>
          </Text>

          <Button
            containerStyle={styles.placeOrderButton}
            onPress={onPlaceOrder}
            title="Place Order"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  sheet: {
    backgroundColor: COLORS.sheet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 24,
  },
  sheetHeader: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 16,
  },
  sheetTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '600',
  },
  row: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingVertical: 16,
  },
  rowLabel: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  rowRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    maxWidth: '55%',
  },
  rowValue: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '600',
  },
  mastercard: {
    height: 24,
    position: 'relative',
    width: 36,
  },
  mastercardCircle: {
    borderRadius: 12,
    height: 24,
    position: 'absolute',
    top: 0,
    width: 24,
  },
  mastercardRed: {
    backgroundColor: COLORS.masterRed,
    left: 0,
  },
  mastercardOrange: {
    backgroundColor: COLORS.masterOrange,
    left: 12,
    opacity: 0.95,
  },
  terms: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  termsBold: {
    color: COLORS.text,
    fontWeight: '700',
  },
  placeOrderButton: {
    marginTop: 24,
  },
});

export default CheckoutSheet;
