import { Terminal, Users, Code, MessagesSquare } from 'lucide-react';
import { Card } from '@/shared/ui';

const benefits = [
  {
    icon: Users,
    index: '01',
    title: 'Ведущие инженеры индустрии',
    description:
      'Программы ведут действующие Staff и\u00A0Lead инженеры с\u00A0опытом распределенных систем и\u00A0дизайн-систем с\u00A0миллионными аудиториями.',
  },
  {
    icon: Terminal,
    index: '02',
    title: 'Актуальный стек решений',
    description:
      'Технологии сегодняшнего дня: React\u00A019, Server Components, Tailwind\u00A0v4 @theme, строгий TypeScript и\u00A0Feature-Sliced Design.',
  },
  {
    icon: Code,
    index: '03',
    title: 'Ручной разбор архитектуры',
    description:
      'Не\u00A0шаблонные тесты, а\u00A0детальное ревью вашего Pull Request с\u00A0проверкой контрактов слоёв, пограничных случаев и\u00A0производительности.',
  },
  {
    icon: MessagesSquare,
    index: '04',
    title: 'Закрытое сообщество',
    description:
      'Инженерный чат выпускников и\u00A0наставников: обсуждение архитектурных паттернов, закрытые вакансии и\u00A0экспертная помощь.',
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
          <span className="text-caption font-medium text-accent">
            Инженерный подход
          </span>
          <h2 className="font-display text-h2 font-semibold text-ink leading-tight text-balance">
            Принципы, на&nbsp;которых строится обучение
          </h2>
          <p className="text-body text-ink-muted leading-relaxed text-pretty">
            Мы отказались от пассивных лекций в&nbsp;пользу концентрированных практикумов
            и&nbsp;прямой работы с&nbsp;кодом вашего проекта.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                padding="none"
                className="flex flex-col gap-3.5 lg:gap-4 p-5 lg:p-6 bg-surface-raised border border-border h-full"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-accent" />
                  <span className="font-mono text-xs lg:text-sm text-ink-muted/80">{item.index}</span>
                </div>
                <h3 className="font-display font-semibold text-base lg:text-lg text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-caption lg:text-[15px] text-ink-muted leading-relaxed text-pretty">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
