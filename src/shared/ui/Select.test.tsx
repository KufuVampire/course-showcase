// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Select } from './Select';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('Select combobox', () => {
  let container: HTMLDivElement;
  let root: Root;

  const options = [
    { value: 'popular', label: 'По популярности' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'price-asc', label: 'Сначала дешевле' },
  ];

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

  it('отображает выбранное значение и закрыт по умолчанию', () => {
    act(() => {
      root.render(
        <Select options={options} value="popular" onChange={() => {}} ariaLabel="Сортировка" />
      );
    });

    const button = container.querySelector('button[role="combobox"]');
    expect(button).not.toBeNull();
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.textContent).toContain('По популярности');
    expect(container.querySelector('ul[role="listbox"]')).toBeNull();
  });

  it('открывается по клику и устанавливает aria-activedescendant при фокусе опции', () => {
    act(() => {
      root.render(
        <Select options={options} value="popular" onChange={() => {}} ariaLabel="Сортировка" />
      );
    });

    const button = container.querySelector('button[role="combobox"]') as HTMLButtonElement;

    // Open dropdown
    act(() => {
      button.click();
    });

    expect(button.getAttribute('aria-expanded')).toBe('true');
    const listbox = container.querySelector('ul[role="listbox"]');
    expect(listbox).not.toBeNull();

    // Check aria-activedescendant points to focused item (popular by default)
    const activeDescendant = button.getAttribute('aria-activedescendant');
    expect(activeDescendant).toBeTruthy();
    expect(activeDescendant).toContain('popular');
  });

  it('навигирует по стрелке вниз с обновлением aria-activedescendant', () => {
    act(() => {
      root.render(
        <Select options={options} value="popular" onChange={() => {}} ariaLabel="Сортировка" />
      );
    });

    const button = container.querySelector('button[role="combobox"]') as HTMLButtonElement;

    // Open
    act(() => {
      button.click();
    });

    // Press ArrowDown
    act(() => {
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    });

    const activeDescendant = button.getAttribute('aria-activedescendant');
    expect(activeDescendant).toContain('rating');
  });
});
