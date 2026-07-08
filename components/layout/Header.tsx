import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  border: '#E2E2E2',
  searchBackground: '#F2F3F2',
  searchPlaceholder: '#7C7C7C',
  icon: '#181725',
  carrot: '#F9A826',
} as const;

const HEADER_HEIGHT = 57;
const SEARCH_HEIGHT = 50;
const SIDE_SLOT_WIDTH = 48;
const HORIZONTAL_PADDING = 25;

export type HeaderLeftAction = 'back' | 'close';
export type HeaderRightAction = 'filter';

export type HeaderProps = {
  title: string;
  leftAction?: HeaderLeftAction | React.ReactNode;
  onLeftPress?: () => void;
  rightAction?: HeaderRightAction | React.ReactNode;
  onRightPress?: () => void;
  showSearch?: boolean;
  searchBarOnly?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onSearchClear?: () => void;
  onSearchSubmit?: () => void;
  showBorder?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

function HeaderIconButton({
  onPress,
  children,
  align = 'left',
}: {
  onPress?: () => void;
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.iconButton, align === 'right' && styles.iconButtonRight]}
    >
      {children}
    </TouchableOpacity>
  );
}

function renderLeftAction(
  leftAction: HeaderProps['leftAction'],
  onLeftPress?: () => void,
) {
  if (!leftAction) {
    return <View style={styles.sideSlot} />;
  }

  if (leftAction === 'back') {
    return (
      <HeaderIconButton onPress={onLeftPress}>
        <Feather color={COLORS.icon} name="chevron-left" size={24} />
      </HeaderIconButton>
    );
  }

  if (leftAction === 'close') {
    return (
      <HeaderIconButton onPress={onLeftPress}>
        <Feather color={COLORS.icon} name="x" size={22} />
      </HeaderIconButton>
    );
  }

  return <View style={styles.sideSlot}>{leftAction}</View>;
}

function renderRightAction(
  rightAction: HeaderProps['rightAction'],
  onRightPress?: () => void,
) {
  if (!rightAction) {
    return <View style={styles.sideSlot} />;
  }

  if (rightAction === 'filter') {
    return (
      <HeaderIconButton align="right" onPress={onRightPress}>
        <Feather color={COLORS.icon} name="sliders" size={20} />
      </HeaderIconButton>
    );
  }

  return <View style={[styles.sideSlot, styles.sideSlotRight]}>{rightAction}</View>;
}

export function Header({
  title,
  leftAction,
  onLeftPress,
  rightAction,
  onRightPress,
  showSearch = false,
  searchBarOnly = false,
  searchPlaceholder = 'Search Store',
  searchValue,
  onSearchChange,
  onSearchClear,
  onSearchSubmit,
  showBorder = false,
  containerStyle,
  titleStyle,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const showClearButton = Boolean(searchValue?.length);

  const handleClearSearch = () => {
    onSearchChange?.('');
    onSearchClear?.();
  };

  const searchField = (
    <View style={[styles.searchContainer, searchBarOnly && styles.searchContainerInline]}>
      <Feather
        color={COLORS.searchPlaceholder}
        name="search"
        size={18}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder={searchPlaceholder}
        placeholderTextColor={COLORS.searchPlaceholder}
        returnKeyType="search"
        style={styles.searchInput}
        value={searchValue}
        onChangeText={onSearchChange}
        onSubmitEditing={onSearchSubmit}
      />
      {showClearButton ? (
        <TouchableOpacity
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          activeOpacity={0.7}
          hitSlop={8}
          onPress={handleClearSearch}
          style={styles.clearButton}
        >
          <Feather color={COLORS.searchPlaceholder} name="x" size={18} />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
        },
        containerStyle,
      ]}
    >
      {searchBarOnly ? (
        <View style={styles.searchBarRow}>
          <View style={styles.searchBarField}>{searchField}</View>
          {renderRightAction(rightAction ?? 'filter', onRightPress)}
        </View>
      ) : (
        <>
          <View style={styles.headerRow}>
            {renderLeftAction(leftAction, onLeftPress)}

            <View pointerEvents="none" style={styles.titleContainer}>
              <Text numberOfLines={1} style={[styles.title, titleStyle]}>
                {title}
              </Text>
            </View>

            {renderRightAction(rightAction, onRightPress)}
          </View>

          {showSearch ? searchField : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderBottomColor: COLORS.border,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
  },
  sideSlot: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: SIDE_SLOT_WIDTH,
  },
  sideSlotRight: {
    alignItems: 'flex-end',
  },
  iconButton: {
    alignItems: 'center',
    height: SIDE_SLOT_WIDTH,
    justifyContent: 'center',
    marginLeft: -8,
    width: SIDE_SLOT_WIDTH,
  },
  iconButtonRight: {
    marginLeft: 0,
    marginRight: -8,
  },
  titleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIDE_SLOT_WIDTH + 8,
  },
  title: {
    color: COLORS.title,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.searchBackground,
    borderRadius: SEARCH_HEIGHT / 2,
    flexDirection: 'row',
    height: SEARCH_HEIGHT,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchContainerInline: {
    flex: 1,
    marginBottom: 0,
  },
  searchBarRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    minHeight: SEARCH_HEIGHT,
  },
  searchBarField: {
    flex: 1,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    color: COLORS.title,
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
});

// --- HomeHeader ---

export type HomeHeaderProps = {
  location?: string;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onLocationPress?: () => void;
  containerStyle?: ViewStyle;
};

const HOME_SEARCH_HEIGHT = 52;

export function HomeHeader({
  location = 'Dhaka, Banassree',
  searchValue,
  onSearchChange,
  onLocationPress,
  containerStyle,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        homeHeaderStyles.container,
        { paddingTop: insets.top + 4 },
        containerStyle,
      ]}
    >
      <MaterialCommunityIcons color={COLORS.carrot} name="carrot" size={28} />

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.7}
        onPress={onLocationPress}
        style={homeHeaderStyles.locationRow}
      >
        <Feather color={COLORS.searchPlaceholder} name="map-pin" size={16} />
        <Text numberOfLines={1} style={homeHeaderStyles.locationText}>
          {location}
        </Text>
        <Feather color={COLORS.searchPlaceholder} name="chevron-down" size={16} />
      </TouchableOpacity>

      <View style={homeHeaderStyles.searchContainer}>
        <Feather
          color={COLORS.searchPlaceholder}
          name="search"
          size={18}
          style={homeHeaderStyles.searchIcon}
        />
        <TextInput
          placeholder="Search Store"
          placeholderTextColor={COLORS.searchPlaceholder}
          returnKeyType="search"
          style={homeHeaderStyles.searchInput}
          value={searchValue}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
}

const homeHeaderStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingBottom: 16,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  locationText: {
    color: COLORS.title,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: 200,
  },
  searchContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.searchBackground,
    borderRadius: HOME_SEARCH_HEIGHT / 2,
    flexDirection: 'row',
    height: HOME_SEARCH_HEIGHT,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    color: COLORS.title,
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
});

export default Header;
