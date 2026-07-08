import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputField from '../components/layout/InputField';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  primary: '#53B175',
  icon: '#181725',
  white: '#FFFFFF',
  blobPink: 'rgba(255, 167, 215, 0.35)',
  blobBlue: 'rgba(147, 197, 253, 0.3)',
  blobPurple: 'rgba(196, 181, 253, 0.25)',
} as const;

const HORIZONTAL_PADDING = 25;
const FAB_SIZE = 67;
const CODE_LENGTH = 4;

export type VerificationScreenProps = {
  onBack?: () => void;
  onNext?: (code: string) => void;
  onResend?: () => void;
  containerStyle?: ViewStyle;
};

export function VerificationScreen({
  onBack,
  onNext,
  onResend,
  containerStyle,
}: VerificationScreenProps) {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');

  const handleNext = () => {
    onNext?.(code);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <View pointerEvents="none" style={styles.background}>
        <View style={[styles.blob, styles.blobTopRight]} />
        <View style={[styles.blob, styles.blobBottomLeft]} />
        <View style={[styles.blob, styles.blobMid]} />
      </View>

      <InputField.Screen style={styles.keyboardView}>
        <View style={[styles.top, { paddingTop: insets.top + 8 }]}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={12}
            onPress={onBack}
            style={styles.backButton}
          >
            <Feather color={COLORS.icon} name="chevron-left" size={28} />
          </Pressable>

          <Text style={styles.title}>Enter your 4-digit code</Text>

          <InputField
            codeLength={CODE_LENGTH}
            containerStyle={styles.field}
            label="Code"
            onChangeText={setCode}
            textInputProps={{
              autoFocus: true,
              onSubmitEditing: handleNext,
            }}
            value={code}
            variant="code"
          />
        </View>

        <View
          style={[
            styles.actionRow,
            {
              bottom: Math.max(insets.bottom, 12) + 12,
              paddingHorizontal: HORIZONTAL_PADDING,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={onResend}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </Pressable>

          <TouchableOpacity
            accessibilityLabel="Continue"
            accessibilityRole="button"
            activeOpacity={0.85}
            onPress={handleNext}
            style={styles.fab}
          >
            <Feather color={COLORS.white} name="chevron-right" size={28} />
          </TouchableOpacity>
        </View>
      </InputField.Screen>
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
    bottom: 180,
    height: 200,
    left: -100,
    width: 200,
  },
  blobMid: {
    backgroundColor: COLORS.blobPurple,
    bottom: 80,
    height: 160,
    right: -40,
    width: 160,
  },
  keyboardView: {
    flex: 1,
  },
  top: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
    width: 40,
  },
  title: {
    color: COLORS.title,
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    marginTop: 48,
  },
  field: {
    marginTop: 32,
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  fab: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: FAB_SIZE / 2,
    elevation: 4,
    height: FAB_SIZE,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    width: FAB_SIZE,
  },
});

export default VerificationScreen;
