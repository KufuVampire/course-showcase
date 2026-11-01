import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { ProductFilters, ProductLevel, ProductType } from '@/shared/api';
import { Button, Field, Select } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

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

const levelOptions = [
  { value: 'all', label: 'Любой уровень' },
  { value: 'beginner', label: 'Для начинающих' },
  { value: 'intermediate', label: 'Middle / Middle+' },
  { value: 'advanced', label: 'Senior / Lead' },
];

const sortOptions = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'rating', label: 'По рейтингу' },
];

export function CatalogFilters({ filters, onFilterChange, onReset, counts }: CatalogFiltersProps) {
  const isFiltered = Boolean(
    (filters.type && filters.type !== 'all') ||
    (filters.level && filters.level !== 'all') ||
    filters.query ||
    (filters.sortBy && filters.sortBy !== 'popular')
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
        {typeTabs.map((tab) => {
          const isActive = (filters.type || 'all') === tab.type;
          const count = counts[tab.type];

          return (
            <button
              key={tab.type}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange({ type: tab.type })}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-md text-caption font-medium transition-all whitespace-nowrap cursor-pointer select-none',
                isActive
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-sunken text-ink hover:bg-border/60'
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  'text-xs px-1.5 py-0.5 rounded-sm',
                  isActive ? 'bg-on-primary/20 text-on-primary' : 'bg-border/70 text-ink-muted'
                )}
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
            name="search"
            aria-label="Поиск по курсам, технологиям, авторам"
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
          <Select
            options={levelOptions}
            value={filters.level || 'all'}
            onChange={(val) => onFilterChange({ level: val as ProductLevel })}
            ariaLabel="Фильтр по уровню сложности"
          />
        </div>

        {/* Sort Select */}
        <div className="md:col-span-3 flex items-center gap-2">
          <Select
            options={sortOptions}
            value={filters.sortBy || 'popular'}
            onChange={(val) => onFilterChange({ sortBy: val as ProductFilters['sortBy'] })}
            ariaLabel="Сортировка каталога"
          />

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
}
