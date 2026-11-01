import { ArrowDown, Shield, Sparkles, Award } from 'lucide-react';
import { Button } from '@/shared/ui';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-border bg-surface-raised">
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface-sunken border border-border text-caption text-ink font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Практический инжиниринг и продуктовый дизайн</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-display font-bold text-ink max-w-4xl tracking-tight mb-6">
          Образование от практиков, создающих реальные цифровые системы
        </h1>

        {/* Hero Subtitle */}
        <p className="font-sans text-body text-ink-muted max-w-2xl leading-relaxed text-lg mb-10">
          Сфокусированные программы без воды: архитектура приложений, дизайн-системы нового
          поколения и персональные карьерные консультации с разбором вашего кода.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Button
            href="#catalog"
            variant="accent"
            size="lg"
            fullWidth
            rightIcon={<ArrowDown className="w-4 h-4" />}
          >
            Выбрать программу в каталоге
          </Button>

          <Button href="#benefits" variant="outline" size="lg" fullWidth>
            Как устроено обучение
          </Button>
        </div>

        {/* Key Indicators / Trust Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-primary">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-2xl text-ink">4.94 / 5.0</span>
            </div>
            <span className="text-caption text-ink-muted">Средняя оценка выпускников</span>
          </div>

          <div className="flex flex-col items-center gap-1 border-y sm:border-y-0 sm:border-x border-border/80 py-4 sm:py-0">
            <span className="font-display font-bold text-2xl text-ink">100% практика</span>
            <span className="text-caption text-ink-muted">
              Реальные продакшн-задачи в портфолио
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-success">
              <Shield className="w-5 h-5" />
              <span className="font-display font-bold text-2xl text-ink">14 дней</span>
            </div>
            <span className="text-caption text-ink-muted">Полная гарантия возврата средств</span>
          </div>
        </div>
      </div>
    </section>
  );
}
