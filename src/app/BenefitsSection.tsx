import { Terminal, Users, Code, MessagesSquare } from 'lucide-react';
import { Card } from '@/shared/ui';

const benefits = [
  {
    icon: Users,
    title: 'Ведущие инженеры индустрии',
    description:
      'Программы ведут действующие Staff и Lead инженеры с опытом построения распределенных систем и дизайн-китов с миллионными аудиториями.',
  },
  {
    icon: Terminal,
    title: 'Стек без устаревших подходов',
    description:
      'Изучаем технологии, востребованные сегодня: React 19, Server Components, Tailwind v4 @theme, строгий TypeScript и Feature-Sliced Design.',
  },
  {
    icon: Code,
    title: 'Глубокий разбор вашего кода',
    description:
      'Не автотесты с абстрактными проверками, а ручное код-ревью с разбором архитектурных решений, пограничных случаев и кодстайла.',
  },
  {
    icon: MessagesSquare,
    title: 'Закрытый инженерный клуб',
    description:
      'Доступ в закрытый чат авторов и выпускников: обсуждение архитектурных решений, вакансии без открытого рынка и взаимопомощь.',
  },
];

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="scroll-mt-20 py-20 md:py-28 bg-surface-sunken/40 border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="text-caption font-semibold text-primary uppercase tracking-wider">
            Наш подход
          </span>
          <h2 className="font-display text-h2 font-bold text-ink leading-tight">
            Почему практикующие инженеры выбирают наши программы
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Мы отказались от растянутых полугодовых лекций в пользу концентрированных практикумов и
            индивидуальной работы над вашим проектом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} padding="lg" className="flex flex-col gap-4 bg-surface-raised">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-ink leading-snug">
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
