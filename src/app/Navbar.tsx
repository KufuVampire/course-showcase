import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, User as UserIcon } from 'lucide-react';
import { useTheme } from '@/shared/lib/useTheme';
import { Button, Logo } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

export interface NavbarProps {
  onOpenAccount: () => void;
  userEmail?: string;
}

export function Navbar({ onOpenAccount, userEmail }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close on Esc, click outside or resize to lg
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border transition-colors"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-md"
      >
        Перейти к содержимому
      </a>

      <div className="max-w-page mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <Logo showSubtitle />

        {/* Desktop Navigation (lg+) */}
        <nav
          className="hidden lg:flex items-center gap-6 text-caption font-medium text-ink-muted"
          aria-label="Основная навигация"
        >
          <a href="/#catalog" className="hover:text-ink transition-colors">
            Каталог
          </a>
          <a href="/#benefits" className="hover:text-ink transition-colors">
            Преимущества
          </a>
          <a href="/#process" className="hover:text-ink transition-colors">
            Процесс
          </a>
          <a href="/#reviews" className="hover:text-ink transition-colors">
            Отзывы
          </a>
          <a href="/#faq" className="hover:text-ink transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions (All 36px height) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            iconOnly
            onClick={toggleTheme}
            aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
            title={`Тема: ${theme === 'light' ? 'Светлая' : 'Тёмная'}`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAccount}
            leftIcon={<UserIcon className="w-4 h-4 text-primary" />}
            className="px-2.5 sm:px-3"
            aria-label="Личный кабинет"
          >
            <span className="hidden sm:inline max-w-28 truncate">{userEmail || 'Кабинет'}</span>
          </Button>

          {/* Morphing Burger toggle (36px) */}
          <Button
            variant="outline"
            size="sm"
            iconOnly
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Меню навигации"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden"
          >
            <div className="w-4 h-3.5 flex flex-col justify-between relative" aria-hidden="true">
              <span
                className={cn(
                  'w-full h-0.5 bg-ink rounded-full transition-all duration-fast origin-center',
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 bg-ink rounded-full transition-opacity duration-fast',
                  mobileMenuOpen ? 'opacity-0' : ''
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 bg-ink rounded-full transition-all duration-fast origin-center',
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                )}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Absolute Dropdown Menu */}
      <nav
        inert={!mobileMenuOpen}
        aria-label="Мобильная навигация"
        className={cn(
          'absolute top-full left-0 right-0 border-b border-border bg-surface-raised shadow-pop px-4 py-4 flex flex-col gap-1 text-caption font-medium text-ink lg:hidden transition-all duration-fast',
          mobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        )}
      >
        <a
          href="/#catalog"
          onClick={() => setMobileMenuOpen(false)}
          className="py-2.5 px-3 rounded-md hover:bg-surface-sunken"
        >
          Каталог программ
        </a>
        <a
          href="/#benefits"
          onClick={() => setMobileMenuOpen(false)}
          className="py-2.5 px-3 rounded-md hover:bg-surface-sunken"
        >
          Преимущества
        </a>
        <a
          href="/#process"
          onClick={() => setMobileMenuOpen(false)}
          className="py-2.5 px-3 rounded-md hover:bg-surface-sunken"
        >
          Процесс обучения
        </a>
        <a
          href="/#reviews"
          onClick={() => setMobileMenuOpen(false)}
          className="py-2.5 px-3 rounded-md hover:bg-surface-sunken"
        >
          Отзывы
        </a>
        <a
          href="/#faq"
          onClick={() => setMobileMenuOpen(false)}
          className="py-2.5 px-3 rounded-md hover:bg-surface-sunken"
        >
          Частые вопросы (FAQ)
        </a>
      </nav>
    </header>
  );
}
