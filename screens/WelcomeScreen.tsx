import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/layout/Button';


const COLORS = {
  text: '#FFFFFF',
  overlayBottom: 'rgba(0, 0, 0, 0.3)',
} as const;

const HORIZONTAL_PADDING = 30.5;

export type WelcomeScreenProps = {
  onGetStarted?: () => void;
  backgroundSource?: ImageSourcePropType;
  containerStyle?: ViewStyle;
};

export function WelcomeScreen({
  onGetStarted,
  backgroundSource = require('../../assets/welcome-bg.jpg'),
  containerStyle,
}: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="light" />

      <ImageBackground resizeMode="cover" source={backgroundSource} style={styles.background}>
        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayBottom} />
        </View>

        <View
          style={[
            styles.content,
            {
              paddingBottom: Math.max(insets.bottom, 24) + 66,
              paddingTop: insets.top,
            },
          ]}
        >
          <MaterialCommunityIcons color={COLORS.text} name="carrot" size={48} />

          <Text style={styles.title}>
            Welcome{'\n'}to our store
          </Text>

          <Text style={styles.subtitle}>
            Get your groceries in as fast as one hour
          </Text>

          <View style={styles.buttonContainer}>
            <Button title="Get Started" onPress={onGetStarted} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    flex: 0.4,
  },
  overlayBottom: {
    backgroundColor: COLORS.overlayBottom,
    flex: 0.6,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  title: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 52,
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginTop: 40,
  },
});

export default WelcomeScreen;
