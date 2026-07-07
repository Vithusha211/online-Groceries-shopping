import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

const COLORS = {
  background: '#53B175',
  logo: '#FFFFFF',
} as const;

export type LoadingScreenProps = {
  containerStyle?: ViewStyle;
};

export function LoadingScreen({ containerStyle }: LoadingScreenProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="light" />

      <View style={styles.logo}>
        <View style={styles.brandRow}>
          <MaterialCommunityIcons
            color={COLORS.logo}
            name="carrot"
            size={32}
            style={styles.carrot}
          />
          <Text style={styles.brandName}>nectar</Text>
        </View>
        <Text style={styles.tagline}>online groceri</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  carrot: {
    marginRight: 8,
  },
  brandName: {
    color: COLORS.logo,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'lowercase',
  },
  tagline: {
    color: COLORS.logo,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2.5,
    marginTop: 4,
    textTransform: 'lowercase',
  },
});

export default LoadingScreen;
