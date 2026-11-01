import type { FormEvent } from 'react';
import { CreditCard, QrCode, CalendarCheck } from 'lucide-react';
import type { PaymentMethod, Product } from '@/shared/api';
import { formatPrice } from '@/shared/lib/formatters';
import type { PromoDiscount } from '@/shared/lib/promo';
import { Button, Checkbox, Field } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  icon: typeof CreditCard;
}

const paymentOptions: PaymentOption[] = [
  { id: 'card', label: 'Карта РФ / Мир', icon: CreditCard },
  { id: 'sbp', label: 'СБП (QR-код)', icon: QrCode },
  { id: 'installments', label: 'Рассрочка 0 %', icon: CalendarCheck },
];

export interface CheckoutFormStepProps {
  product: Product;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
  agreed: boolean;
  promoCode: string;
  promoApplied: PromoDiscount | null;
  promoError: string;
  isCheckingPromo: boolean;
  errors: Record<string, string>;
  currentTotal: number;
  onFullNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onPaymentMethodChange: (v: PaymentMethod) => void;
  onAgreedChange: (v: boolean) => void;
  onPromoCodeChange: (v: string) => void;
  onApplyPromo: () => void;
  onSubmit: (e: FormEvent) => void;
}

export function CheckoutFormStep({
  product,
  fullName,
  email,
  phone,
  paymentMethod,
  agreed,
  promoCode,
  promoApplied,
  promoError,
  isCheckingPromo,
  errors,
  currentTotal,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onPaymentMethodChange,
  onAgreedChange,
  onPromoCodeChange,
  onApplyPromo,
  onSubmit,
}: CheckoutFormStepProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Product Summary */}
      <div className="p-4 bg-surface-sunken border border-border rounded-md flex flex-col gap-2">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="font-semibold text-ink text-base block">{product.title}</span>
            <span className="text-caption text-ink-muted">{product.subtitle}</span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-mono text-price font-bold text-ink block">
              {formatPrice(currentTotal)}
            </span>
            {promoApplied && (
              <span className="text-xs text-ink-muted line-through block font-mono">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {promoApplied && (
          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-success font-medium">
            <span>
              Скидка по&nbsp;промокоду ({promoApplied.discountPercent ? `${promoApplied.discountPercent} %` : `${promoApplied.discountAmount} ₽`}):
            </span>
            <span className="font-mono">-{formatPrice(product.price - currentTotal)}</span>
          </div>
        )}
      </div>

      {/* Promo Code Box */}
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2">
          <div className="flex-1">
            <Field
              placeholder="Промокод (например: DEV20)"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              disabled={Boolean(promoApplied)}
              error={promoError}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onApplyPromo}
            disabled={!promoCode.trim() || Boolean(promoApplied) || isCheckingPromo}
            isLoading={isCheckingPromo}
          >
            {promoApplied ? 'Применен' : 'Применить'}
          </Button>
        </div>
      </div>

      {/* Contact Fields */}
      <div className="flex flex-col gap-4">
        <h3 className="font-display font-semibold text-ink text-base">Контакты покупателя</h3>

        <Field
          label="Имя и фамилия"
          placeholder="Иван Иванов"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          error={errors.fullName}
          required
          autoComplete="name"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Email для доступа к урокам"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
          />

          <Field
            label="Номер телефона"
            type="tel"
            placeholder="+7 999 000-00-00"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            error={errors.phone}
            required
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col gap-3">
        <h3 className="font-display font-semibold text-ink text-base">
          Способ оплаты
        </h3>

        <div
          role="radiogroup"
          aria-label="Выбор способа оплаты"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {paymentOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = paymentMethod === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onPaymentMethodChange(opt.id)}
                className={cn(
                  'p-3 rounded-md border flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isSelected
                    ? 'border-accent bg-accent/10 text-ink font-semibold ring-1 ring-accent'
                    : 'border-border bg-surface-raised text-ink hover:bg-surface-sunken'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isSelected ? 'text-accent' : 'text-ink-muted')} />
                <span className="text-caption">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms checkbox */}
      <Checkbox
        label={
          <span>
            Я согласен с&nbsp;
            <a
              href="/oferta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              условиями публичной оферты
            </a>{' '}
            и&nbsp;
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              политикой обработки персональных данных
            </a>
            .
          </span>
        }
        checked={agreed}
        onChange={(e) => onAgreedChange(e.target.checked)}
        error={errors.agreed}
        required
      />

      {/* Submit */}
      <Button type="submit" variant="accent" size="lg" fullWidth>
        Оплатить {formatPrice(currentTotal)}
      </Button>
    </form>
  );
}
