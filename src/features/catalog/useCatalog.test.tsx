// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MemoryRouter } from 'react-router';
import { useCatalog } from './useCatalog';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('useCatalog hook', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('инициализирует фильтры из searchParams и выставляет isLoading', async () => {
    let hookResult!: ReturnType<typeof useCatalog>;

    function TestComponent() {
      hookResult = useCatalog();
      return (
        <div>
          <span data-testid="loading">{String(hookResult.isLoading)}</span>
          <span data-testid="count">{hookResult.products.length}</span>
        </div>
      );
    }

    act(() => {
      root.render(
        <MemoryRouter initialEntries={['/?type=course&level=advanced']}>
          <TestComponent />
        </MemoryRouter>
      );
    });

    // Check filters were parsed from searchParams
    expect(hookResult.filters.type).toBe('course');
    expect(hookResult.filters.level).toBe('advanced');
    expect(hookResult.isLoading).toBe(true);

    // Wait for catalogApi mock delay (350ms)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    expect(hookResult.isLoading).toBe(false);
    expect(hookResult.products.length).toBeGreaterThan(0);
    // All returned items should match type='course' and level='advanced'
    for (const prod of hookResult.products) {
      expect(prod.type).toBe('course');
      expect(prod.level).toBe('advanced');
    }
  });

  it('переключает isLoading в true при обновлении фильтров', async () => {
    let hookResult!: ReturnType<typeof useCatalog>;

    function TestComponent() {
      hookResult = useCatalog();
      return <div>items: {hookResult.products.length}</div>;
    }

    act(() => {
      root.render(
        <MemoryRouter initialEntries={['/']}>
          <TestComponent />
        </MemoryRouter>
      );
    });

    // Wait for first load
    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    expect(hookResult.isLoading).toBe(false);

    // Update filter
    act(() => {
      hookResult.updateFilters({ type: 'workshop' });
    });

    // Immediately after filter update, isLoading must be true (Blocking #1 fix)
    expect(hookResult.isLoading).toBe(true);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 450));
    });

    expect(hookResult.isLoading).toBe(false);
    for (const prod of hookResult.products) {
      expect(prod.type).toBe('workshop');
    }
  });
});
