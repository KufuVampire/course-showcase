import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'course_showcase_theme';
const DEFAULT_THEME: Theme = 'light';

function readStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

/**
 * Тема по умолчанию светлая для всех новых пользователей, независимо от настроек ОС.
 * Тёмная включается только явным выбором пользователя (он сохраняется в localStorage).
 * Тот же порядок выбора продублирован inline-скриптом в index.html (чтобы не было вспышки темы).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    return readStoredTheme() ?? DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage недоступен: тема живёт до перезагрузки
    }

    const root = document.documentElement;
    const apply = () => {
      flushSync(() => setTheme(next));
      root.setAttribute('data-theme', next);
    };

    // На время смены гасим CSS-переходы элементов (см. tokens.css), чтобы вся страница
    // меняла цвета синхронно, а не «доезжала» по частям.
    root.classList.add('theme-switching');
    const release = () => {
      void getComputedStyle(root).color; // применяем стили без переходов
      requestAnimationFrame(() => root.classList.remove('theme-switching'));
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('startViewTransition' in document && !reduceMotion) {
      document.startViewTransition(apply).finished.finally(release);
    } else {
      apply();
      release();
    }
  }, [theme]);

  return { theme, toggleTheme, setTheme };
}
