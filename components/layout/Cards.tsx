import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  background: '#FFFFFF',
  border: '#E2E2E2',
  text: '#181725',
  muted: '#7C7C7C',
  primary: '#53B175',
  primaryDark: '#3FA566',
  stepperBg: '#2F80ED',
  stepperButtonBg: '#E9EFF8',
  stepperButtonBorder: '#D7E3F6',
  productStepperButtonBg: '#F2F3F2',
  white: '#FFFFFF',
} as const;

const PRODUCT_STEPPER_SIZE = 46;

// --- ProductCard ---

export type ProductCardProps = {
  title: string;
  meta: string;
  price: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBackground: string;
  size?: 'default' | 'large';
  onPress?: () => void;
  onAdd?: () => void;
  containerStyle?: ViewStyle;
};

export function ProductCard({
  title,
  meta,
  price,
  iconName,
  iconColor,
  iconBackground,
  size = 'default',
  onPress,
  onAdd,
  containerStyle,
}: ProductCardProps) {
  const isLarge = size === 'large';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        productCardStyles.card,
        isLarge && productCardStyles.cardLarge,
        containerStyle,
      ]}
    >
      <View
        style={[
          productCardStyles.imageWrap,
          isLarge && productCardStyles.imageWrapLarge,
          { backgroundColor: iconBackground },
        ]}
      >
        <MaterialCommunityIcons
          color={iconColor}
          name={iconName}
          size={isLarge ? 80 : 72}
        />
      </View>

      <Text numberOfLines={2} style={productCardStyles.title}>
        {title}
      </Text>
      <Text numberOfLines={1} style={productCardStyles.meta}>
        {meta}
      </Text>

      <View style={productCardStyles.footer}>
        <Text style={productCardStyles.price}>{price}</Text>
        <TouchableOpacity
          accessibilityLabel={`Add ${title} to cart`}
          accessibilityRole="button"
          activeOpacity={0.85}
          onPress={onAdd}
          style={productCardStyles.addButton}
        >
          <Feather color={COLORS.white} name="plus" size={18} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const productCardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 249,
    padding: 15,
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: 14,
    height: 110,
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageWrapLarge: {
    height: 140,
  },
  cardLarge: {
    minHeight: 280,
  },
  title: {
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    minHeight: 40,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  price: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
});

// --- CategoryCard ---

export type CategoryCardProps = {
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
};

export function CategoryCard({
  title,
  iconName,
  iconColor,
  backgroundColor,
  onPress,
  containerStyle,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      style={[categoryCardStyles.card, { backgroundColor }, containerStyle]}
    >
      <View style={categoryCardStyles.iconWrap}>
        <MaterialCommunityIcons color={iconColor} name={iconName} size={52} />
      </View>
      <Text numberOfLines={1} style={categoryCardStyles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const categoryCardStyles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 16,
    height: 105,
    paddingHorizontal: 20,
    width: 248,
  },
  iconWrap: {
    alignItems: 'center',
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  title: {
    color: COLORS.text,
    flex: 1,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 20,
    fontWeight: '600',
  },
});

// --- ExploreCategoryCard ---

export type ExploreCategoryCardProps = {
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
};

export function ExploreCategoryCard({
  title,
  iconName,
  iconColor,
  backgroundColor,
  onPress,
  containerStyle,
}: ExploreCategoryCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      style={[exploreCategoryCardStyles.card, { backgroundColor }, containerStyle]}
    >
      <View style={exploreCategoryCardStyles.imageArea}>
        <MaterialCommunityIcons color={iconColor} name={iconName} size={72} />
      </View>
      <Text numberOfLines={2} style={exploreCategoryCardStyles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const exploreCategoryCardStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    height: 189,
    overflow: 'hidden',
    paddingBottom: 14,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  imageArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
});

// --- ProductQuantityStepper ---

export type ProductQuantityStepperProps = {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  minQuantity?: number;
  containerStyle?: ViewStyle;
};

export function ProductQuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 1,
  containerStyle,
}: ProductQuantityStepperProps) {
  const canDecrement = quantity > minQuantity;

  return (
    <View style={[productStepperStyles.container, containerStyle]}>
      <TouchableOpacity
        accessibilityLabel="Decrease quantity"
        accessibilityRole="button"
        activeOpacity={0.85}
        disabled={!canDecrement}
        onPress={onDecrement}
        style={[
          productStepperStyles.button,
          productStepperStyles.decrementButton,
          !canDecrement && productStepperStyles.buttonDisabled,
        ]}
      >
        <Feather color={COLORS.text} name="minus" size={18} />
      </TouchableOpacity>

      <View style={productStepperStyles.quantityWrap}>
        <Text style={productStepperStyles.quantity}>{quantity}</Text>
      </View>

      <TouchableOpacity
        accessibilityLabel="Increase quantity"
        accessibilityRole="button"
        activeOpacity={0.85}
        onPress={onIncrement}
        style={[productStepperStyles.button, productStepperStyles.incrementButton]}
      >
        <Feather color={COLORS.white} name="plus" size={18} />
      </TouchableOpacity>
    </View>
  );
}

const productStepperStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: PRODUCT_STEPPER_SIZE,
    overflow: 'hidden',
    width: 130,
  },
  button: {
    alignItems: 'center',
    height: PRODUCT_STEPPER_SIZE,
    justifyContent: 'center',
    width: PRODUCT_STEPPER_SIZE,
  },
  decrementButton: {
    backgroundColor: COLORS.productStepperButtonBg,
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  quantityWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  quantity: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

// --- FavouriteItemRow ---

export type FavouriteItemRowProps = {
  title: string;
  meta: string;
  price: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBackground: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
};

export function FavouriteItemRow({
  title,
  meta,
  price,
  iconName,
  iconColor,
  iconBackground,
  onPress,
  containerStyle,
}: FavouriteItemRowProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      style={[favouriteRowStyles.row, containerStyle]}
    >
      <View style={[favouriteRowStyles.imageWrap, { backgroundColor: iconBackground }]}>
        <MaterialCommunityIcons color={iconColor} name={iconName} size={36} />
      </View>

      <View style={favouriteRowStyles.info}>
        <Text numberOfLines={1} style={favouriteRowStyles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={favouriteRowStyles.meta}>
          {meta}
        </Text>
      </View>

      <Text style={favouriteRowStyles.price}>{price}</Text>

      <Feather color={COLORS.muted} name="chevron-right" size={18} style={favouriteRowStyles.chevron} />
    </TouchableOpacity>
  );
}

const favouriteRowStyles = StyleSheet.create({
  row: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 86,
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    marginRight: 16,
    width: 55,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  price: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  chevron: {
    opacity: 0.6,
  },
});

// --- MyCartItemRow ---

export type MyCartItemRowProps = {
  title: string;
  meta: string;
  price: string;
  quantity: number;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBackground: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
  containerStyle?: ViewStyle;
};

export function MyCartItemRow({
  title,
  meta,
  price,
  quantity,
  iconName,
  iconColor,
  iconBackground,
  onIncrement,
  onDecrement,
  onRemove,
  containerStyle,
}: MyCartItemRowProps) {
  return (
    <View style={[myCartRowStyles.row, containerStyle]}>
      <View style={[myCartRowStyles.imageWrap, { backgroundColor: iconBackground }]}>
        <MaterialCommunityIcons color={iconColor} name={iconName} size={48} />
      </View>

      <View style={myCartRowStyles.content}>
        <View style={myCartRowStyles.topRow}>
          <View style={myCartRowStyles.info}>
            <Text numberOfLines={1} style={myCartRowStyles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={myCartRowStyles.meta}>
              {meta}
            </Text>
          </View>

          <View style={myCartRowStyles.rightColumn}>
            <TouchableOpacity
              accessibilityLabel={`Remove ${title}`}
              accessibilityRole="button"
              hitSlop={8}
              onPress={onRemove}
              style={myCartRowStyles.removeButton}
            >
              <Feather color={COLORS.muted} name="x" size={18} />
            </TouchableOpacity>
            <Text style={myCartRowStyles.price}>{price}</Text>
          </View>
        </View>

        <ProductQuantityStepper
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          quantity={quantity}
        />
      </View>
    </View>
  );
}

const myCartRowStyles = StyleSheet.create({
  row: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 18,
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: 12,
    height: 72,
    justifyContent: 'center',
    marginRight: 14,
    width: 72,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  rightColumn: {
    alignItems: 'flex-end',
    minWidth: 56,
  },
  removeButton: {
    marginBottom: 8,
  },
  price: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
});

// --- Cart components ---

type CartAddButtonProps = {
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  containerStyle?: ViewStyle;
};

export function CartAddButton({
  onPress,
  size = 44,
  iconSize = 20,
  containerStyle,
}: CartAddButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        cartStyles.addButton,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        containerStyle,
      ]}
    >
      <Feather color={COLORS.white} name="plus" size={iconSize} />
    </TouchableOpacity>
  );
}

