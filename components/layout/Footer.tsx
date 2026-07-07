import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  background: '#FFFFFF',
  border: '#E2E2E2',
  active: '#53B175',
  inactive: '#181725',
} as const;

const FOOTER_HEIGHT = 92;
const ICON_SIZE = 24;
const LABEL_FONT_SIZE = 12;

export type FooterTab = 'shop' | 'explore' | 'cart' | 'favourite' | 'account';

type TabConfig = {
  key: FooterTab;
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

const TABS: TabConfig[] = [
  { key: 'shop', label: 'Shop', icon: 'grid' },
  { key: 'explore', label: 'Explore', icon: 'search' },
  { key: 'cart', label: 'Cart', icon: 'shopping-cart' },
  { key: 'favourite', label: 'Favourite', icon: 'heart' },
  { key: 'account', label: 'Account', icon: 'user' },
];

export type FooterProps = {
  activeTab: FooterTab;
  onTabPress: (tab: FooterTab) => void;
  containerStyle?: ViewStyle;
};

function FooterTabItem({
  tab,
  isActive,
  onPress,
}: {
  tab: TabConfig;
  isActive: boolean;
  onPress: () => void;
}) {
  const color = isActive ? COLORS.active : COLORS.inactive;

  return (
    <TouchableOpacity
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.tab}
    >
      <Feather color={color} name={tab.icon} size={ICON_SIZE} />
      <Text style={[styles.label, { color }]}>{tab.label}</Text>
    </TouchableOpacity>
  );
}

export function Footer({ activeTab, onTabPress, containerStyle }: FooterProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottomPadding },
        containerStyle,
      ]}
    >
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <FooterTabItem
            key={tab.key}
            isActive={activeTab === tab.key}
            tab={tab}
            onPress={() => onTabPress(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    minHeight: FOOTER_HEIGHT,
    paddingTop: 16,
  },
  tabRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
    minWidth: 56,
  },
  label: {
    fontSize: LABEL_FONT_SIZE,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Footer;
