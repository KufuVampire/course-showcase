import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'Как устроен доступ к\u00A0материалам после покупки?',
    a: 'Доступ открывается мгновенно после подтверждения оплаты. Вы получаете пожизненный доступ к\u00A0записям, материалам репозиториев и\u00A0всем будущим обновлениям программы в\u00A0личном кабинете.',
  },
  {
    q: 'Как работает гарантия возврата 14\u00A0дней?',
    a: 'Если в\u00A0течение первых 14\u00A0дней вы решите, что программа вам не\u00A0подходит по\u00A0уровню или подаче, просто напишите нам на\u00A0почту поддержки. Мы вернем 100\u00A0% оплаченной суммы без лишних споров.',
  },
  {
    q: 'Предоставляется ли беспроцентная рассрочка?',
    a: 'Да, для курсов и\u00A0комплексных программ доступна рассрочка на\u00A03, 6 или 12\u00A0месяцев без первого взноса и\u00A0переплат через Т-Банк, Сбербанк и\u00A0сервис «Долями».',
  },
  {
    q: 'Чем воркшоп отличается от\u00A0полноценного курса?',
    a: 'Воркшоп\u00A0— это концентрированный однодневный интенсив (6–8\u00A0часов) с\u00A0живым разбором конкретного инструмента или архитектурного перехода. Курс\u00A0— это глубокая 4–8-недельная программа с\u00A0регулярным код-ревью и\u00A0защитой дипломного проекта.',
  },
  {
    q: 'Выдается ли сертификат по\u00A0завершении?',
    a: 'Да, после успешной сдачи всех практических заданий и\u00A0прохождения код-ревью вы получаете верифицируемый цифровой сертификат с\u00A0ссылкой на\u00A0ваш репозиторий, который можно прикрепить к\u00A0LinkedIn или резюме.',
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 py-16 md:py-24 bg-surface-raised border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-caption font-medium text-primary">
            Вопросы и ответы
          </span>
          <h2 className="font-display text-h2 font-semibold text-ink leading-tight text-balance">
            Часто задаваемые вопросы
          </h2>
          <p className="text-body text-ink-muted leading-relaxed text-pretty">
            Всё, что нужно знать об&nbsp;оплате, доступе к&nbsp;урокам и&nbsp;наставничестве.
          </p>
        </div>

        <div className="max-w-3xl flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border border-border rounded-lg bg-surface transition-colors overflow-hidden"
            >
              <summary className="list-none p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-primary transition-colors select-none">
                <h3 className="font-display font-semibold text-ink text-base leading-snug">
                  {faq.q}
                </h3>
                <ChevronDown className="w-5 h-5 text-ink-muted shrink-0 transition-transform duration-fast group-open:rotate-180 group-open:text-primary" />
              </summary>

              <div className="px-5 pb-5 pt-0 text-caption text-ink-muted leading-relaxed border-t border-border/40 mt-1">
                <p className="pt-3 text-pretty">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
