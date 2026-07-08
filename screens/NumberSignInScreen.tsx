import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
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
  background: '#FCFCFC',
  title: '#030303',
  muted: '#828282',
  border: '#E2E2E2',
  text: '#030303',
  google: '#5383EC',
  facebook: '#4A66AC',
  white: '#FFFFFF',
  blobPink: 'rgba(255, 167, 215, 0.28)',
  blobBlue: 'rgba(147, 197, 253, 0.28)',
  blobGreen: 'rgba(134, 239, 172, 0.2)',
} as const;

const HORIZONTAL_PADDING = 25;
const BUTTON_HEIGHT = 67;
const HERO_HEIGHT = 360;

export type NumberSignInScreenProps = {
  onContinue?: (phone: string) => void;
  onGoogle?: () => void;
  onFacebook?: () => void;
  backgroundSource?: ImageSourcePropType;
  containerStyle?: ViewStyle;
};

export function NumberSignInScreen({
  onContinue,
  onGoogle,
  onFacebook,
  backgroundSource = require('../assets/welcome-bg.jpg'),
  containerStyle,
}: NumberSignInScreenProps) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <InputField.Screen scrollable scrollContentContainerStyle={styles.scrollContent}>
          <Image
            resizeMode="cover"
            source={backgroundSource}
            style={styles.hero}
          />

          <View
            style={[
              styles.content,
              { paddingBottom: Math.max(insets.bottom, 24) + 40 },
            ]}
          >
            <View pointerEvents="none" style={styles.blobs}>
              <View style={[styles.blob, styles.blobLeft]} />
              <View style={[styles.blob, styles.blobRight]} />
              <View style={[styles.blob, styles.blobBottom]} />
            </View>

            <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>

            <View style={styles.phoneField}>
              <Text style={styles.flag}>🇧🇩</Text>
              <Text style={styles.countryCode}>+880</Text>
              <TextInput
                keyboardType="phone-pad"
                onChangeText={setPhone}
                onSubmitEditing={() => onContinue?.(phone)}
                placeholder=""
                style={styles.phoneInput}
                value={phone}
              />
            </View>

            <Text style={styles.divider}>Or connect with social media</Text>

            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.85}
              onPress={onGoogle}
              style={[styles.socialButton, styles.googleButton]}
            >
              <FontAwesome
                color={COLORS.white}
                name="google"
                size={20}
                style={styles.socialIcon}
              />
              <Text style={styles.socialLabel}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.85}
              onPress={onFacebook}
              style={[styles.socialButton, styles.facebookButton]}
            >
              <FontAwesome
                color={COLORS.white}
                name="facebook"
                size={22}
                style={styles.socialIcon}
              />
              <Text style={styles.socialLabel}>Continue with Facebook</Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    height: HERO_HEIGHT,
    width: '100%',
  },
  content: {
    backgroundColor: COLORS.background,
    flexGrow: 1,
    overflow: 'hidden',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 40,
  },
  blobs: {
    ...StyleSheet.absoluteFillObject,
  },
  blob: {
    borderRadius: 999,
    position: 'absolute',
  },
  blobLeft: {
    backgroundColor: COLORS.blobPink,
    bottom: 40,
    height: 180,
    left: -90,
    width: 180,
  },
  blobRight: {
    backgroundColor: COLORS.blobBlue,
    bottom: 100,
    height: 160,
    right: -70,
    width: 160,
  },
  blobBottom: {
    backgroundColor: COLORS.blobGreen,
    bottom: -50,
    height: 140,
    left: '30%',
    width: 140,
  },
  title: {
    color: COLORS.title,
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: 34,
  },
  phoneField: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginTop: 30,
    minHeight: 48,
    paddingBottom: 12,
  },
  flag: {
    fontSize: 22,
    marginRight: 12,
  },
  countryCode: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    marginRight: 12,
  },
  phoneInput: {
    color: COLORS.text,
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    padding: 0,
  },
  divider: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 38,
    marginTop: 40,
    textAlign: 'center',
  },
  socialButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 19,
    flexDirection: 'row',
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  googleButton: {
    backgroundColor: COLORS.google,
    marginBottom: 20,
  },
  facebookButton: {
    backgroundColor: COLORS.facebook,
  },
  socialIcon: {
    left: 34,
    position: 'absolute',
  },
  socialLabel: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NumberSignInScreen;
