import type { BadgeVariant } from '@/shared/ui/Badge';
import type { Order, PaymentMethod, ProductLevel, ProductType } from '@/shared/api/types';

export const PRODUCT_TYPE_META: Record<ProductType, { label: string; variant: BadgeVariant }> = {
  course: { label: 'Курс', variant: 'primary' },
  workshop: { label: 'Воркшоп', variant: 'secondary' },
  consultation: { label: 'Консультация', variant: 'consult' },
};

export const LEVEL_LABEL: Record<ProductLevel, string> = {
  all: 'Любой уровень',
  beginner: 'Для начинающих',
  intermediate: 'Middle / Middle+',
  advanced: 'Senior / Lead',
};

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  card: 'Банковская карта РФ / Мир',
  sbp: 'СБП (QR-код)',
  installments: 'Беспроцентная рассрочка 0%',
};

export const ORDER_STATUS_LABEL: Record<Order['status'], { label: string; variant: BadgeVariant }> =
  {
    paid: { label: 'Оплачен', variant: 'success' },
    pending: { label: 'В обработке', variant: 'warning' },
    failed: { label: 'Отклонён', variant: 'danger' },
  };
