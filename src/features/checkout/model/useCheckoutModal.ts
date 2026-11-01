import { useEffect, useState, type FormEvent } from 'react';
import type { CheckoutPayload, Order, PaymentMethod, Product } from '@/shared/api';
import { paymentGateway } from '@/shared/api';
import { applyPromo, type PromoDiscount } from '@/shared/lib/promo';
import { useAuthContext } from '@/app/AuthContext';

export type CheckoutStep = 'form' | 'processing' | 'success' | 'error';

export function useCheckoutModal(product: Product | null) {
  const { user, refreshOrders, refreshUser } = useAuthContext();
  const [step, setStep] = useState<CheckoutStep>('form');
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form state prefilled from logged-in user
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('+7 ');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [agreed, setAgreed] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<PromoDiscount | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);

  // Sync contacts if user loaded asynchronously
  useEffect(() => {
    if (user) {
      setFullName((prev) => prev || user.fullName || '');
      setEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  // Field validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentTotal = product ? applyPromo(product.price, promoApplied) : 0;

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
      errs.agreed = 'Необходимо согласие с условиями оферты';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product || !validate()) return;

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
      const res = await paymentGateway.processPayment(payload);
      if (res.success) {
        setOrder(res.order);
        setStep('success');
        await Promise.all([refreshOrders(), refreshUser()]);
      } else {
        setStep('error');
        setErrorMessage(res.error || 'Платеж был отклонен банком');
      }
    } catch (err) {
      setStep('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Произошла непредвиденная ошибка при проведении оплаты'
      );
    }
  };

  const handleRetry = () => {
    setStep('form');
  };

  return {
    step,
    order,
    errorMessage,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    paymentMethod,
    setPaymentMethod,
    agreed,
    setAgreed,
    promoCode,
    setPromoCode,
    promoApplied,
    promoError,
    isCheckingPromo,
    errors,
    currentTotal,
    handleApplyPromo,
    handleSubmit,
    handleRetry,
  };
}
