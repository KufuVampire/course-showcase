import { cn } from '@/shared/lib/cn';
import { NavLinks } from './NavLinks';

export interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavbar({ isOpen, onClose }: MobileNavbarProps) {
  return (
    <nav
      inert={!isOpen}
      aria-label="Мобильная навигация"
      className={cn(
        'absolute top-full left-0 right-0 border-b border-border bg-surface-raised shadow-pop px-4 py-4 flex flex-col gap-1 text-caption font-medium text-ink lg:hidden transition-all duration-fast',
        isOpen
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
      )}
    >
      <NavLinks variant="mobile" onItemClick={onClose} />
    </nav>
  );
}
