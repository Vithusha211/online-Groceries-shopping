import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/layout/Button';
import Header from '../components/layout/Header';
import { ProductQuantityStepper } from '../components/layout/Cards';
import { useToast } from '../components/layout/Toast';
import { TOAST_MESSAGES } from '../constants/toastMessages';
import { addCartItem, addFavourite, removeFavourite } from '../services/cartService';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  muted: '#7C7C7C',
  border: '#E2E2E2',
  primary: '#53B175',
  star: '#F3603F',
  badgeBg: '#F2F3F2',
  dotActive: '#53B175',
  dotInactive: '#D9D9D9',
} as const;

const HORIZONTAL_PADDING = 25;
const screenWidth = Dimensions.get('window').width;
const imageHeight = 300;

const PRODUCT_DESCRIPTION =
  'Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.';

type ImageSlide = {
  id: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  backgroundColor: string;
};

export type ProductDetailData = {
  id: string;
  title: string;
  meta: string;
  price: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBackground: string;
  description?: string;
  nutritionLabel?: string;
  rating?: number;
};

export type ProductDetailScreenProps = {
  product?: ProductDetailData;
  onBack?: () => void;
  onShare?: () => void;
  onAddToBasket?: (product: ProductDetailData, quantity: number) => void;
  onNutritionsPress?: () => void;
  onReviewPress?: () => void;
  containerStyle?: ViewStyle;
};

const DEFAULT_PRODUCT: ProductDetailData = {
  id: 'apple',
  title: 'Naturel Red Apple',
  meta: '1kg, Price',
  price: '$4.99',
  iconName: 'food-apple',
  iconColor: '#E74C3C',
  iconBackground: '#FFF0F0',
  description: PRODUCT_DESCRIPTION,
  nutritionLabel: '100gr',
  rating: 5,
};

const IMAGE_SLIDES: ImageSlide[] = [
  {
    id: '1',
    iconName: 'food-apple',
    iconColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },
  {
    id: '2',
    iconName: 'food-apple-outline',
    iconColor: '#C0392B',
    backgroundColor: '#FFF0F0',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.stars}>
      {Array.from({ length: 5 }, (_, index) => (
        <MaterialCommunityIcons
          key={index}
          color={index < rating ? COLORS.star : COLORS.dotInactive}
          name={index < rating ? 'star' : 'star-outline'}
          size={16}
        />
      ))}
    </View>
  );
}

function DetailRow({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.detailRow}>
      <Pressable
        accessibilityRole="button"
        onPress={onToggle}
        style={styles.detailHeader}
      >
        <Text style={styles.detailTitle}>{title}</Text>
        <Feather
          color={COLORS.title}
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
        />
      </Pressable>
      {expanded && children ? (
        <Text style={styles.detailBody}>{children}</Text>
      ) : null}
    </View>
  );
}

function InfoRow({
  title,
  trailing,
  onPress,
}: {
  title: string;
  trailing: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.infoRow}
    >
      <Text style={styles.detailTitle}>{title}</Text>
      <View style={styles.infoTrailing}>
        {trailing}
        <Feather color={COLORS.title} name="chevron-right" size={20} />
      </View>
    </Pressable>
  );
}

export function ProductDetailScreen({
  product = DEFAULT_PRODUCT,
  onBack,
  onShare,
  onAddToBasket,
  onNutritionsPress,
  onReviewPress,
  containerStyle,
}: ProductDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [detailExpanded, setDetailExpanded] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const listRef = useRef<FlatList<ImageSlide>>(null);

  const slides = IMAGE_SLIDES.map((slide) => ({
    ...slide,
    iconName: product.iconName,
    iconColor: product.iconColor,
    backgroundColor: product.iconBackground,
  }));

  const handleImageScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveImageIndex(index);
  };

  const handleAddToBasket = async () => {
    try {
      await addCartItem(product.id, quantity);
      showSuccess(TOAST_MESSAGES.addToCart);
      onAddToBasket?.(product, quantity);
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not add to cart',
      );
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavourite(product.id);
        setIsFavorite(false);
        showSuccess(TOAST_MESSAGES.removeFavorite);
      } else {
        await addFavourite(product.id);
        setIsFavorite(true);
        showSuccess(TOAST_MESSAGES.addFavorite);
      }
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Could not update favourite',
      );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header
        leftAction="back"
        onLeftPress={onBack}
        onRightPress={onShare}
        rightAction={
          <Feather color={COLORS.title} name="share-2" size={22} />
        }
        title=""
      />

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          ref={listRef}
          data={slides}
          horizontal
          keyExtractor={(item) => item.id}
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={handleImageScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View
              style={[
                styles.imageSlide,
                { backgroundColor: item.backgroundColor, width: screenWidth },
              ]}
            >
              <MaterialCommunityIcons
                color={item.iconColor}
                name={item.iconName}
                size={180}
              />
            </View>
          )}
        />

        <View style={styles.dots}>
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              style={[
                styles.dot,
                index === activeImageIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.meta}>{product.meta}</Text>
            </View>
            <TouchableOpacity
              accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              accessibilityRole="button"
              activeOpacity={0.7}
              hitSlop={8}
              onPress={handleToggleFavorite}
              style={styles.favoriteButton}
            >
              <Feather
                color={isFavorite ? COLORS.primary : COLORS.title}
                name="heart"
                size={22}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <ProductQuantityStepper
              quantity={quantity}
              onDecrement={() => setQuantity((current) => Math.max(1, current - 1))}
              onIncrement={() => setQuantity((current) => current + 1)}
            />
            <Text style={styles.price}>{product.price}</Text>
          </View>

          <View style={styles.sections}>
            <DetailRow
              expanded={detailExpanded}
              title="Product Detail"
              onToggle={() => setDetailExpanded((current) => !current)}
            >
              {product.description}
            </DetailRow>

            <View style={styles.divider} />

            <InfoRow
              title="Nutritions"
              onPress={onNutritionsPress}
              trailing={
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{product.nutritionLabel}</Text>
                </View>
              }
            />

            <View style={styles.divider} />

            <InfoRow
              title="Review"
              onPress={onReviewPress}
              trailing={<StarRating rating={product.rating ?? 5} />}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <Button onPress={handleAddToBasket} title="Add To Basket" />
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
    paddingBottom: 24,
  },
  imageSlide: {
    alignItems: 'center',
    height: imageHeight,
    justifyContent: 'center',
  },
  dots: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: COLORS.dotActive,
  },
  dotInactive: {
    backgroundColor: COLORS.dotInactive,
  },
  content: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 24,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: COLORS.title,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
  },
  favoriteButton: {
    marginTop: 4,
    padding: 4,
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  price: {
    color: COLORS.title,
    fontSize: 24,
    fontWeight: '700',
  },
  sections: {
    marginTop: 24,
  },
  detailRow: {
    paddingVertical: 16,
  },
  detailHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailTitle: {
    color: COLORS.title,
    fontSize: 16,
    fontWeight: '600',
  },
  detailBody: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 10,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  infoTrailing: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.badgeBg,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  divider: {
    backgroundColor: COLORS.border,
    height: StyleSheet.hairlineWidth,
  },
  footer: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
  },
});

export default ProductDetailScreen;
