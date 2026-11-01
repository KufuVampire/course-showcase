import { useState } from 'react';
import { Sun, Moon, User as UserIcon, BookOpen, Menu, X } from 'lucide-react';
import { useTheme } from '@/shared/lib/useTheme';
import { Button } from '@/shared/ui';

export interface NavbarProps {
  onOpenAccount: () => void;
  userEmail?: string;
}

export function Navbar({ onOpenAccount, userEmail }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border transition-colors">
      <a
        href="#catalog"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-md"
      >
        Перейти к содержимому
      </a>

      <div className="max-w-page mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-md bg-primary text-on-primary flex items-center justify-center font-display font-bold text-lg shadow-xs group-hover:opacity-90 transition-opacity">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-ink tracking-tight text-lg leading-none">
              Практикум.PRO
            </span>
            <span className="text-caption text-ink-muted leading-tight text-xs">
              Образовательные программы
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 text-caption font-medium text-ink-muted"
          aria-label="Основная навигация"
        >
          <a href="#catalog" className="hover:text-ink transition-colors">
            Каталог
          </a>
          <a href="#benefits" className="hover:text-ink transition-colors">
            Преимущества
          </a>
          <a href="#process" className="hover:text-ink transition-colors">
            Процесс
          </a>
          <a href="#reviews" className="hover:text-ink transition-colors">
            Отзывы
          </a>
          <a href="#faq" className="hover:text-ink transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions: Theme Toggle, Account & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-md border border-border text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors cursor-pointer"
            aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
            title={`Тема: ${theme === 'light' ? 'Светлая' : 'Тёмная'}`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAccount}
            leftIcon={<UserIcon className="w-4 h-4 text-primary" />}
          >
            {userEmail ? <span className="max-w-28 truncate">{userEmail}</span> : 'Кабинет'}
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md border border-border text-ink-muted hover:text-ink cursor-pointer"
            aria-label="Меню навигации"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t border-border bg-surface-raised px-4 py-4 flex flex-col gap-3 text-caption font-medium text-ink"
          aria-label="Мобильная навигация"
        >
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-md hover:bg-surface-sunken"
          >
            Каталог программ
          </a>
          <a
            href="#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-md hover:bg-surface-sunken"
          >
            Преимущества
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-md hover:bg-surface-sunken"
          >
            Процесс обучения
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-md hover:bg-surface-sunken"
          >
            Отзывы
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-3 rounded-md hover:bg-surface-sunken"
          >
            Частые вопросы (FAQ)
          </a>
        </nav>
      )}
    </header>
  );
}
