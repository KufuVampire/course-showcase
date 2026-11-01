import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  lockScroll,
  unlockScroll,
  getScrollLockCount,
  resetScrollLockForTest,
} from './useScrollLock';

describe('ScrollLock manager', () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  beforeEach(() => {
    const classList = (initial = '') => {
      const set = new Set(initial.split(' ').filter(Boolean));
      return {
        add: (cls: string) => set.add(cls),
        remove: (cls: string) => set.delete(cls),
        contains: (cls: string) => set.has(cls),
      };
    };

    (globalThis as unknown as { window: unknown }).window = {
      innerWidth: 1024,
    };

    (globalThis as unknown as { document: unknown }).document = {
      documentElement: {
        clientWidth: 1000,
        style: { overflow: '' },
        classList: classList(),
      },
      body: {
        style: { overflow: '', paddingRight: '' },
        classList: classList(),
      },
    };

    resetScrollLockForTest();
  });

  afterEach(() => {
    (globalThis as unknown as { window: unknown }).window = originalWindow;
    (globalThis as unknown as { document: unknown }).document = originalDocument;
  });

  it('блокирует скролл страницы и добавляет modal-open класс', () => {
    expect(getScrollLockCount()).toBe(0);

    lockScroll();

    expect(getScrollLockCount()).toBe(1);
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.classList.contains('modal-open')).toBe(true);
    expect(document.body.classList.contains('modal-open')).toBe(true);
    expect(document.body.style.paddingRight).toBe('24px');

    unlockScroll();

    expect(getScrollLockCount()).toBe(0);
    expect(document.documentElement.style.overflow).toBe('');
    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.classList.contains('modal-open')).toBe(false);
    expect(document.body.classList.contains('modal-open')).toBe(false);
    expect(document.body.style.paddingRight).toBe('');
  });

  it('поддерживает вложенные модальные окна через счетчик', () => {
    lockScroll();
    lockScroll();
    expect(getScrollLockCount()).toBe(2);
    expect(document.documentElement.style.overflow).toBe('hidden');

    // Первое закрытие оставляет скролл заблокированным для второй модалки
    unlockScroll();
    expect(getScrollLockCount()).toBe(1);
    expect(document.documentElement.style.overflow).toBe('hidden');

    // Полное закрытие восстанавливает скролл
    unlockScroll();
    expect(getScrollLockCount()).toBe(0);
    expect(document.documentElement.style.overflow).toBe('');
  });
});
