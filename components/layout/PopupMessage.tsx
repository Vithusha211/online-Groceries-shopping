import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Button from './Button';

const COLORS = {
  overlay: 'rgba(24, 23, 37, 0.45)',
  card: '#FFFFFF',
  text: '#181725',
  muted: '#7C7C7C',
  primary: '#53B175',
  illustrationRing: '#E8F8EF',
  bag: '#C4A574',
} as const;

const HORIZONTAL_MARGIN = 25;
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth - HORIZONTAL_MARGIN * 2;

export type PopupMessageProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  primaryTitle: string;
  secondaryTitle?: string;
  illustration?: React.ReactNode | null;
  onClose?: () => void;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  containerStyle?: ViewStyle;
};

function GroceryBagIllustration() {
  return (
    <View style={illustrationStyles.ring}>
      <View style={illustrationStyles.bag}>
        <MaterialCommunityIcons
          color="#5DADE2"
          name="bottle-soda"
          size={22}
          style={illustrationStyles.bottle}
        />
        <MaterialCommunityIcons
          color="#FA6E23"
          name="carrot"
          size={20}
          style={illustrationStyles.carrot}
        />
        <MaterialCommunityIcons
          color="#8E44AD"
          name="food-variant"
          size={18}
          style={illustrationStyles.eggplant}
        />
        <MaterialCommunityIcons
          color="#F5C542"
          name="corn"
          size={20}
          style={illustrationStyles.corn}
        />
        <MaterialCommunityIcons
          color="#D4A574"
          name="baguette"
          size={24}
          style={illustrationStyles.bread}
        />
        <MaterialCommunityIcons
          color={COLORS.bag}
          name="shopping"
          size={72}
          style={illustrationStyles.bagIcon}
        />
      </View>
    </View>
  );
}

export function PopupMessage({
  visible,
  title,
  subtitle,
  primaryTitle,
  secondaryTitle = 'Back to home',
  illustration,
  onClose,
  onPrimaryPress,
  onSecondaryPress,
  containerStyle,
}: PopupMessageProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.modalRoot}>
        <Pressable accessibilityRole="button" onPress={onClose} style={styles.overlay} />

        <View style={[styles.card, { width: cardWidth }, containerStyle]}>
          <TouchableOpacity
            accessibilityLabel="Close"
            accessibilityRole="button"
            hitSlop={12}
            onPress={onClose}
            style={styles.closeButton}
          >
            <Feather color={COLORS.text} name="x" size={22} />
          </TouchableOpacity>

          {illustration !== null ? (
            <View style={styles.illustrationWrap}>
              {illustration === undefined ? <GroceryBagIllustration /> : illustration}
            </View>
          ) : null}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <Button containerStyle={styles.primaryButton} onPress={onPrimaryPress} title={primaryTitle} />

          {secondaryTitle ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={12}
              onPress={onSecondaryPress ?? onClose}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryText}>{secondaryTitle}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

export type OrderFailedPopupProps = {
  visible: boolean;
  onClose?: () => void;
  onRetry?: () => void;
  onBackHome?: () => void;
  containerStyle?: ViewStyle;
};

export function OrderFailedPopup({
  visible,
  onClose,
  onRetry,
  onBackHome,
  containerStyle,
}: OrderFailedPopupProps) {
  return (
    <PopupMessage
      containerStyle={containerStyle}
      onClose={onClose}
      onPrimaryPress={onRetry}
      onSecondaryPress={onBackHome}
      primaryTitle="Please Try Again"
      secondaryTitle="Back to home"
      subtitle="Something went terribly wrong."
      title="Oops! Order Failed"
      visible={visible}
    />
  );
}

function LogoutIllustration() {
  return (
    <View style={logoutIllustrationStyles.ring}>
      <Feather color={COLORS.primary} name="log-out" size={44} />
    </View>
  );
}

export type LogoutConfirmPopupProps = {
  visible: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  containerStyle?: ViewStyle;
};

export function LogoutConfirmPopup({
  visible,
  onClose,
  onConfirm,
  containerStyle,
}: LogoutConfirmPopupProps) {
  return (
    <PopupMessage
      containerStyle={containerStyle}
      illustration={<LogoutIllustration />}
      onClose={onClose}
      onPrimaryPress={onConfirm}
      onSecondaryPress={onClose}
      primaryTitle="Yes, Log Out"
      secondaryTitle="Cancel"
      subtitle="Are you sure you want to log out?"
      title="Log Out"
      visible={visible}
    />
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  illustrationWrap: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 12,
    textAlign: 'center',
  },
  primaryButton: {
    marginTop: 28,
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 4,
  },
  secondaryText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

const illustrationStyles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    backgroundColor: COLORS.illustrationRing,
    borderRadius: 111,
    height: 222,
    justifyContent: 'center',
    width: 222,
  },
  bag: {
    alignItems: 'center',
    height: 140,
    justifyContent: 'center',
    width: 140,
  },
  bagIcon: {
    marginTop: 8,
  },
  bottle: {
    position: 'absolute',
    left: 18,
    top: 8,
  },
  carrot: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
  eggplant: {
    position: 'absolute',
    left: 24,
    top: 48,
  },
  corn: {
    position: 'absolute',
    right: 16,
    top: 52,
  },
  bread: {
    position: 'absolute',
    top: 0,
  },
});

const logoutIllustrationStyles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    backgroundColor: COLORS.illustrationRing,
    borderRadius: 56,
    height: 112,
    justifyContent: 'center',
    width: 112,
  },
});

export default PopupMessage;
