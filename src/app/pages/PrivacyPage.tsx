export function PrivacyPage() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-8 text-ink">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="text-caption font-semibold text-primary uppercase tracking-wider">
          Конфиденциальность
        </span>
        <h1 className="font-display text-h2 font-semibold leading-tight text-balance">
          Политика в&nbsp;отношении обработки персональных данных
        </h1>
        <span className="text-caption text-ink-muted">Редакция от 01 января 2026 г.</span>
      </div>

      <div className="flex flex-col gap-6 text-body text-ink-muted leading-relaxed max-w-3xl text-pretty">
        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">
            1. Категории обрабатываемых данных
          </h2>
          <p>
            Платформа «Практикум.PRO» осуществляет обработку следующих персональных данных,
            предоставляемых пользователем при регистрации и&nbsp;оформлении заказов:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1 text-caption">
            <li>Фамилия, имя и&nbsp;отчество пользователя;</li>
            <li>Адрес электронной почты (e-mail);</li>
            <li>Контактный номер телефона;</li>
            <li>Технические данные (IP-адрес, cookie, сведения о&nbsp;браузере).</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">2. Цели обработки</h2>
          <p>
            Персональные данные используются исключительно для исполнения договора оферты: создания
            и&nbsp;поддержания учетной записи студента, отправки кассовых чеков и&nbsp;уведомлений,
            организации обратной связи с&nbsp;куратором и&nbsp;технической поддержки.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">3. Безопасность и&nbsp;хранение</h2>
          <p>
            Обработка персональных данных ведется в&nbsp;соответствии с&nbsp;Федеральным законом РФ №&nbsp;152-ФЗ
            «О&nbsp;персональных данных». Данные банковских карт обрабатываются исключительно на&nbsp;стороне
            аккредитованного банковского эквайринга по&nbsp;протоколу PCI DSS и&nbsp;не&nbsp;сохраняются на&nbsp;серверах платформы.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-title font-semibold text-ink">4. Права пользователя</h2>
          <p>
            Пользователь имеет право в&nbsp;любой момент запросить удаление своего аккаунта и&nbsp;связанных
            данных, направив запрос на&nbsp;электронную почту support@praktikum-pro.dev.
          </p>
        </section>
      </div>
    </div>
  );
}
