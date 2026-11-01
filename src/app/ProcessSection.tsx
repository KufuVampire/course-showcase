const steps = [
  {
    step: '01',
    title: 'Выбор программы и уровня',
    description:
      'Изучите стек, требования и результаты в каталоге. Выберите комплексный практикум или точечный воркшоп под текущую задачу.',
  },
  {
    step: '02',
    title: 'Оформление доступа',
    description:
      'Укажите контактные данные и выберите удобный способ: карта, СБП или беспроцентная рассрочка 0%.',
  },
  {
    step: '03',
    title: 'Доступ к материалам',
    description:
      'Сразу после подтверждения активируется личный кабинет: репозитории, спецификации, видеоматериалы и чат потока.',
  },
  {
    step: '04',
    title: 'Практика и ревью Pull Request',
    description:
      'Пишите реальный код, отправляйте PR на ревью наставнику и получайте подробные комментарии к архитектуре.',
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-20 py-16 md:py-24 bg-surface-raised border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-caption font-medium text-primary">
            Этапы программы
          </span>
          <h2 className="font-display text-h2 font-semibold text-ink leading-tight">
            Как проходит обучение от заявки до защиты проекта
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Без ожидания набора групп: приступайте к материалам и первому заданию сразу после оформления.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 relative">
              <span
                aria-hidden="true"
                className="font-mono text-sm font-semibold text-primary/70 select-none"
              >
                {item.step} —
              </span>
              <h3 className="font-display font-semibold text-base text-ink leading-snug">
                {item.title}
              </h3>
              <p className="text-caption text-ink-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
