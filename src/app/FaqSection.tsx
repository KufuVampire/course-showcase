import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Кому подходят ваши практикумы?',
    a: 'Наши программы рассчитаны на практикующих разработчиков уровня Middle и Senior, которые хотят систематизировать знания архитектуры, освоить Feature-Sliced Design и проектировать масштабируемые интерфейсы без хаоса в коде.',
  },
  {
    q: 'Как проходит код-ревью моих практических заданий?',
    a: 'Вы работаете в персональном форке учебного репозитория и создаёте Pull Request на каждую выполненную задачу. Действующий Staff или Lead инженер проводит детальное ревью: проверяет контракты слоёв, пограничные случаи, мемоизацию и тесты, оставляя предметные комментарии.',
  },
  {
    q: 'Есть ли рассрочка и гарантия возврата средств?',
    a: 'Да, на все программы стоимостью от 10 000 ₽ доступна беспроцентная рассрочка без переплат. Кроме того, действует гарантия полного возврата 100 % средств в течение первых 14 дней обучения, если программа вам не подойдёт.',
  },
  {
    q: 'Как быстро я получу доступ к материалам после оплаты?',
    a: 'Мгновенно. Сразу после успешного подтверждения транзакции репозитории, практические задания и инструкции станут доступны в вашем личном кабинете. Ссылка на личный кабинет также дублируется на указанную почту.',
  },
  {
    q: 'Что входит в индивидуальную консультацию?',
    a: 'В консультацию входит часовой аудио/видео-созвон 1-на-1 с разбором вашего пет-проекта, архитектуры или резюме, а также последующая неделя текстовой поддержки и асинхронного ревью изменений.',
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
          <span className="text-caption font-medium text-accent">
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
              <summary className="list-none p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-accent focus-visible:outline-none focus-visible:text-accent transition-colors select-none">
                <h3 className="font-display font-semibold text-ink text-base leading-snug">
                  {faq.q}
                </h3>
                <ChevronDown className="w-5 h-5 text-ink-muted shrink-0 transition-transform duration-fast group-open:rotate-180 group-open:text-accent" />
              </summary>

              <div className="px-5 pb-5 pt-0 text-caption lg:text-body text-ink-muted leading-relaxed border-t border-border/40 mt-1">
                <p className="pt-3 text-pretty">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
