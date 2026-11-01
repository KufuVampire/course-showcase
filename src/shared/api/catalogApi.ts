import { MOCK_PRODUCTS } from './mockData';
import type { Product, ProductLevel, ProductType } from './types';

export interface ProductFilters {
  type?: ProductType | 'all';
  level?: ProductLevel;
  query?: string;
  sortBy?: 'popular' | 'price-asc' | 'price-desc' | 'rating';
  maxPrice?: number;
}

export interface CatalogApi {
  getProducts(filters?: ProductFilters): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
}

export class MockCatalogApi implements CatalogApi {
  private products: Product[] = [...MOCK_PRODUCTS];
  private delayMs: number;

  constructor(delayMs = 350) {
    this.delayMs = delayMs;
  }

  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, this.delayMs));

    let list = [...this.products];

    if (filters?.type && filters.type !== 'all') {
      list = list.filter((p) => p.type === filters.type);
    }

    if (filters?.level && filters.level !== 'all') {
      list = list.filter((p) => p.level === filters.level || p.level === 'all');
    }

    if (filters?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.instructor.name.toLowerCase().includes(q)
      );
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          list.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          list.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
        default:
          list.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
      }
    }

    return list;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    await new Promise((r) => setTimeout(r, this.delayMs));
    return this.products.find((p) => p.slug === slug) ?? null;
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise((r) => setTimeout(r, this.delayMs));
    return this.products.find((p) => p.id === id) ?? null;
  }
}

export const catalogApi: CatalogApi = new MockCatalogApi();
