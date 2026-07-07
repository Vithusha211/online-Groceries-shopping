import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const COLORS = {
  primary: '#53B175',
  primaryDisabled: '#A9D5B8',
  text: '#FFFFFF',
} as const;

const BUTTON_HEIGHT = 67;
const FONT_SIZE = 18;

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
  containerStyle,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        isDisabled && styles.buttonDisabled,
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.text} size="small" />
      ) : (
        <Text style={[styles.label, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: BUTTON_HEIGHT / 2,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryDisabled,
  },
  label: {
    color: COLORS.text,
    fontSize: FONT_SIZE,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;
