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
            <span className="font-medium text-ink text-xs">
              Навигация
            </span>
            <a href="/#catalog" className="text-ink-muted hover:text-ink transition-colors">
              Каталог продуктов
            </a>
            <a href="/#benefits" className="text-ink-muted hover:text-ink transition-colors">
              О подходе
            </a>
            <a href="/#process" className="text-ink-muted hover:text-ink transition-colors">
              Процесс обучения
            </a>
            <a href="/#reviews" className="text-ink-muted hover:text-ink transition-colors">
              Отзывы выпускников
            </a>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col gap-2.5 text-caption">
            <span className="font-medium text-ink text-xs">
              Поддержка и документы
            </span>
            <a
              href="mailto:support@praktikum-pro.dev"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              support@praktikum-pro.dev
            </a>
            <span className="text-ink-muted">Пн-Пт: 10:00 — 19:00 (МСК)</span>
            <a href="/oferta" className="text-ink-muted hover:text-ink transition-colors">
              Публичная оферта
            </a>
            <a href="/privacy" className="text-ink-muted hover:text-ink transition-colors">
              Политика конфиденциальности
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} Практикум.PRO. Все права защищены.</span>
          <span>Образовательная платформа</span>
        </div>
      </div>
    </footer>
  );
}
