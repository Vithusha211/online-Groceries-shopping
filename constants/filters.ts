export type FilterOption = {
  id: string;
  label: string;
};

export const FILTER_CATEGORIES: FilterOption[] = [
  { id: 'eggs', label: 'Eggs' },
  { id: 'noodles-pasta', label: 'Noodles & Pasta' },
  { id: 'chips-crisps', label: 'Chips & Crisps' },
  { id: 'fast-food', label: 'Fast Food' },
];

export const FILTER_BRANDS: FilterOption[] = [
  { id: 'individual-collection', label: 'Individual Collection' },
  { id: 'cocola', label: 'Cocola' },
  { id: 'ifad', label: 'Ifad' },
  { id: 'kazi-farmas', label: 'Kazi Farmas' },
];

export type FilterState = {
  categories: string[];
  brands: string[];
};

export const DEFAULT_FILTER_STATE: FilterState = {
  categories: ['eggs'],
  brands: ['cocola'],
};
