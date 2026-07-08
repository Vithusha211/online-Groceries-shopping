import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/layout/Button';
import Header from '../components/layout/Header';
import {
  DEFAULT_FILTER_STATE,
  FILTER_BRANDS,
  FILTER_CATEGORIES,
  FilterOption,
  FilterState,
} from '../constants/filters';

const COLORS = {
  background: '#FFFFFF',
  panel: '#F2F3F2',
  title: '#181725',
  primary: '#53B175',
  border: '#C4C4C4',
} as const;

const HORIZONTAL_PADDING = 25;

export type FilterScreenProps = {
  initialFilters?: FilterState;
  onClose?: () => void;
  onApply?: (filters: FilterState) => void;
  containerStyle?: ViewStyle;
};

function FilterCheckbox({
  selected,
  onPress,
}: {
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.checkbox, selected ? styles.checkboxSelected : styles.checkboxUnselected]}
    >
      {selected ? <Feather color={COLORS.background} name="check" size={14} /> : null}
    </Pressable>
  );
}

function FilterOptionRow({
  option,
  selected,
  onToggle,
}: {
  option: FilterOption;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onToggle}
      style={styles.optionRow}
    >
      <FilterCheckbox onPress={onToggle} selected={selected} />
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
        {option.label}
      </Text>
    </Pressable>
  );
}

function FilterSection({
  title,
  options,
  selectedIds,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((option) => (
        <FilterOptionRow
          key={option.id}
          option={option}
          selected={selectedIds.includes(option.id)}
          onToggle={() => onToggle(option.id)}
        />
      ))}
    </View>
  );
}

export function FilterScreen({
  initialFilters = DEFAULT_FILTER_STATE,
  onClose,
  onApply,
  containerStyle,
}: FilterScreenProps) {
  const insets = useSafeAreaInsets();
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const toggleCategory = (id: string) => {
    setFilters((current) => ({
      ...current,
      categories: current.categories.includes(id)
        ? current.categories.filter((item) => item !== id)
        : [...current.categories, id],
    }));
  };

  const toggleBrand = (id: string) => {
    setFilters((current) => ({
      ...current,
      brands: current.brands.includes(id)
        ? current.brands.filter((item) => item !== id)
        : [...current.brands, id],
    }));
  };

  const handleApply = () => {
    onApply?.(filters);
    onClose?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar style="dark" />

      <Header leftAction="close" onLeftPress={onClose} title="Filters" />

      <View style={styles.panel}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FilterSection
            options={FILTER_CATEGORIES}
            selectedIds={filters.categories}
            title="Categories"
            onToggle={toggleCategory}
          />

          <FilterSection
            options={FILTER_BRANDS}
            selectedIds={filters.brands}
            title="Brand"
            onToggle={toggleBrand}
          />
        </ScrollView>
      </View>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <Button onPress={handleApply} title="Apply Filter" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  panel: {
    backgroundColor: COLORS.panel,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    marginTop: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 30,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: COLORS.title,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    marginRight: 14,
    width: 24,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  checkboxUnselected: {
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  optionLabel: {
    color: COLORS.title,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: COLORS.panel,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
  },
});

export default FilterScreen;
