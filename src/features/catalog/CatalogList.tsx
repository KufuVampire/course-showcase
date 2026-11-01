import { AlertCircle, SearchX } from 'lucide-react';
import type { Product } from '@/shared/api';
import { Button, Card, Skeleton } from '@/shared/ui';
import { ProductCard } from './ProductCard';

export interface CatalogListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onOpenDetails: (product: Product) => void;
  onCheckout: (product: Product) => void;
  onResetFilters: () => void;
  onRetry: () => void;
}

export function CatalogList({
  products,
  isLoading,
  error,
  onOpenDetails,
  onCheckout,
  onResetFilters,
  onRetry,
}: CatalogListProps) {
  if (isLoading && products.length === 0) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="Загрузка списка программ"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} padding="lg" className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 my-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="pt-4 border-t border-border flex justify-between items-center mt-auto">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 border border-danger/30 bg-danger/5 rounded-lg flex flex-col items-center text-center gap-4">
        <AlertCircle className="w-8 h-8 text-danger" />
        <h3 className="font-display font-semibold text-lg text-ink">Ошибка загрузки каталога</h3>
        <p className="text-caption text-ink-muted max-w-md">{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Повторить попытку
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full p-12 border border-border bg-surface-sunken/50 rounded-lg flex flex-col items-center text-center gap-4">
        <SearchX className="w-10 h-10 text-ink-muted/80" />
        <h3 className="font-display font-bold text-xl text-ink">Ничего не найдено</h3>
        <p className="text-body text-ink-muted max-w-md">
          По вашему запросу не нашлось подходящих образовательных продуктов. Попробуйте изменить
          фильтры или формулировку поиска.
        </p>
        <Button variant="secondary" size="md" onClick={onResetFilters}>
          Сбросить все фильтры
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenDetails={onOpenDetails}
          onCheckout={onCheckout}
        />
      ))}
    </div>
  );
}
