import { Terminal, Users, Code, MessagesSquare } from 'lucide-react';
import { Card } from '@/shared/ui';

const benefits = [
  {
    icon: Users,
    index: '01',
    title: 'Ведущие инженеры индустрии',
    description:
      'Программы ведут действующие Staff и Lead инженеры с опытом распределенных систем и дизайн-систем с миллионными аудиториями.',
  },
  {
    icon: Terminal,
    index: '02',
    title: 'Актуальный стек решений',
    description:
      'Технологии сегодняшнего дня: React 19, Server Components, Tailwind v4 @theme, строгий TypeScript и Feature-Sliced Design.',
  },
  {
    icon: Code,
    index: '03',
    title: 'Ручной разбор архитектуры',
    description:
      'Не шаблонные тесты, а детальное ревью вашего Pull Request с проверкой контрактов слоёв, пограничных случаев и производительности.',
  },
  {
    icon: MessagesSquare,
    index: '04',
    title: 'Закрытое сообщество',
    description:
      'Инженерный чат выпускников и наставников: обсуждение архитектурных паттернов, закрытые вакансии и экспертная помощь.',
  },
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="scroll-mt-20 py-16 md:py-24 bg-surface-sunken/40 border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-caption font-medium text-primary">
            Инженерный подход
          </span>
          <h2 className="font-display text-h2 font-semibold text-ink leading-tight">
            Принципы, на которых строится обучение
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Мы отказались от пассивных лекций в пользу концентрированных практикумов и
            прямой работы с кодом вашего проекта.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                padding="md"
                className="flex flex-col gap-3.5 bg-surface-raised border border-border"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-mono text-xs text-ink-muted/80">{item.index}</span>
                </div>
                <h3 className="font-display font-semibold text-base text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-caption text-ink-muted leading-relaxed">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
