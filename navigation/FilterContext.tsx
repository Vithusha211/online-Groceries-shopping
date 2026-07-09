import React, { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_FILTER_STATE, FilterState } from '../constants/filters';

type FilterContextValue = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const value = useMemo(() => ({ filters, setFilters }), [filters]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within FilterProvider');
  }
  return context;
}
