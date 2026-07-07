import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/layout/Button';
import InputField from '../components/layout/InputField';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  subtitle: '#7C7C7C',
  primary: '#53B175',
  blobPink: 'rgba(255, 167, 215, 0.35)',
  blobBlue: 'rgba(147, 197, 253, 0.35)',
  blobGreen: 'rgba(134, 239, 172, 0.25)',
} as const;

const HORIZONTAL_PADDING = 25;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignUpScreenProps = {
  onSignUp?: (credentials: {
    username: string;
    email: string;
    password: string;
  }) => void;
  onLogin?: () => void;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
  containerStyle?: ViewStyle;
};

export function SignUpScreen({
  onSignUp,
  onLogin,
  onTermsPress,
  onPrivacyPress,
  containerStyle,
}: SignUpScreenProps) {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);

  const handleSignUp = () => {
    onSignUp?.({ username, email, password });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <View pointerEvents="none" style={styles.background}>
        <View style={[styles.blob, styles.blobTopLeft]} />
        <View style={[styles.blob, styles.blobTopRight]} />
        <View style={[styles.blob, styles.blobBottomLeft]} />
        <View style={[styles.blob, styles.blobBottomRight]} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: Math.max(insets.bottom, 24),
              paddingTop: insets.top + 24,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons color="#FA6E23" name="carrot" size={48} />
          </View>

          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>

          <View style={styles.form}>
            <InputField
              autoCapitalize="words"
              label="Username"
              onChangeText={setUsername}
              textInputProps={{ autoComplete: 'name' }}
              value={username}
            />

            <InputField
              autoCapitalize="none"
              containerStyle={styles.fieldSpacing}
              keyboardType="email-address"
              label="Email"
              onChangeText={setEmail}
              rightIcon={
                isEmailValid ? (
                  <Feather color={COLORS.primary} name="check" size={20} />
                ) : undefined
              }
              textInputProps={{ autoComplete: 'email' }}
              value={email}
            />

            <InputField
              containerStyle={styles.fieldSpacing}
              label="Password"
              onChangeText={setPassword}
              secureTextEntry
              textInputProps={{ autoComplete: 'password-new' }}
              value={password}
            />

            <Text style={styles.termsText}>
              By continuing you agree to our{' '}
              <Text onPress={onTermsPress} style={styles.termsLink}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text onPress={onPrivacyPress} style={styles.termsLink}>
                Privacy Policy
              </Text>
              .
            </Text>

            <Button
              containerStyle={styles.signUpButton}
              onPress={handleSignUp}
              title="Sign Up"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text onPress={onLogin} style={styles.footerLink}>
                Singup
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  blobTopLeft: {
    backgroundColor: COLORS.blobPink,
    height: 220,
    left: -80,
    top: -40,
    width: 220,
  },
  blobTopRight: {
    backgroundColor: COLORS.blobBlue,
    height: 180,
    right: -60,
    top: 80,
    width: 180,
  },
  blobBottomLeft: {
    backgroundColor: COLORS.blobGreen,
    bottom: 120,
    height: 200,
    left: -70,
    width: 200,
  },
  blobBottomRight: {
    backgroundColor: COLORS.blobPink,
    bottom: -40,
    height: 160,
    right: -50,
    width: 160,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    color: COLORS.title,
    fontSize: 49,
    fontWeight: '700',
    lineHeight: 52,
  },
  subtitle: {
    color: COLORS.subtitle,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 8,
  },
  form: {
    marginTop: 40,
  },
  fieldSpacing: {
    marginTop: 30,
  },
  termsText: {
    color: COLORS.subtitle,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 24,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  signUpButton: {
    marginTop: 24,
  },
  footer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 48,
    minHeight: 48,
  },
  footerText: {
    color: COLORS.subtitle,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SignUpScreen;
