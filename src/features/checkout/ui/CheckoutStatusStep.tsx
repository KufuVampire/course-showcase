import { Loader2, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import type { Order } from '@/shared/api';
import { formatPrice } from '@/shared/lib/formatters';
import { Button } from '@/shared/ui';
import type { CheckoutStep } from '../model/useCheckoutModal';

export interface CheckoutStatusStepProps {
  step: CheckoutStep;
  order: Order | null;
  errorMessage: string;
  onRetry: () => void;
  onClose: () => void;
  onOpenAccount: () => void;
}

export function CheckoutStatusStep({
  step,
  order,
  errorMessage,
  onRetry,
  onClose,
  onOpenAccount,
}: CheckoutStatusStepProps) {
  if (step === 'processing') {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <div className="flex flex-col gap-1">
          <span className="font-display font-semibold text-lg text-ink">
            Обработка транзакции...
          </span>
          <span className="text-caption text-ink-muted">
            Связываемся с платежным шлюзом. Пожалуйста, не закрывайте окно.
          </span>
        </div>
      </div>
    );
  }

  if (step === 'success' && order) {
    return (
      <div className="py-6 flex flex-col items-center gap-6 text-center">
        <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-h2 font-bold text-ink">Оплата прошла успешно!</h3>
          <p className="text-body text-ink-muted max-w-md">
            Заказ <strong className="text-ink">#{order.orderNumber}</strong> на сумму{' '}
            <strong className="text-ink font-mono">{formatPrice(order.totalAmount)}</strong> подтвержден. Доступ к
            материалам открыт в вашем личном кабинете.
          </p>
        </div>

        <div className="p-4 bg-surface-sunken border border-border rounded-md w-full text-left text-caption flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-ink-muted">Продукт:</span>
            <span className="font-medium text-ink">{order.productTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Покупатель:</span>
            <span className="font-medium text-ink">{order.buyer.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Способ оплаты:</span>
            <span className="font-medium text-ink">{order.paymentMethod.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Button variant="outline" size="md" fullWidth onClick={onClose}>
            Вернуться в каталог
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              onClose();
              onOpenAccount();
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            В личный кабинет
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="py-6 flex flex-col items-center gap-6 text-center">
        <div className="w-14 h-14 rounded-full bg-danger/15 text-danger flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-h2 font-bold text-ink">Ошибка при оплате</h3>
          <p className="text-body text-danger max-w-md">{errorMessage}</p>
          <span className="text-caption text-ink-muted">
            Средства не были списаны. Вы можете повторить попытку или выбрать другой способ оплаты.
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="md" onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onRetry}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
