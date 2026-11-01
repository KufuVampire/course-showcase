import { Card } from '@/shared/ui';

const reviews = [
  {
    author: 'Кирилл Сафронов',
    role: 'Frontend Engineer @ E-Commerce',
    product: 'Архитектура React & TypeScript',
    outcome: 'Junior → Middle+',
    text: 'Курс систематизировал понимание FSD и\u00A0разделения слоёв. Перестал путаться в\u00A0циклических зависимостях и\u00A0научился чисто организовывать кэш TanStack Query. Через 2\u00A0месяца после защиты проекта успешно прошёл собеседование на\u00A0Middle+.',
  },
  {
    author: 'Анна Ковалёва',
    role: 'UI/UX & Frontend Developer',
    product: 'Дизайн-системы и\u00A0Tailwind v4',
    outcome: 'Миграция дизайн-системы',
    text: 'Воркшоп по\u00A0Tailwind\u00A0v4 и\u00A0@theme сэкономил недели блужданий по\u00A0документации. Вся команда оценила переезд на\u00A0семантические токены без arbitrary-классов. Теперь дизайн-система поддерживается без боли.',
  },
  {
    author: 'Илья Мартынов',
    role: 'Fullstack Разработчик',
    product: 'Консультация: Разбор резюме и\u00A0пет-проекта',
    outcome: '2 оффера за 3 недели',
    text: 'Дмитрий за\u00A0час разобрал слабые места в\u00A0архитектуре моего пет-проекта, на\u00A0которые мне раньше указывали на\u00A0собеседованиях. Переписал по\u00A0его чек-листу\u00A0— и\u00A0получил 2\u00A0оффера за\u00A03\u00A0недели.',
  },
];

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="scroll-mt-20 py-16 md:py-24 bg-surface-sunken/40 border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-caption font-medium text-primary">
            Опыт выпускников
          </span>
          <h2 className="font-display text-h2 font-semibold text-ink leading-tight text-balance">
            Инженеры о&nbsp;практике, архитектуре и&nbsp;результатах
          </h2>
          <p className="text-body text-ink-muted leading-relaxed text-pretty">
            Реальные истории разработчиков о&nbsp;переходе на&nbsp;FSD, дизайн-системах и&nbsp;защите решений на&nbsp;собеседованиях.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <Card
              key={rev.author}
              padding="lg"
              className="flex flex-col gap-4 bg-surface-raised border border-border"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20 font-medium shrink-0">
                    {rev.outcome}
                  </span>
                  <span className="text-xs text-ink-muted font-mono">Выпускник</span>
                </div>
                <h3 className="font-display font-semibold text-ink text-sm leading-snug">
                  {rev.product}
                </h3>
              </div>

              <p className="text-caption text-ink leading-relaxed text-pretty">
                «{rev.text}»
              </p>

              <div className="pt-4 border-t border-border mt-auto flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-sunken border border-border flex items-center justify-center font-mono text-xs font-medium text-ink shrink-0">
                  {rev.author[0]}
                </div>
                <div className="flex flex-col text-caption">
                  <span className="font-medium text-ink">{rev.author}</span>
                  <span className="text-ink-muted">{rev.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
