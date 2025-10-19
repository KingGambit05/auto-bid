// components/admin/FilterPanel.tsx
"use client";

import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'text' | 'number';
  options?: FilterOption[];
  placeholder?: string;
}

interface FilterPanelProps {
  filters: FilterConfig[];
  onFilterChange: (filters: Record<string, any>) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterPanel({
  filters,
  onFilterChange,
  onClearAll,
  className,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = {
      ...filterValues,
      [filterId]: value,
    };

    setFilterValues(newFilters);

    // Count active filters (non-empty values)
    const count = Object.values(newFilters).filter((v) => {
      if (Array.isArray(v)) return v.length > 0;
      return v !== '' && v !== null && v !== undefined;
    }).length;

    setActiveFiltersCount(count);
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    setFilterValues({});
    setActiveFiltersCount(0);
    onClearAll?.();
  };

  const renderFilterInput = (filter: FilterConfig) => {
    const value = filterValues[filter.id] || '';

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
          >
            <option value="">{filter.placeholder || 'Select...'}</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(value as string[])?.includes(option.value) || false}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v) => v !== option.value);
                    handleFilterChange(filter.id, newValues);
                  }}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
          />
        );

      case 'daterange':
        return (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={value?.from || ''}
              onChange={(e) =>
                handleFilterChange(filter.id, { ...value, from: e.target.value })
              }
              placeholder="From"
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            />
            <input
              type="date"
              value={value?.to || ''}
              onChange={(e) =>
                handleFilterChange(filter.id, { ...value, to: e.target.value })
              }
              placeholder="To"
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
            />
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {filters.map((filter) => (
              <div key={filter.id}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {filter.label}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={handleClearAll}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Clear all
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
