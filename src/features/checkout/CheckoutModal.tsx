import { useState, type FormEvent } from 'react';
import {
  CreditCard,
  QrCode,
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import type { CheckoutPayload, Order, PaymentMethod, Product } from '@/shared/api';
import { paymentGateway } from '@/shared/api';
import { formatPrice } from '@/shared/lib/formatters';
import { applyPromo, type PromoDiscount } from '@/shared/lib/promo';
import { Button, Checkbox, Field, Modal } from '@/shared/ui';
import { useAuthContext } from '@/app/AuthContext';
import { cn } from '@/shared/lib/cn';

export interface CheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAccount: () => void;
}

type CheckoutStep = 'form' | 'processing' | 'success' | 'error';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  icon: typeof CreditCard;
}

const paymentOptions: PaymentOption[] = [
  { id: 'card', label: 'Карта РФ / Мир', icon: CreditCard },
  { id: 'sbp', label: 'СБП (QR-код)', icon: QrCode },
  { id: 'installments', label: 'Рассрочка 0%', icon: CalendarCheck },
];

export function CheckoutModal({ product, isOpen, onClose, onOpenAccount }: CheckoutModalProps) {
  const { refreshOrders } = useAuthContext();
  const [step, setStep] = useState<CheckoutStep>('form');
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [agreed, setAgreed] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<PromoDiscount | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);

  // Field validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) return null;

  const currentTotal = applyPromo(product.price, promoApplied);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setIsCheckingPromo(true);
    setPromoError('');
    try {
      const res = await paymentGateway.validatePromo(promoCode);
      if (res.valid) {
        setPromoApplied({
          discountPercent: res.discountPercent,
          discountAmount: res.discountAmount,
        });
      } else {
        setPromoError('Промокод не найден или срок действия истек');
        setPromoApplied(null);
      }
    } catch {
      setPromoError('Ошибка проверки промокода');
    } finally {
      setIsCheckingPromo(false);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Укажите ваше имя и фамилию';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errs.email = 'Введите корректный email адрес';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errs.phone = 'Укажите полный номер телефона (не менее 10 цифр)';
    }

    if (!agreed) {
      errs.agreed = 'Необходимо подтвердить согласие с условиями оферты';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('processing');
    setErrorMessage('');

    const payload: CheckoutPayload = {
      productId: product.id,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      paymentMethod,
      agreedToTerms: agreed,
      promoCode: promoApplied ? promoCode.trim() : undefined,
    };

    try {
      const result = await paymentGateway.processPayment(payload);

      if (result.success) {
        setOrder(result.order);
        await refreshOrders();
        setStep('success');
      } else {
        setErrorMessage(result.error);
        setStep('error');
      }
    } catch {
      setErrorMessage('Произошел непредвиденный сбой связи с платежным шлюзом.');
      setStep('error');
    }
  };

  const handleReset = () => {
    setStep('form');
    setErrorMessage('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (step !== 'processing') {
          handleClose();
        }
      }}
      maxWidth="lg"
      title={step === 'form' ? 'Оформление заказа' : undefined}
      ariaLabel="Оформление заказа"
    >
      {/* STEP 1: FORM */}
      {step === 'form' && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Order Summary Header */}
          <div className="p-4 bg-surface-sunken border border-border rounded-md flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-caption text-ink-muted">Выбранный продукт:</span>
              <h4 className="font-display font-bold text-ink text-base">{product.title}</h4>
            </div>
            <div className="text-right shrink-0">
              <span className="font-display font-bold text-ink text-lg">
                {formatPrice(currentTotal)}
              </span>
              {promoApplied && (
                <span className="block text-caption text-success font-medium">Скидка учтена</span>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="flex flex-col gap-4">
            <Field
              label="ФИО покупателя"
              placeholder="Иван Иванов"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              autoComplete="name"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Email (для доступа и чека)"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                autoComplete="email"
                hint="Доступ к материалам придет на эту почту"
                required
              />

              <Field
                label="Телефон"
                placeholder="+7 (999) 000-00-00"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>
          </div>

          {/* Promo code field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="checkout-promo" className="text-caption font-medium text-ink">
              Промокод
            </label>
            <div className="flex gap-2">
              <input
                id="checkout-promo"
                type="text"
                placeholder="PROMO10 или DEV2000"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={Boolean(promoApplied)}
                className="w-full bg-surface-raised border border-border rounded-md text-caption py-2.5 px-3.5 text-ink outline-none focus:ring-2 focus:ring-primary uppercase"
              />
              <Button
                type="button"
                variant={promoApplied ? 'secondary' : 'outline'}
                size="sm"
                onClick={promoApplied ? () => setPromoApplied(null) : handleApplyPromo}
                isLoading={isCheckingPromo}
              >
                {promoApplied ? 'Отменить' : 'Применить'}
              </Button>
            </div>
            {promoError && <span className="text-caption text-danger">{promoError}</span>}
            {promoApplied && (
              <span className="text-caption text-success">✓ Промокод успешно активирован</span>
            )}
          </div>

          {/* Payment Methods RadioGroup */}
          <div className="flex flex-col gap-2">
            <span className="text-caption font-medium text-ink">Способ оплаты</span>
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
                    onClick={() => setPaymentMethod(opt.id)}
                    className={cn(
                      'p-3 rounded-md border flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center',
                      isSelected
                        ? 'border-primary bg-primary/5 text-primary font-semibold ring-1 ring-primary'
                        : 'border-border bg-surface-raised text-ink hover:bg-surface-sunken'
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
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
                Я согласен с{' '}
                <a
                  href="/oferta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink hover:text-primary transition-colors"
                >
                  условиями публичной оферты
                </a>{' '}
                и{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-ink hover:text-primary transition-colors"
                >
                  политикой обработки данных
                </a>
                .
              </span>
            }
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            error={errors.agreed}
            required
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Оплатить {formatPrice(currentTotal)}
          </Button>
        </form>
      )}

      {/* STEP 2: PROCESSING */}
      {step === 'processing' && (
        <div className="py-12 flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <h3 className="font-display font-bold text-xl text-ink">Обработка платежа...</h3>
          <p className="text-caption text-ink-muted max-w-sm">
            Связываемся с платёжным шлюзом. Пожалуйста, не закрывайте окно браузера.
          </p>
        </div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 'success' && order && (
        <div className="py-6 flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-display font-bold text-2xl text-ink">Оплата прошла успешно!</h3>
            <span className="text-caption text-ink-muted">
              Заказ #{order.orderNumber} оформлен и оплачен
            </span>
          </div>

          <div className="w-full p-4 bg-surface-sunken border border-border rounded-md text-left flex flex-col gap-2 text-caption">
            <div className="flex justify-between">
              <span className="text-ink-muted">Продукт:</span>
              <span className="font-semibold text-ink">{order.productTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Сумма к оплате:</span>
              <span className="font-semibold text-ink">{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Чек отправлен на:</span>
              <span className="font-semibold text-ink">{order.buyer.email}</span>
            </div>
          </div>

          <p className="text-caption text-ink-muted leading-relaxed">
            Вам открыт доступ к материалам курса. Вы можете перейти в личный кабинет прямо сейчас.
          </p>

          <div className="flex items-center gap-3 w-full">
            <Button variant="outline" size="md" fullWidth onClick={handleClose}>
              Вернуться в каталог
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                handleClose();
                onOpenAccount();
              }}
            >
              В личный кабинет
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: ERROR */}
      {step === 'error' && (
        <div className="py-6 flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-full bg-danger/15 text-danger flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-display font-bold text-2xl text-ink">Не удалось провести оплату</h3>
            <p className="text-body text-danger max-w-sm">{errorMessage}</p>
          </div>

          <p className="text-caption text-ink-muted">
            Деньги не были списаны. Вы можете проверить введенные данные или выбрать другой метод
            оплаты.
          </p>

          <div className="flex items-center gap-3 w-full">
            <Button variant="outline" size="md" fullWidth onClick={handleClose}>
              Отмена
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Попробовать снова
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
