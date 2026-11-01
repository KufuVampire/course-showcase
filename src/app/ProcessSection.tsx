const steps = [
  {
    step: '01',
    title: 'Выбор формата и программы',
    description:
      'Изучите программу, требования к уровню и результаты в каталоге. Подберите курс для глубокого погружения или воркшоп для точечного навыка.',
  },
  {
    step: '02',
    title: 'Оформление в 1 клик',
    description:
      'Укажите контактные данные и выберите удобный способ: банковская карта, СБП или рассрочка от 0% без переплат.',
  },
  {
    step: '03',
    title: 'Мгновенный старт',
    description:
      'Сразу после подтверждения оплаты личный кабинет активируется. Все видео, репозитории и методички доступны в любое время.',
  },
  {
    step: '04',
    title: 'Практика и персональный фидбек',
    description:
      'Выполняйте практические задачи в личном темпе, получайте подробные комментарии к Pull Request от наставника и защищайте проект.',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 py-20 md:py-28 bg-surface-raised border-b border-border">
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-14">
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="text-caption font-semibold text-primary uppercase tracking-wider">
            Прозрачный процесс
          </span>
          <h2 className="font-display text-h2 font-bold text-ink leading-tight">
            Как проходит обучение от заявки до сертификата
          </h2>
          <p className="text-body text-ink-muted leading-relaxed">
            Без бюрократии и ожидания набора групп: приступайте к материалам в день оформления.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 relative">
              <span className="font-display font-bold text-3xl text-primary/40 select-none">
                {item.step}
              </span>
              <h3 className="font-display font-bold text-lg text-ink">
                {item.title}
              </h3>
              <p className="text-caption text-ink-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
