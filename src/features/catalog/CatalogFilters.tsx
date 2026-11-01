import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { ProductFilters, ProductLevel, ProductType } from '@/shared/api';
import { Button, Field } from '@/shared/ui';

export interface CatalogFiltersProps {
  filters: ProductFilters;
  onFilterChange: (updated: Partial<ProductFilters>) => void;
  onReset: () => void;
  counts: {
    all: number;
    course: number;
    workshop: number;
    consultation: number;
  };
}

const typeTabs: { type: ProductType | 'all'; label: string }[] = [
  { type: 'all', label: 'Все продукты' },
  { type: 'course', label: 'Курсы' },
  { type: 'workshop', label: 'Воркшопы' },
  { type: 'consultation', label: 'Консультации' },
];

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  counts,
}) => {
  const isFiltered = Boolean(
    (filters.type && filters.type !== 'all') ||
      (filters.level && filters.level !== 'all') ||
      filters.query ||
      (filters.sortBy && filters.sortBy !== 'popular')
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {typeTabs.map((tab) => {
          const isActive = (filters.type || 'all') === tab.type;
          const count = counts[tab.type];

          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => onFilterChange({ type: tab.type })}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-caption font-medium transition-all whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-sunken text-ink hover:bg-border/60'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-sm ${
                  isActive ? 'bg-on-primary/20 text-on-primary' : 'bg-border/70 text-ink-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search, Sort and Level Control Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="md:col-span-6">
          <Field
            placeholder="Поиск по курсам, технологиям, авторам..."
            value={filters.query || ''}
            onChange={(e) => onFilterChange({ query: e.target.value })}
            leftElement={<Search className="w-4 h-4" />}
            rightElement={
              filters.query ? (
                <button
                  type="button"
                  onClick={() => onFilterChange({ query: '' })}
                  className="hover:text-ink cursor-pointer"
                  aria-label="Очистить поиск"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : null
            }
          />
        </div>

        {/* Level Select */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={filters.level || 'all'}
              onChange={(e) => onFilterChange({ level: e.target.value as ProductLevel })}
              className="w-full bg-surface-raised border border-border rounded-md text-caption py-2.5 px-3.5 text-ink outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
              aria-label="Фильтр по уровню сложности"
            >
              <option value="all">Любой уровень</option>
              <option value="beginner">Для начинающих</option>
              <option value="intermediate">Middle / Middle+</option>
              <option value="advanced">Senior / Lead</option>
            </select>
          </div>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-3 flex items-center gap-2">
          <div className="relative w-full">
            <select
              value={filters.sortBy || 'popular'}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as ProductFilters['sortBy'],
                })
              }
              className="w-full bg-surface-raised border border-border rounded-md text-caption py-2.5 px-3.5 text-ink outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
              aria-label="Сортировка каталога"
            >
              <option value="popular">По популярности</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="shrink-0"
              title="Сбросить все фильтры"
              aria-label="Сбросить все фильтры"
            >
              <SlidersHorizontal className="w-4 h-4 mr-1" />
              Сброс
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
