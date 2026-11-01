import React from 'react';
import { BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-sunken border-t border-border py-14">
      <div className="max-w-[72rem] mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-primary text-on-primary flex items-center justify-center font-display font-bold text-base shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-ink text-lg leading-none">
                Практикум.PRO
              </span>
            </div>
            <p className="text-caption text-ink-muted max-w-sm leading-relaxed">
              Практические курсы, воркшопы и индивидуальные консультации по frontend-архитектуре, дизайну и современным веб-стандартам.
            </p>
          </div>

          {/* Nav Col */}
          <div className="flex flex-col gap-2.5 text-caption">
            <span className="font-semibold text-ink uppercase tracking-wider text-xs">
              Навигация
            </span>
            <a href="#catalog" className="text-ink-muted hover:text-ink transition-colors">
              Каталог продуктов
            </a>
            <a href="#benefits" className="text-ink-muted hover:text-ink transition-colors">
              О подходе
            </a>
            <a href="#process" className="text-ink-muted hover:text-ink transition-colors">
              Процесс обучения
            </a>
            <a href="#reviews" className="text-ink-muted hover:text-ink transition-colors">
              Отзывы выпускников
            </a>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col gap-2.5 text-caption">
            <span className="font-semibold text-ink uppercase tracking-wider text-xs">
              Поддержка & Оферта
            </span>
            <span className="text-ink-muted">support@praktikum-pro.dev</span>
            <span className="text-ink-muted">Пн-Пт: 10:00 — 19:00 (МСК)</span>
            <a href="#" className="text-ink-muted hover:text-ink transition-colors">
              Публичная оферта
            </a>
            <a href="#" className="text-ink-muted hover:text-ink transition-colors">
              Политика конфиденциальности
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} Практикум.PRO. Все права защищены.</span>
          <span>Разработано на React 19 + Tailwind CSS v4</span>
        </div>
      </div>
    </footer>
  );
};
