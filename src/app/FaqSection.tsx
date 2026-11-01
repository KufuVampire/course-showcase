import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'Как устроен доступ к материалам после покупки?',
    a: 'Доступ открывается мгновенно после подтверждения оплаты. Вы получаете пожизненный доступ к записям, материалам репозиториев и всем будущим обновлениям программы в личном кабинете.',
  },
  {
    q: 'Как работает гарантия возврата 14 дней?',
    a: 'Если в течение первых 14 дней вы решите, что программа вам не подходит по уровню или подаче, просто напишите нам на почту поддержки. Мы вернем 100% оплаченной суммы без лишних споров.',
  },
  {
    q: 'Предоставляется ли беспроцентная рассрочка?',
    a: 'Да, для курсов и комплексных программ доступна рассрочка на 3, 6 или 12 месяцев без первого взноса и переплат через Т-Банк, Сбербанк и сервис Долями.',
  },
  {
    q: 'Чем воркшоп отличается от полноценного курса?',
    a: 'Воркшоп — это концентрированный однодневный интенсив (6–8 часов) с живым разбором конкретного инструмента или архитектурного перехода. Курс — это глубокая 4–8 недельная программа с регулярным код-ревью и защитой дипломного проекта.',
  },
  {
    q: 'Выдается ли сертификат по завершении?',
    a: 'Да, после успешной сдачи всех практических заданий и прохождения код-ревью вы получаете верифицируемый цифровой сертификат с ссылкой на ваш репозиторий, который можно прикрепить к LinkedIn или резюме.',
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 py-20 md:py-28 bg-surface-raised border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="text-caption font-semibold text-primary uppercase tracking-wider">
            Ответы на вопросы
          </span>
          <h2 className="font-display text-h2 font-bold text-ink leading-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Всё, что нужно знать об оплате, доступе к урокам и наставничестве.
          </p>
        </div>

        <div className="max-w-3xl flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border border-border rounded-lg bg-surface transition-colors overflow-hidden"
            >
              <summary className="list-none p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-ink text-base cursor-pointer hover:text-primary transition-colors select-none">
                <span>{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-ink-muted shrink-0 transition-transform duration-fast group-open:rotate-180 group-open:text-primary" />
              </summary>

              <div className="px-5 pb-5 pt-0 text-caption text-ink-muted leading-relaxed border-t border-border/40 mt-1">
                <p className="pt-3">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
