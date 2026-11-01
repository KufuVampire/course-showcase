import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { Product, ProductFilters, ProductLevel, ProductType } from '@/shared/api';
import { catalogApi } from '@/shared/api';

export type ProductSort = 'popular' | 'price-asc' | 'price-desc' | 'rating';

const defaultFilters: ProductFilters = {
  type: 'all',
  level: 'all',
  query: '',
  sortBy: 'popular',
};

export function useCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFiltersFromParams = useCallback((): ProductFilters => {
    const typeParam = searchParams.get('type') as ProductType | 'all' | null;
    const levelParam = searchParams.get('level') as ProductLevel | null;
    const sortParam = searchParams.get('sortBy') as ProductSort | null;
    const queryParam = searchParams.get('query');

    const validTypes: (ProductType | 'all')[] = ['all', 'course', 'workshop', 'consultation'];
    const validLevels: ProductLevel[] = ['all', 'beginner', 'intermediate', 'advanced'];
    const validSorts: ProductSort[] = ['popular', 'price-asc', 'price-desc', 'rating'];

    return {
      type: typeParam && validTypes.includes(typeParam) ? typeParam : 'all',
      level: levelParam && validLevels.includes(levelParam) ? levelParam : 'all',
      sortBy: sortParam && validSorts.includes(sortParam) ? sortParam : 'popular',
      query: queryParam || '',
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<ProductFilters>(getFiltersFromParams);
  const [debouncedQuery, setDebouncedQuery] = useState(filters.query || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sync external search params changes (e.g. browser back/forward)
  useEffect(() => {
    const fromParams = getFiltersFromParams();
    setFilters((prev) => {
      if (
        prev.type === fromParams.type &&
        prev.level === fromParams.level &&
        prev.sortBy === fromParams.sortBy &&
        prev.query === fromParams.query
      ) {
        return prev;
      }
      return fromParams;
    });
  }, [getFiltersFromParams]);

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

  const { type, level, sortBy, maxPrice } = filters;

  const loadProducts = useCallback(async (currentFilters: ProductFilters, q: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await catalogApi.getProducts({
        ...currentFilters,
        query: q,
      });
      setProducts(data);
    } catch {
      setError('Не удалось загрузить каталог. Попробуйте обновить страницу.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancel = false;
    setIsLoading(true);
    setError(null);

    const eff = async () => {
      try {
        const data = await catalogApi.getProducts({
          type,
          level,
          sortBy,
          maxPrice,
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
  }, [type, level, sortBy, maxPrice, debouncedQuery]);

  const updateFilters = useCallback(
    (updated: Partial<ProductFilters>) => {
      setFilters((prev) => ({ ...prev, ...updated }));
      setSearchParams(
        (prevParams) => {
          const params = new URLSearchParams(prevParams);
          const next = { ...filters, ...updated };
          if (next.type && next.type !== 'all') params.set('type', next.type);
          else params.delete('type');

          if (next.level && next.level !== 'all') params.set('level', next.level);
          else params.delete('level');

          if (next.sortBy && next.sortBy !== 'popular') params.set('sortBy', next.sortBy);
          else params.delete('sortBy');

          if (next.query && next.query.trim()) params.set('query', next.query.trim());
          else params.delete('query');

          return params;
        },
        { replace: true }
      );
    },
    [filters, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSearchParams(
      (prevParams) => {
        const params = new URLSearchParams(prevParams);
        params.delete('type');
        params.delete('level');
        params.delete('sortBy');
        params.delete('query');
        return params;
      },
      { replace: true }
    );
  }, [setSearchParams]);

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
