import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/layout/Button';
import InputField from '../components/layout/InputField';
import { useToast } from '../components/layout/Toast';
import { TOAST_MESSAGES } from '../constants/toastMessages';

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  subtitle: '#7C7C7C',
  primary: '#53B175',
  link: '#181725',
  blobPink: 'rgba(255, 167, 215, 0.35)',
  blobBlue: 'rgba(147, 197, 253, 0.35)',
  blobGreen: 'rgba(134, 239, 172, 0.25)',
} as const;

const HORIZONTAL_PADDING = 25;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LoginScreenProps = {
  onLogin?: (credentials: { email: string; password: string }) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  containerStyle?: ViewStyle;
};

export function LoginScreen({
  onLogin,
  onForgotPassword,
  onSignUp,
  containerStyle,
}: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const isValid =
      EMAIL_REGEX.test(trimmedEmail) && password.trim().length >= 4;

    if (!isValid) {
      showError(TOAST_MESSAGES.loginInvalid);
      return;
    }

    showSuccess(TOAST_MESSAGES.loginSuccess);
    onLogin?.({ email: trimmedEmail, password });
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

      <InputField.Form
        scrollable
        scrollContentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom, 24),
            paddingTop: insets.top + 24,
          },
        ]}
      >
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons color="#FA6E23" name="carrot" size={48} />
          </View>

          <Text style={styles.title}>Loging</Text>
          <Text style={styles.subtitle}>Enter your emails and password</Text>

          <View style={styles.form}>
            <InputField
              autoCapitalize="none"
              keyboardType="email-address"
              label="Email"
              onChangeText={setEmail}
              textInputProps={{ autoComplete: 'email' }}
              value={email}
            />

            <InputField
              containerStyle={styles.passwordField}
              label="Password"
              onChangeText={setPassword}
              secureTextEntry
              textInputProps={{ autoComplete: 'password' }}
              value={password}
            />

            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={onForgotPassword}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            <Button
              containerStyle={styles.loginButton}
              onPress={handleLogin}
              title="Log In"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don&apos;t have an account?{' '}
              <Text onPress={onSignUp} style={styles.footerLink}>
                Singup
              </Text>
            </Text>
          </View>
      </InputField.Form>
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
  passwordField: {
    marginTop: 30,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: COLORS.link,
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 32,
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

export default LoginScreen;
