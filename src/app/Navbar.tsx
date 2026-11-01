import React from 'react';
import { Sun, Moon, User as UserIcon, BookOpen } from 'lucide-react';
import { useTheme } from '@/shared/lib/useTheme';
import { Button } from '@/shared/ui';

export interface NavbarProps {
  onOpenAccount: () => void;
  userEmail?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAccount, userEmail }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-[72rem] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
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

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-caption font-medium text-ink-muted">
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

        {/* Actions: Theme Toggle & Account */}
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
            {userEmail ? <span className="max-w-[120px] truncate">{userEmail}</span> : 'Кабинет'}
          </Button>
        </div>
      </div>
    </header>
  );
};
