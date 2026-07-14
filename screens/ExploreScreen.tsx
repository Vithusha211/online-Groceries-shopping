import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ExploreCategoryCard } from '../components/layout/Cards';
import Header from '../components/layout/Header';
import InputField from '../components/layout/InputField';
import {
  EXPLORE_CATEGORIES,
  ExploreCategory,
} from '../constants/exploreCategories';
import { fetchCategories } from '../services/catalogService';

const COLORS = {
  background: '#FFFFFF',
} as const;

const HORIZONTAL_PADDING = 25;
const GRID_GAP = 15;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

export type ExploreScreenProps = {
  onCategoryPress?: (categoryId: string) => void;
  onSearchSubmit?: (query: string) => void;
  containerStyle?: ViewStyle;
};

export function ExploreScreen({
  onCategoryPress,
  onSearchSubmit,
  containerStyle,
}: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] =
    useState<ExploreCategory[]>(EXPLORE_CATEGORIES);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchCategories();
        if (!active || !data.length) return;
        setCategories(
          data.map((category) => ({
            id: category.slug || category.id,
            title: category.title,
            iconName:
              category.iconName as keyof typeof MaterialCommunityIcons.glyphMap,
            iconColor: category.iconColor,
            backgroundColor: category.backgroundColor,
          })),
        );
      } catch {
        // keep local fallback
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleSearchSubmit = () => {
    const query = searchQuery.trim();
    if (query) {
      onSearchSubmit?.(query);
    }
  };

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return categories;
    }

    return categories.filter((category) =>
      category.title.toLowerCase().includes(query),
    );
  }, [categories, searchQuery]);

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <InputField.Screen style={styles.keyboardView}>
        <Header
          searchValue={searchQuery}
          showSearch
          title="Find Products"
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />

        <ScrollView
          bounces
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {filteredCategories.map((category) => (
              <ExploreCategoryCard
                key={category.id}
                backgroundColor={category.backgroundColor}
                containerStyle={{ width: cardWidth }}
                iconColor={category.iconColor}
                iconName={category.iconName}
                title={category.title}
                onPress={() => onCategoryPress?.(category.id)}
              />
            ))}
          </View>
        </ScrollView>
      </InputField.Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
  },
  grid: {
    columnGap: GRID_GAP,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: GRID_GAP,
  },
});

export default ExploreScreen;
