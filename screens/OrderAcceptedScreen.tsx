import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/layout/Button';

const COLORS = {
  background: '#FCFCFC',
  title: '#181725',
  subtitle: '#7C7C7C',
  primary: '#53B175',
  primaryRing: 'rgba(83, 177, 117, 0.2)',
  white: '#FFFFFF',
  blobPink: 'rgba(255, 167, 215, 0.35)',
  blobBlue: 'rgba(147, 197, 253, 0.3)',
  blobPurple: 'rgba(196, 181, 253, 0.25)',
  blobGreen: 'rgba(134, 239, 172, 0.2)',
  confettiBlue: '#4C84FF',
  confettiOrange: '#F28C28',
  confettiPurple: '#9B59B6',
  confettiRed: '#E74C3C',
} as const;

const HORIZONTAL_PADDING = 25;
const SUCCESS_SIZE = 96;

type ConfettiDotProps = {
  color: string;
  size: number;
  style: ViewStyle;
  hollow?: boolean;
};

function ConfettiDot({ color, size, style, hollow = false }: ConfettiDotProps) {
  return (
    <View
      style={[
        styles.confettiDot,
        {
          backgroundColor: hollow ? 'transparent' : color,
          borderColor: color,
          borderWidth: hollow ? 2 : 0,
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
}

function SuccessIllustration() {
  return (
    <View style={styles.illustration}>
      <ConfettiDot color={COLORS.confettiBlue} size={8} style={styles.dotTopLeft} />
      <ConfettiDot color={COLORS.primary} hollow size={10} style={styles.dotTopRight} />
      <ConfettiDot color={COLORS.confettiOrange} size={7} style={styles.dotMidLeft} />
      <ConfettiDot color={COLORS.confettiPurple} hollow size={12} style={styles.dotMidRight} />
      <ConfettiDot color={COLORS.confettiRed} size={6} style={styles.dotBottomLeft} />
      <ConfettiDot color={COLORS.confettiBlue} hollow size={9} style={styles.dotBottomRight} />

      <View style={styles.squiggleBlue} />
      <View style={styles.squiggleOrange} />

      <View style={styles.successRing}>
        <View style={styles.successCircle}>
          <Feather color={COLORS.white} name="check" size={48} />
        </View>
      </View>
    </View>
  );
}

export type OrderAcceptedScreenProps = {
  onTrackOrder?: () => void;
  onBackHome?: () => void;
  containerStyle?: ViewStyle;
};

export function OrderAcceptedScreen({
  onTrackOrder,
  onBackHome,
  containerStyle,
}: OrderAcceptedScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <View pointerEvents="none" style={styles.background}>
        <View style={[styles.blob, styles.blobTopRight]} />
        <View style={[styles.blob, styles.blobBottomLeft]} />
        <View style={[styles.blob, styles.blobMid]} />
        <View style={[styles.blob, styles.blobBottomRight]} />
      </View>

      <View
        style={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 24) + 16,
            paddingTop: insets.top + 24,
          },
        ]}
      >
        <View style={styles.main}>
          <SuccessIllustration />

          <Text style={styles.title}>Your Order has been accepted</Text>
          <Text style={styles.subtitle}>
            Your items has been placed and is on it&apos;s way to being processed
          </Text>
        </View>

        <View style={styles.actions}>
          <Button onPress={onTrackOrder} title="Track Order" />
          <Pressable
            accessibilityRole="button"
            hitSlop={12}
            onPress={onBackHome}
            style={styles.backHomeButton}
          >
            <Text style={styles.backHomeText}>Back to home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    borderRadius: 999,
    position: 'absolute',
  },
  blobTopRight: {
    backgroundColor: COLORS.blobPink,
    height: 220,
    right: -90,
    top: -60,
    width: 220,
  },
  blobBottomLeft: {
    backgroundColor: COLORS.blobBlue,
    bottom: 120,
    height: 200,
    left: -100,
    width: 200,
  },
  blobMid: {
    backgroundColor: COLORS.blobPurple,
    bottom: 220,
    height: 160,
    right: -40,
    width: 160,
  },
  blobBottomRight: {
    backgroundColor: COLORS.blobGreen,
    bottom: -40,
    height: 140,
    right: -20,
    width: 140,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  illustration: {
    alignItems: 'center',
    height: 240,
    justifyContent: 'center',
    marginBottom: 40,
    width: 270,
  },
  successRing: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryRing,
    borderRadius: (SUCCESS_SIZE + 28) / 2,
    height: SUCCESS_SIZE + 28,
    justifyContent: 'center',
    width: SUCCESS_SIZE + 28,
  },
  successCircle: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SUCCESS_SIZE / 2,
    height: SUCCESS_SIZE,
    justifyContent: 'center',
    width: SUCCESS_SIZE,
  },
  confettiDot: {
    position: 'absolute',
  },
  dotTopLeft: {
    left: 24,
    top: 28,
  },
  dotTopRight: {
    right: 36,
    top: 18,
  },
  dotMidLeft: {
    left: 8,
    top: 108,
  },
  dotMidRight: {
    right: 12,
    top: 96,
  },
  dotBottomLeft: {
    bottom: 36,
    left: 42,
  },
  dotBottomRight: {
    bottom: 28,
    right: 48,
  },
  squiggleBlue: {
    borderColor: COLORS.confettiBlue,
    borderRadius: 20,
    borderTopWidth: 3,
    height: 18,
    left: 18,
    position: 'absolute',
    top: 72,
    transform: [{ rotate: '-18deg' }],
    width: 34,
  },
  squiggleOrange: {
    borderColor: COLORS.confettiOrange,
    borderRadius: 20,
    borderTopWidth: 3,
    height: 18,
    position: 'absolute',
    right: 28,
    top: 64,
    transform: [{ rotate: '22deg' }],
    width: 30,
  },
  title: {
    color: COLORS.title,
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.subtitle,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 16,
    maxWidth: 280,
    textAlign: 'center',
  },
  actions: {
    gap: 24,
    paddingBottom: 8,
  },
  backHomeButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  backHomeText: {
    color: COLORS.title,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OrderAcceptedScreen;