export type CartQuantityStepperProps = {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  minQuantity?: number;
  disabledDecrement?: boolean;
  containerStyle?: ViewStyle;
};

export function CartQuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 0,
  disabledDecrement,
  containerStyle,
}: CartQuantityStepperProps) {
  const canDecrement = quantity > minQuantity;
  const isDisabled = disabledDecrement ?? !canDecrement;

  return (
    <View style={[cartStyles.stepperOuter, containerStyle]}>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.85}
        disabled={isDisabled}
        onPress={onDecrement}
        style={[
          cartStyles.stepperButton,
          cartStyles.stepperButtonLeft,
          isDisabled && cartStyles.stepperButtonDisabled,
        ]}
      >
        <Feather color={COLORS.text} name="minus" size={18} />
      </TouchableOpacity>

      <View style={cartStyles.stepperCenter}>
        <Text style={cartStyles.stepperQuantity}>{quantity}</Text>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.85}
        onPress={onIncrement}
        style={[cartStyles.stepperButton, cartStyles.stepperButtonRight]}
      >
        <Feather color={COLORS.white} name="plus" size={18} />
      </TouchableOpacity>
    </View>
  );
}

export type CartItemRowProps = {
  imageSource: ImageSourcePropType;
  title: string;
  meta?: string;
  priceText?: string;
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onAdd?: () => void;
  containerStyle?: ViewStyle;
};

export function CartItemRow({
  imageSource,
  title,
  meta,
  priceText,
  quantity,
  onIncrement,
  onDecrement,
  onAdd,
  containerStyle,
}: CartItemRowProps) {
  const hasQuantity = quantity > 0;

  return (
    <View style={[cartStyles.itemRow, containerStyle]}>
      <Image resizeMode="cover" source={imageSource} style={cartStyles.itemImage} />

      <View style={cartStyles.itemInfo}>
        <Text numberOfLines={1} style={cartStyles.itemTitle}>
          {title}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={cartStyles.itemMeta}>
            {meta}
          </Text>
        ) : null}
        {priceText ? <Text style={cartStyles.itemPrice}>{priceText}</Text> : null}
      </View>

      <View style={cartStyles.itemAction}>
        {hasQuantity ? (
          <CartQuantityStepper
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            quantity={quantity}
          />
        ) : (
          <CartAddButton iconSize={20} onPress={onAdd} size={44} />
        )}
      </View>
    </View>
  );
}

export type CartTotalsBarProps = {
  subtotalText: string;
  totalText: string;
  buttonTitle: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
};

export function CartTotalsBar({
  subtotalText,
  totalText,
  buttonTitle,
  onPress,
  containerStyle,
}: CartTotalsBarProps) {
  return (
    <View style={[cartStyles.totalsWrap, containerStyle]}>
      <View style={cartStyles.totalsRow}>
        <Text style={cartStyles.totalsLabel}>Subtotal</Text>
        <Text style={cartStyles.totalsValue}>{subtotalText}</Text>
      </View>

      <View style={cartStyles.totalsRow}>
        <Text style={cartStyles.totalsLabel}>Total</Text>
        <Text style={cartStyles.totalsTotal}>{totalText}</Text>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.9}
        onPress={onPress}
        style={cartStyles.checkoutButton}
      >
        <Text style={cartStyles.checkoutButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const cartStyles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  itemRow: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    padding: 12,
  },
  itemImage: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 56,
    marginRight: 12,
    width: 56,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  itemMeta: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  itemPrice: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  itemAction: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  stepperOuter: {
    alignItems: 'center',
    backgroundColor: COLORS.stepperBg,
    borderRadius: 12,
    flexDirection: 'row',
    height: 42,
    overflow: 'hidden',
  },
  stepperButton: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: 42,
  },
  stepperButtonLeft: {
    backgroundColor: COLORS.stepperButtonBg,
    borderRightColor: COLORS.stepperButtonBorder,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  stepperButtonRight: {
    backgroundColor: COLORS.primaryDark,
  },
  stepperButtonDisabled: {
    opacity: 0.6,
  },
  stepperCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
  },
  stepperQuantity: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  totalsWrap: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  totalsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalsLabel: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  totalsValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  totalsTotal: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
