import { useCallback, useEffect, useState } from 'react';
import { catalogApi, Product, ProductFilters } from '@/shared/api';

const defaultFilters: ProductFilters = {
  type: 'all',
  level: 'all',
  query: '',
  sortBy: 'popular',
};

export function useCatalog() {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load all once for counts
  useEffect(() => {
    catalogApi
      .getProducts()
      .then((items) => setAllProducts(items))
      .catch(() => {});
  }, []);

  const loadFilteredProducts = useCallback(async (currentFilters: ProductFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await catalogApi.getProducts(currentFilters);
      setProducts(data);
    } catch {
      setError('Не удалось загрузить каталог. Попробуйте обновить страницу.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFilteredProducts(filters);
  }, [filters, loadFilteredProducts]);

  const updateFilters = (updated: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const counts = {
    all: allProducts.length,
    course: allProducts.filter((p) => p.type === 'course').length,
    workshop: allProducts.filter((p) => p.type === 'workshop').length,
    consultation: allProducts.filter((p) => p.type === 'consultation').length,
  };

  return {
    products,
    isLoading,
    error,
    filters,
    counts,
    updateFilters,
    resetFilters,
    reload: () => loadFilteredProducts(filters),
  };
}
