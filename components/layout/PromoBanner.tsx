import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  title: '#181725',
  accent: '#53B175',
  dotActive: '#53B175',
  dotInactive: '#D9D9D9',
} as const;

const HORIZONTAL_PADDING = 25;
const BANNER_GAP = 12;
const screenWidth = Dimensions.get('window').width;
const bannerWidth = screenWidth - HORIZONTAL_PADDING * 2;
const bannerHeight = 115;

type BannerSlide = {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  icons: Array<{
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    size: number;
    style: { top?: number; right?: number; bottom?: number; left?: number };
  }>;
};

const SLIDES: BannerSlide[] = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    subtitle: 'Get Up To 40% OFF',
    backgroundColor: '#FEF0E6',
    icons: [
      { name: 'carrot', color: '#F28C28', size: 44, style: { top: 18, right: 28 } },
      { name: 'food-apple', color: '#E74C3C', size: 40, style: { top: 52, right: 88 } },
      { name: 'chili-hot', color: '#27AE60', size: 38, style: { top: 24, right: 120 } },
      { name: 'food-variant', color: '#8E44AD', size: 36, style: { bottom: 16, right: 36 } },
    ],
  },
  {
    id: '2',
    title: 'Organic Fruits',
    subtitle: 'Get Up To 30% OFF',
    backgroundColor: '#E8F8EF',
    icons: [
      { name: 'fruit-grapes', color: '#9B59B6', size: 42, style: { top: 20, right: 32 } },
      { name: 'fruit-citrus', color: '#F39C12', size: 40, style: { top: 48, right: 96 } },
      { name: 'food-apple', color: '#C0392B', size: 38, style: { bottom: 18, right: 44 } },
    ],
  },
];

export type PromoBannerProps = {
  containerStyle?: ViewStyle;
};

export function PromoBanner({ containerStyle }: PromoBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<BannerSlide>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (bannerWidth + BANNER_GAP),
    );
    setActiveIndex(index);
  };

  return (
    <View style={[styles.wrap, containerStyle]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        keyExtractor={(item) => item.id}
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToInterval={bannerWidth + BANNER_GAP}
        snapToAlignment="start"
        contentContainerStyle={styles.listContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.banner, { backgroundColor: item.backgroundColor, width: bannerWidth }]}>
            <View style={styles.textBlock}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            </View>

            <View style={styles.iconCluster}>
              {item.icons.map((icon) => (
                <MaterialCommunityIcons
                  key={`${item.id}-${icon.name}`}
                  color={icon.color}
                  name={icon.name}
                  size={icon.size}
                  style={[styles.bannerIcon, icon.style]}
                />
              ))}
            </View>
          </View>
        )}
      />

      <View style={styles.dots}>
        {SLIDES.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 10,
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  banner: {
    borderRadius: 18,
    height: bannerHeight,
    marginRight: BANNER_GAP,
    overflow: 'hidden',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  textBlock: {
    maxWidth: '58%',
  },
  bannerTitle: {
    color: COLORS.title,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  bannerSubtitle: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  iconCluster: {
    ...StyleSheet.absoluteFillObject,
  },
  bannerIcon: {
    position: 'absolute',
  },
  dots: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 14,
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
});

export default PromoBanner;
