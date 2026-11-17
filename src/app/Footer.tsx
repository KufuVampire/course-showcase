import { Link } from 'react-router';
import { Logo } from '@/shared/ui';

export function Footer() {
  return (
    <footer className="w-full bg-surface-sunken border-t border-border py-14">
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Logo asLink={false} />
            <p className="text-caption text-ink-muted max-w-sm leading-relaxed">
              Практические курсы, воркшопы и индивидуальные консультации по frontend-архитектуре,
              дизайну и современным веб-стандартам.
            </p>
          </div>

          {/* Nav Col */}
          <div className="flex flex-col gap-2.5 text-caption">
            <span className="font-medium text-ink text-xs">Навигация</span>
            <Link to="/#catalog" className="text-ink-muted hover:text-ink transition-colors">
              Каталог продуктов
            </Link>
            <Link to="/#benefits" className="text-ink-muted hover:text-ink transition-colors">
              О подходе
            </Link>
            <Link to="/#process" className="text-ink-muted hover:text-ink transition-colors">
              Процесс обучения
            </Link>
            <Link to="/#reviews" className="text-ink-muted hover:text-ink transition-colors">
              Отзывы выпускников
            </Link>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col gap-2.5 text-caption">
            <span className="font-medium text-ink text-xs">Поддержка и документы</span>
            <a
              href="mailto:support@review-lab.example"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              support@review-lab.example
            </a>
            <span className="text-ink-muted">Пн-Пт: 10:00 — 19:00 (МСК)</span>
            <Link to="/oferta" className="text-ink-muted hover:text-ink transition-colors">
              Публичная оферта
            </Link>
            <Link to="/privacy" className="text-ink-muted hover:text-ink transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} Ревью.Лаб. Все права защищены.</span>
          <span className="sm:text-right">
            Демо-проект: оплата не проводится, авторы, отзывы и рейтинги вымышлены.
          </span>
        </div>
      </div>
    </footer>
  );
}
