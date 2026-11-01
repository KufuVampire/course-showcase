import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product, ProductFilters } from '@/shared/api';
import { catalogApi } from '@/shared/api';

const defaultFilters: ProductFilters = {
  type: 'all',
  level: 'all',
  query: '',
  sortBy: 'popular',
};

export function useCatalog() {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search query input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filters.query || '');
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.query]);

  // Load all products once for category counts
  useEffect(() => {
    let active = true;
    catalogApi
      .getProducts()
      .then((items) => {
        if (active) setAllProducts(items);
      })
      .catch((err) => {
        console.error('Failed to load total product counts:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  const loadProducts = useCallback(async (currentFilters: ProductFilters, q: string) => {
    setIsLoading(true);
    setError(null);
    let active = true;

    try {
      const data = await catalogApi.getProducts({
        ...currentFilters,
        query: q,
      });
      if (active) {
        setProducts(data);
      }
    } catch {
      if (active) {
        setError('Не удалось загрузить каталог. Попробуйте обновить страницу.');
      }
    } finally {
      if (active) {
        setIsLoading(false);
      }
    }

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let cancel = false;
    const eff = async () => {
      try {
        const data = await catalogApi.getProducts({
          ...filters,
          query: debouncedQuery,
        });
        if (!cancel) {
          setProducts(data);
          setError(null);
        }
      } catch {
        if (!cancel) {
          setError('Не удалось загрузить каталог. Попробуйте обновить страницу.');
        }
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    };
    eff();
    return () => {
      cancel = true;
    };
  }, [filters.type, filters.level, filters.sortBy, filters.maxPrice, debouncedQuery]);

  const updateFilters = useCallback((updated: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const counts = useMemo(
    () => ({
      all: allProducts.length,
      course: allProducts.filter((p) => p.type === 'course').length,
      workshop: allProducts.filter((p) => p.type === 'workshop').length,
      consultation: allProducts.filter((p) => p.type === 'consultation').length,
    }),
    [allProducts]
  );

  const reload = useCallback(() => {
    loadProducts(filters, debouncedQuery);
  }, [filters, debouncedQuery, loadProducts]);

  return {
    products,
    isLoading,
    error,
    filters,
    counts,
    updateFilters,
    resetFilters,
    reload,
  };
}
