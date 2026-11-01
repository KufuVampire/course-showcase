import { Button } from '@/shared/ui';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center gap-6">
      <span className="font-display font-bold text-6xl text-primary/40 select-none">404</span>
      <h1 className="font-display text-h2 font-semibold text-ink text-balance">Страница не&nbsp;найдена</h1>
      <p className="text-body text-ink-muted max-w-md leading-relaxed text-pretty">
        Запрашиваемая страница перемещена или не&nbsp;существует. Вы можете вернуться на&nbsp;главную витрину курсов.
      </p>
      <Button href="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
        Вернуться в&nbsp;каталог
      </Button>
    </div>
  );
}
