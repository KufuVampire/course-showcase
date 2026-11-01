export function PrivacyPage() {
  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-8 text-ink">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="text-caption font-semibold text-primary uppercase tracking-wider">
          Конфиденциальность
        </span>
        <h1 className="font-display text-h2 font-bold leading-tight">
          Политика в отношении обработки персональных данных
        </h1>
        <span className="text-caption text-ink-muted">Редакция от 01 января 2026 г.</span>
      </div>

      <div className="flex flex-col gap-6 text-body text-ink-muted leading-relaxed max-w-3xl">
        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold text-ink">
            1. Категории обрабатываемых данных
          </h2>
          <p>
            Платформа «Практикум.PRO» осуществляет обработку следующих персональных данных,
            предоставляемых пользователем при регистрации и оформлении заказов:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1 text-caption">
            <li>Фамилия, имя и отчество пользователя;</li>
            <li>Адрес электронной почты (e-mail);</li>
            <li>Контактный номер телефона;</li>
            <li>Технические данные (IP-адрес, cookie, сведения о браузере).</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold text-ink">2. Цели обработки</h2>
          <p>
            Персональные данные используются исключительно для исполнения договора оферты: создания
            и поддержания учетной записи студента, отправки кассовых чеков и уведомлений,
            организации обратной связи с куратором и технической поддержки.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold text-ink">3. Безопасность и хранение</h2>
          <p>
            Обработка персональных данных ведется в соответствии с Федеральным законом РФ № 152-ФЗ
            «О персональных данных». Данные банковских карт обрабатываются исключительно на стороне
            аккредитованного банковского эквайринга по протоколу PCI DSS и не сохраняются на
            серверах платформы.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold text-ink">4. Права пользователя</h2>
          <p>
            Пользователь имеет право в любой момент запросить удаление своего аккаунта и связанных
            данных, направив запрос на электронную почту support@praktikum-pro.dev.
          </p>
        </section>
      </div>
    </div>
  );
}
