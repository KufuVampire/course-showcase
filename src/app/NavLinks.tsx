import { cn } from '@/shared/lib/cn';

export interface NavItem {
  href: string;
  label: string;
  mobileLabel?: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/#catalog', label: 'Каталог', mobileLabel: 'Каталог программ' },
  { href: '/#benefits', label: 'Преимущества' },
  { href: '/#process', label: 'Процесс', mobileLabel: 'Процесс обучения' },
  { href: '/#reviews', label: 'Отзывы' },
  { href: '/#faq', label: 'FAQ', mobileLabel: 'Частые вопросы (FAQ)' },
];

export interface NavLinksProps {
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
  className?: string;
}

export function NavLinks({ variant = 'desktop', onItemClick, className }: NavLinksProps) {
  if (variant === 'desktop') {
    return (
      <nav
        className={cn(
          'hidden lg:flex items-center gap-6 text-caption font-medium text-ink-muted',
          className
        )}
        aria-label="Основная навигация"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="hover:text-ink focus-visible:text-ink focus-visible:outline-none transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onItemClick}
          className={cn(
            'py-2.5 px-3 rounded-md hover:bg-surface-sunken outline-none focus-visible:ring-2 focus-visible:ring-accent',
            className
          )}
        >
          {item.mobileLabel || item.label}
        </a>
      ))}
    </>
  );
}
