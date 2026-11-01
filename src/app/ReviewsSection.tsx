import { Card } from '@/shared/ui';

const reviews = [
  {
    author: 'Кирилл Сафронов',
    role: 'Frontend Engineer @ E-Commerce',
    product: 'Архитектура React & TypeScript',
    outcome: 'Junior → Middle+',
    text: 'Курс систематизировал понимание FSD и разделения слоёв. Перестал путаться в циклических зависимостях и научился чисто организовывать кэш TanStack Query. Через 2 месяца после защиты проекта успешно прошёл собеседование на Middle+.',
  },
  {
    author: 'Анна Ковалёва',
    role: 'UI/UX & Frontend Developer',
    product: 'Дизайн-системы и Tailwind v4',
    outcome: 'Миграция дизайн-системы',
    text: 'Воркшоп по Tailwind v4 и @theme сэкономил недели блужданий по документации. Вся команда оценила переезд на семантические токены без arbitrary-классов. Теперь дизайн-система поддерживается без боли.',
  },
  {
    author: 'Илья Мартынов',
    role: 'Fullstack Разработчик',
    product: 'Консультация: Разбор резюме и пет-проекта',
    outcome: '2 оффера за 3 недели',
    text: 'Дмитрий за час разобрал слабые места в архитектуре моего пет-проекта, на которые мне раньше указывали на собеседованиях. Переписал по его чек-листу — и получил 2 оффера за 3 недели.',
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
          <h2 className="font-display text-h2 font-semibold text-ink leading-tight">
            Инженеры о практике, архитектуре и результатах
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Реальные истории разработчиков о переходе на FSD, дизайн-системах и защите решений на собеседованиях.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <Card
              key={rev.author}
              padding="lg"
              className="flex flex-col gap-4 bg-surface-raised border border-border"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-primary font-medium">{rev.product}</span>
                <span className="font-mono px-2 py-0.5 rounded-sm bg-surface-sunken text-ink-muted border border-border">
                  {rev.outcome}
                </span>
              </div>

              <p className="text-caption text-ink leading-relaxed">
                «{rev.text}»
              </p>

              <div className="pt-4 border-t border-border mt-auto flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-sunken border border-border flex items-center justify-center font-mono text-xs font-medium text-ink shrink-0">
                  {rev.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-medium text-ink text-sm truncate">{rev.author}</span>
                  <span className="text-xs text-ink-muted truncate">{rev.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
