export function OfertaPage() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-8 text-ink">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="text-caption font-semibold text-primary uppercase tracking-wider">
          Правовые документы
        </span>
        <h1 className="font-display text-h2 font-semibold leading-tight text-balance">
          Публичная оферта на&nbsp;оказание образовательных услуг
        </h1>
        <span className="text-caption text-ink-muted">Редакция от 01 января 2026 г.</span>
      </div>

      <div className="flex flex-col gap-6 text-body text-ink-muted leading-relaxed max-w-3xl text-pretty">
        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">1. Общие положения</h2>
          <p>
            Настоящий документ является публичной офертой образовательной платформы «Практикум.PRO»
            (далее&nbsp;— Исполнитель) и&nbsp;содержит все существенные условия договора на&nbsp;оказание
            информационно-консультационных и&nbsp;образовательных услуг в&nbsp;дистанционном формате.
          </p>
          <p>
            Безоговорочным принятием (акцептом) условий настоящей Оферты считается совершение
            Заказчиком оплаты выбранного образовательного продукта (курса, воркшопа или
            консультации).
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">2. Предмет договора</h2>
          <p>
            Исполнитель обязуется предоставить Заказчику доступ к&nbsp;материалам выбранной программы
            (видеолекции, практические задания, методические материалы, код-ревью), а&nbsp;Заказчик
            обязуется оплатить указанные услуги в&nbsp;соответствии с&nbsp;тарифами, размещенными на&nbsp;сайте.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">
            3. Порядок оплаты и&nbsp;предоставления доступа
          </h2>
          <p>
            Оплата производится посредством банковских карт, СБП или в&nbsp;рассрочку. Доступ к&nbsp;личному
            кабинету и&nbsp;учебным материалам активируется в&nbsp;автоматическом режиме сразу после
            подтверждения успешной транзакции платежным шлюзом.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">
            4. Гарантия и&nbsp;порядок возврата средств
          </h2>
          <p>
            Исполнитель предоставляет безусловную гарантию качества: Заказчик имеет право запросить
            полный возврат (100&nbsp;%) денежных средств в&nbsp;течение первых 14&nbsp;(четырнадцати) календарных
            дней с&nbsp;момента оплаты, направив заявление на&nbsp;электронную почту
            support@praktikum-pro.dev.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">5. Контакты и&nbsp;реквизиты</h2>
          <p>
            Служба клиентской поддержки: support@praktikum-pro.dev
            <br />
            Время работы: Пн–Пт с&nbsp;10:00 до&nbsp;19:00 (МСК)
          </p>
        </section>
      </div>
    </div>
  );
}
