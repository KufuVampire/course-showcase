import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, User as UserIcon } from 'lucide-react';
import { useTheme } from '@/shared/lib/useTheme';
import { Button, Logo } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { NavLinks } from './NavLinks';
import { MobileNavbar } from './MobileNavbar';

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
        <NavLinks variant="desktop" />

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
      <MobileNavbar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
