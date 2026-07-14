import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
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
import { LogoutConfirmPopup } from '../components/layout/PopupMessage';
import { useToast } from '../components/layout/Toast';
import { TOAST_MESSAGES } from '../constants/toastMessages';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  muted: '#7C7C7C',
  primary: '#53B175',
  border: '#E2E2E2',
  logoutBg: '#F2F3F2',
  avatarBg: '#E8F4E0',
} as const;

const HORIZONTAL_PADDING = 25;

type AccountMenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

const MENU_ITEMS: AccountMenuItem[] = [
  { id: 'orders', label: 'Orders', icon: 'shopping-bag' },
  { id: 'details', label: 'My Details', icon: 'user' },
  { id: 'address', label: 'Delivery Address', icon: 'map-pin' },
  { id: 'payment', label: 'Payment Methods', icon: 'credit-card' },
  { id: 'promo', label: 'Promo Card', icon: 'tag' },
  { id: 'notifications', label: 'Notifecations', icon: 'bell' },
  { id: 'help', label: 'Help', icon: 'help-circle' },
  { id: 'about', label: 'About', icon: 'info' },
];

function AccountMenuRow({
  item,
  onPress,
}: {
  item: AccountMenuItem;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.menuRow}
    >
      <Feather color={COLORS.muted} name={item.icon} size={22} />
      <Text style={styles.menuLabel}>{item.label}</Text>
      <Feather color={COLORS.muted} name="chevron-right" size={20} />
    </TouchableOpacity>
  );
}

export type AccountScreenProps = {
  name?: string;
  email?: string;
  onEditProfile?: () => void;
  onMenuPress?: (itemId: string) => void;
  onLogout?: () => void | Promise<void>;
  containerStyle?: ViewStyle;
};

export function AccountScreen({
  name = 'Afsar Hossen',
  email = 'imshuvo97@gmail.com',
  onEditProfile,
  onMenuPress,
  onLogout,
  containerStyle,
}: AccountScreenProps) {
  const insets = useSafeAreaInsets();
  const { showSuccess } = useToast();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogoutConfirm = async () => {
    setLogoutVisible(false);
    try {
      await onLogout?.();
      showSuccess(TOAST_MESSAGES.logoutSuccess);
    } catch {
      showSuccess(TOAST_MESSAGES.logoutSuccess);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <ScrollView
        bounces
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons color={COLORS.primary} name="account" size={40} />
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text numberOfLines={1} style={styles.name}>
                {name}
              </Text>
              <Pressable
                accessibilityLabel="Edit profile"
                accessibilityRole="button"
                hitSlop={8}
                onPress={onEditProfile}
              >
                <Feather color={COLORS.primary} name="edit-2" size={18} />
              </Pressable>
            </View>
            <Text numberOfLines={1} style={styles.email}>
              {email}
            </Text>
          </View>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <AccountMenuRow
              key={item.id}
              item={item}
              onPress={() => onMenuPress?.(item.id)}
            />
          ))}
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.85}
          onPress={() => setLogoutVisible(true)}
          style={styles.logoutButton}
        >
          <Feather color={COLORS.primary} name="log-out" size={22} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <LogoutConfirmPopup
        onClose={() => setLogoutVisible(false)}
        onConfirm={handleLogoutConfirm}
        visible={logoutVisible}
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
    paddingBottom: 24,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  profileRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.avatarBg,
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  nameRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    color: COLORS.title,
    flexShrink: 1,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 20,
    fontWeight: '600',
  },
  email: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  menu: {
    marginBottom: 24,
  },
  menuRow: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 20,
    minHeight: 56,
    paddingVertical: 16,
  },
  menuLabel: {
    color: COLORS.title,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: COLORS.logoutBg,
    borderRadius: 19,
    flexDirection: 'row',
    gap: 12,
    height: 67,
    justifyContent: 'center',
    marginTop: 'auto',
  },
  logoutText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AccountScreen;
