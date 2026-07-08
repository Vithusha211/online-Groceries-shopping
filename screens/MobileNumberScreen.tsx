import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputField from '../components/layout/InputField';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  label: '#7C7C7C',
  text: '#181725',
  border: '#E2E2E2',
  primary: '#53B175',
  icon: '#181725',
  white: '#FFFFFF',
  blobPink: 'rgba(255, 167, 215, 0.35)',
  blobBlue: 'rgba(147, 197, 253, 0.3)',
  blobPurple: 'rgba(196, 181, 253, 0.25)',
} as const;

const HORIZONTAL_PADDING = 25;
const FAB_SIZE = 67;

export type MobileNumberScreenProps = {
  onBack?: () => void;
  onNext?: (phone: string) => void;
  initialPhone?: string;
  containerStyle?: ViewStyle;
};

export function MobileNumberScreen({
  onBack,
  onNext,
  initialPhone = '',
  containerStyle,
}: MobileNumberScreenProps) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [phone, setPhone] = useState(initialPhone);

  const handleNext = () => {
    onNext?.(phone);
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

          <Text style={styles.title}>Enter your mobile number</Text>

          <Pressable
            onPress={() => inputRef.current?.focus()}
            style={styles.field}
          >
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputRow}>
              <Text style={styles.flag}>🇧🇩</Text>
              <Text style={styles.countryCode}>+880</Text>
              <TextInput
                autoFocus
                keyboardType="phone-pad"
                onChangeText={setPhone}
                onSubmitEditing={handleNext}
                ref={inputRef}
                style={styles.input}
                value={phone}
              />
            </View>
          </Pressable>
        </View>

        <View
          style={[
            styles.fabRow,
            {
              bottom: Math.max(insets.bottom, 12) + 12,
              paddingRight: HORIZONTAL_PADDING,
            },
          ]}
        >
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
  label: {
    color: COLORS.label,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputRow: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 40,
    paddingBottom: 8,
  },
  flag: {
    fontSize: 22,
    marginRight: 12,
  },
  countryCode: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    marginRight: 10,
  },
  input: {
    color: COLORS.text,
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    padding: 0,
  },
  fabRow: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    width: '100%',
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

export default MobileNumberScreen;
