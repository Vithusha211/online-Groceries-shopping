import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  label: '#7C7C7C',
  text: '#181725',
  placeholder: '#B3B3B3',
  border: '#E2E2E2',
  primary: '#53B175',
  icon: '#7C7C7C',
} as const;

const INPUT_HEIGHT = 40;
const LABEL_FONT_SIZE = 16;
const INPUT_FONT_SIZE = 16;
const CODE_LENGTH_DEFAULT = 4;

export type InputScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  scrollContentContainerStyle?: ViewStyle | ViewStyle[];
  keyboardVerticalOffset?: number;
  bounces?: boolean;
};

export function InputScreen({
  children,
  style,
  scrollable = false,
  scrollContentContainerStyle,
  keyboardVerticalOffset = 0,
  bounces = false,
}: InputScreenProps) {
  const content = scrollable ? (
    <ScrollView
      bounces={bounces}
      contentContainerStyle={scrollContentContainerStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[inputScreenStyles.flex, style]}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

/** @deprecated Use InputScreen */
export const InputFieldForm = InputScreen;

const inputScreenStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export type InputFieldVariant = 'default' | 'code' | 'select';

export type InputFieldProps = {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  variant?: InputFieldVariant;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  editable?: boolean;
  onPress?: () => void;
  prefix?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  helperText?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  maxLength?: number;
  codeLength?: number;
  textInputProps?: Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'placeholder' | 'secureTextEntry' | 'keyboardType' | 'editable'
  >;
};

function CodeSlots({
  value,
  length,
}: {
  value: string;
  length: number;
}) {
  return (
    <Text pointerEvents="none" style={styles.codeDisplay}>
      {Array.from({ length }, (_, index) => {
        const digit = value[index];
        return (
          <Text
            key={index}
            style={digit ? styles.codeDigit : styles.codePlaceholder}
          >
            {digit ?? '—'}
          </Text>
        );
      })}
    </Text>
  );
}

export function InputField({
  label,
  value = '',
  onChangeText,
  placeholder,
  variant = 'default',
  secureTextEntry = false,
  showPasswordToggle = true,
  keyboardType,
  autoCapitalize,
  editable = true,
  onPress,
  prefix,
  rightIcon,
  onRightIconPress,
  helperText,
  containerStyle,
  inputStyle,
  maxLength,
  codeLength = CODE_LENGTH_DEFAULT,
  textInputProps,
}: InputFieldProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  useEffect(() => {
    setIsSecure(secureTextEntry);
  }, [secureTextEntry]);

  const resolvedKeyboardType =
    keyboardType ?? (variant === 'code' ? 'number-pad' : 'default');

  const resolvedMaxLength =
    maxLength ?? (variant === 'code' ? codeLength : undefined);

  const selectChevron =
    variant === 'select' && !rightIcon ? (
      <Feather color={COLORS.icon} name="chevron-down" size={20} />
    ) : null;

  const passwordIcon =
    secureTextEntry && showPasswordToggle && !rightIcon ? (
      <Feather color={COLORS.icon} name={isSecure ? 'eye-off' : 'eye'} size={20} />
    ) : null;

  const resolvedRightIcon = rightIcon ?? passwordIcon ?? selectChevron;

  const canTogglePassword = secureTextEntry && showPasswordToggle && !rightIcon;

  const renderRightIcon = () => {
    if (!resolvedRightIcon) {
      return null;
    }

    if (onRightIconPress || canTogglePassword) {
      return (
        <Pressable
          accessibilityLabel={
            canTogglePassword ? (isSecure ? 'Show password' : 'Hide password') : undefined
          }
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => {
            if (onRightIconPress) {
              onRightIconPress();
              return;
            }
            setIsSecure((current) => !current);
          }}
          style={styles.rightIconButton}
        >
          {resolvedRightIcon}
        </Pressable>
      );
    }

    return <View style={styles.rightIconButton}>{resolvedRightIcon}</View>;
  };

  const renderInputContent = () => {
    if (variant === 'select') {
      return (
        <Pressable
          accessibilityRole="button"
          disabled={!onPress}
          onPress={onPress}
          style={styles.inputRow}
        >
          {prefix ? <View style={styles.prefix}>{prefix}</View> : null}
          <Text
            numberOfLines={1}
            style={[
              styles.inputText,
              !value && styles.placeholderText,
              styles.selectText,
              inputStyle,
            ]}
          >
            {value || placeholder}
          </Text>
          {renderRightIcon()}
        </Pressable>
      );
    }

    if (variant === 'code') {
      return (
        <View style={styles.inputRow}>
          <View style={styles.codeInputWrapper}>
            <CodeSlots length={codeLength} value={value} />
            <TextInput
              {...textInputProps}
              autoCapitalize="none"
              autoCorrect={false}
              caretHidden
              editable={editable}
              keyboardType={resolvedKeyboardType}
              maxLength={resolvedMaxLength}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={COLORS.placeholder}
              style={[styles.codeInput, inputStyle]}
              value={value}
            />
          </View>
          {renderRightIcon()}
        </View>
      );
    }

    return (
      <View style={styles.inputRow}>
        {prefix ? <View style={styles.prefix}>{prefix}</View> : null}
        <TextInput
          {...textInputProps}
          autoCapitalize={autoCapitalize}
          editable={editable}
          keyboardType={resolvedKeyboardType}
          maxLength={resolvedMaxLength}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={isSecure}
          style={[styles.input, inputStyle]}
          value={value}
        />
        {renderRightIcon()}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>{renderInputContent()}</View>
      {helperText ? <View style={styles.helper}>{helperText}</View> : null}
    </View>
  );
}

type InputFieldComponent = typeof InputField & {
  Form: typeof InputScreen;
  Screen: typeof InputScreen;
};

const InputFieldWithHelpers = InputField as InputFieldComponent;
InputFieldWithHelpers.Form = InputScreen;
InputFieldWithHelpers.Screen = InputScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  label: {
    color: COLORS.label,
    fontSize: LABEL_FONT_SIZE,
    fontWeight: '600',
    marginBottom: 8,
  },
  field: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    minHeight: INPUT_HEIGHT,
    paddingBottom: 4,
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: INPUT_HEIGHT,
  },
  prefix: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
  },
  input: {
    color: COLORS.text,
    flex: 1,
    fontSize: INPUT_FONT_SIZE,
    fontWeight: '600',
    minHeight: INPUT_HEIGHT,
    padding: 0,
  },
  inputText: {
    color: COLORS.text,
    flex: 1,
    fontSize: INPUT_FONT_SIZE,
    fontWeight: '600',
  },
  selectText: {
    paddingVertical: 8,
  },
  placeholderText: {
    color: COLORS.placeholder,
    fontWeight: '400',
  },
  rightIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    minHeight: INPUT_HEIGHT,
    minWidth: 28,
  },
  codeInputWrapper: {
    flex: 1,
    justifyContent: 'center',
    minHeight: INPUT_HEIGHT,
  },
  codeDisplay: {
    fontSize: INPUT_FONT_SIZE,
    fontWeight: '600',
    letterSpacing: 12,
    position: 'absolute',
  },
  codeDigit: {
    color: COLORS.text,
  },
  codePlaceholder: {
    color: COLORS.placeholder,
    fontWeight: '400',
  },
  codeInput: {
    color: 'transparent',
    flex: 1,
    fontSize: INPUT_FONT_SIZE,
    fontWeight: '600',
    letterSpacing: 12,
    minHeight: INPUT_HEIGHT,
    padding: 0,
  },
  helper: {
    marginTop: 12,
  },
});

export default InputFieldWithHelpers;
