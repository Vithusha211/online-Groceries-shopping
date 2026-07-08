import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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

const COLORS = {
  background: '#FFFFFF',
  title: '#181725',
  subtitle: '#7C7C7C',
  icon: '#181725',
  mapBlue: '#4C84FF',
  mapGreen: '#7ED957',
  mapYellow: '#F5C542',
  blobPink: 'rgba(255, 167, 215, 0.35)',
  blobBlue: 'rgba(147, 197, 253, 0.3)',
  blobPurple: 'rgba(196, 181, 253, 0.25)',
} as const;

const HORIZONTAL_PADDING = 25;

export type SelectLocationScreenProps = {
  onBack?: () => void;
  onSubmit?: (location: { zone: string; area: string }) => void;
  onZonePress?: () => void;
  onAreaPress?: () => void;
  containerStyle?: ViewStyle;
};

function MapIllustration() {
  return (
    <View style={styles.illustration}>
      <View style={styles.mapFold}>
        <View style={[styles.mapSection, styles.mapSectionLeft]} />
        <View style={[styles.mapSection, styles.mapSectionCenter]} />
        <View style={[styles.mapSection, styles.mapSectionRight]} />
      </View>
      <MaterialCommunityIcons
        color={COLORS.mapBlue}
        name="map-marker"
        size={72}
        style={styles.mapPin}
      />
    </View>
  );
}

export function SelectLocationScreen({
  onBack,
  onSubmit,
  onZonePress,
  onAreaPress,
  containerStyle,
}: SelectLocationScreenProps) {
  const insets = useSafeAreaInsets();
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ zone, area });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <View pointerEvents="none" style={styles.background}>
        <View style={[styles.blob, styles.blobTopRight]} />
        <View style={[styles.blob, styles.blobBottomLeft]} />
        <View style={[styles.blob, styles.blobMid]} />
      </View>

      <InputField.Form
        scrollable
        scrollContentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Math.max(insets.bottom, 24) + 16,
            paddingTop: insets.top + 8,
          },
        ]}
      >
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={12}
          onPress={onBack}
          style={styles.backButton}
        >
          <Feather color={COLORS.icon} name="chevron-left" size={28} />
        </Pressable>

        <View style={styles.hero}>
          <MapIllustration />
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Swithch on your location to stay in tune with what&apos;s happening
            in your area
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Your Zone"
            onPress={onZonePress}
            value={zone}
            variant="select"
          />

          <InputField
            containerStyle={styles.areaField}
            label="Your Area"
            onPress={onAreaPress}
            placeholder="Types of your area"
            value={area}
            variant="select"
          />

          <Button
            containerStyle={styles.submitButton}
            onPress={handleSubmit}
            title="Submit"
          />
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
    width: 40,
  },
  hero: {
    alignItems: 'center',
    marginTop: 24,
  },
  illustration: {
    alignItems: 'center',
    height: 170,
    justifyContent: 'flex-end',
    marginBottom: 32,
    width: 225,
  },
  mapFold: {
    flexDirection: 'row',
    height: 110,
    transform: [{ perspective: 400 }, { rotateX: '12deg' }],
    width: 200,
  },
  mapSection: {
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 2,
  },
  mapSectionLeft: {
    backgroundColor: COLORS.mapGreen,
    transform: [{ skewY: '6deg' }],
  },
  mapSectionCenter: {
    backgroundColor: COLORS.mapYellow,
  },
  mapSectionRight: {
    backgroundColor: COLORS.mapBlue,
    transform: [{ skewY: '-6deg' }],
  },
  mapPin: {
    position: 'absolute',
    top: 8,
  },
  title: {
    color: COLORS.title,
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.subtitle,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 12,
    textAlign: 'center',
  },
  form: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginTop: 48,
    minHeight: 280,
  },
  areaField: {
    marginTop: 30,
  },
  submitButton: {
    marginTop: 48,
  },
});

export default SelectLocationScreen;
