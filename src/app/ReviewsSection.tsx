import { Star, Quote } from 'lucide-react';
import { Card } from '@/shared/ui';

const reviews = [
  {
    author: 'Кирилл Сафронов',
    role: 'Frontend Engineer @ E-Commerce',
    product: 'Архитектура React & TypeScript',
    rating: 5,
    text: 'Курс полностью перевернул моё понимание FSD и разделения слоёв. Перестал путаться в циклических зависимостях и научился чисто организовывать кэш TanStack Query. Через 2 месяца после курса поднял грейд с Junior до Middle+.',
  },
  {
    author: 'Анна Ковалёва',
    role: 'UI/UX & Frontend Developer',
    product: 'Дизайн-системы и Tailwind v4',
    rating: 5,
    text: 'Воркшоп по Tailwind v4 и @theme сэкономил мне недели блужданий по документации. Вся команда оценила переезд на семантические токены без arbitrary-классов. Дизайн-система теперь живёт как единый организм.',
  },
  {
    author: 'Илья Мартынов',
    role: 'Fullstack Разработчик',
    product: 'Консультация: Разбор резюме и пет-проекта',
    rating: 5,
    text: 'Консультация превзошла ожидания. Дмитрий за час разобрал слабые места в архитектуре моего пет-проекта, на которые мне раньше указывали на собесах. Переписал по его чек-листу — и получил 2 оффера за 3 недели.',
  },
];

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="scroll-mt-20 py-20 md:py-28 bg-surface-sunken/40 border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="text-caption font-semibold text-primary uppercase tracking-wider">
            Отзывы
          </span>
          <h2 className="font-display text-h2 font-bold text-ink leading-tight">
            Истории инженеров, прошедших наши программы
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Пример отзывов выпускников (демо-витрина продуктовых практик).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <Card
              key={rev.author}
              padding="lg"
              className="flex flex-col gap-4 bg-surface-raised relative"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-6 right-6" />

              <div className="flex items-center gap-1">
                {Array.from({ length: rev.rating }).map((_, sIdx) => (
                  <Star key={sIdx} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-caption text-ink leading-relaxed italic">«{rev.text}»</p>

              <div className="pt-4 border-t border-border/60 mt-auto flex flex-col">
                <span className="font-display font-bold text-ink text-sm">{rev.author}</span>
                <span className="text-xs text-ink-muted">{rev.role}</span>
                <span className="text-xs text-primary font-medium mt-1">{rev.product}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
