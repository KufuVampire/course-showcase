import type { Product } from '@/shared/api';
import { Modal } from '@/shared/ui';
import { useCheckoutModal } from './model/useCheckoutModal';
import { CheckoutFormStep } from './ui/CheckoutFormStep';
import { CheckoutStatusStep } from './ui/CheckoutStatusStep';

export interface CheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAccount: () => void;
}

export function CheckoutModal({ product, isOpen, onClose, onOpenAccount }: CheckoutModalProps) {
  const {
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
  } = useCheckoutModal(product);

  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={step === 'form' ? 'Оформление доступа' : 'Статус заказа'}
      description={
        step === 'form'
          ? `Программа: «${product.title}»`
          : undefined
      }
    >
      {step === 'form' ? (
        <CheckoutFormStep
          product={product}
          fullName={fullName}
          email={email}
          phone={phone}
          paymentMethod={paymentMethod}
          agreed={agreed}
          promoCode={promoCode}
          promoApplied={promoApplied}
          promoError={promoError}
          isCheckingPromo={isCheckingPromo}
          errors={errors}
          currentTotal={currentTotal}
          onFullNameChange={setFullName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onPaymentMethodChange={setPaymentMethod}
          onAgreedChange={setAgreed}
          onPromoCodeChange={setPromoCode}
          onApplyPromo={handleApplyPromo}
          onSubmit={handleSubmit}
        />
      ) : (
        <CheckoutStatusStep
          step={step}
          order={order}
          errorMessage={errorMessage}
          onRetry={handleRetry}
          onClose={onClose}
          onOpenAccount={onOpenAccount}
        />
      )}
    </Modal>
  );
}
