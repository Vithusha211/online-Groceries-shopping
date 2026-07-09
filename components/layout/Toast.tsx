import { Feather } from '@expo/vector-icons';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  successBg: '#E8F8EF',
  successBorder: '#53B175',
  successIcon: '#53B175',
  errorBg: '#FFF0F0',
  errorBorder: '#F3603F',
  errorIcon: '#F3603F',
  text: '#181725',
} as const;

const HORIZONTAL_PADDING = 25;
const DEFAULT_DURATION = 2800;

export type ToastType = 'success' | 'error';

type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
};

type ToastContextValue = {
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export type ToastBannerProps = {
  type: ToastType;
  message: string;
  containerStyle?: ViewStyle;
};

export function ToastBanner({ type, message, containerStyle }: ToastBannerProps) {
  const isSuccess = type === 'success';

  return (
    <View
      style={[
        styles.banner,
        isSuccess ? styles.bannerSuccess : styles.bannerError,
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          isSuccess ? styles.iconWrapSuccess : styles.iconWrapError,
        ]}
      >
        <Feather
          color={isSuccess ? COLORS.successIcon : COLORS.errorIcon}
          name={isSuccess ? 'check' : 'x'}
          size={18}
        />
      </View>
      <Text numberOfLines={2} style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

export type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastItem | null>(null);
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setToast(null);
      }
    });
  }, [opacity, translateY]);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = DEFAULT_DURATION) => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      idRef.current += 1;
      setToast({ id: idRef.current, type, message, duration });

      translateY.setValue(-120);
      opacity.setValue(0);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 16,
          stiffness: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      hideTimerRef.current = setTimeout(hideToast, duration);
    },
    [hideToast, opacity, translateY],
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => showToast('success', message, duration),
    [showToast],
  );

  const showError = useCallback(
    (message: string, duration?: number) => showToast('error', message, duration),
    [showToast],
  );

  const value = useMemo(
    () => ({ showSuccess, showError }),
    [showError, showSuccess],
  );

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.host,
            {
              paddingTop: insets.top + 8,
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <ToastBanner message={toast.message} type={toast.type} />
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  host: {
    left: 0,
    paddingHorizontal: HORIZONTAL_PADDING,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  banner: {
    alignItems: 'center',
    borderLeftWidth: 4,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 12,
    minHeight: 56,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  bannerSuccess: {
    backgroundColor: COLORS.successBg,
    borderLeftColor: COLORS.successBorder,
  },
  bannerError: {
    backgroundColor: COLORS.errorBg,
    borderLeftColor: COLORS.errorBorder,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  iconWrapSuccess: {
    backgroundColor: 'rgba(83, 177, 117, 0.15)',
  },
  iconWrapError: {
    backgroundColor: 'rgba(243, 96, 63, 0.15)',
  },
  message: {
    color: COLORS.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
});

export default ToastProvider;
