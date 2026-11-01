import { ArrowRight } from 'lucide-react';
import type { Product } from '@/shared/api';
import { formatPrice } from '@/shared/lib/formatters';
import { Button } from '@/shared/ui';

export interface ProductDetailsFooterProps {
  product: Product;
  onClose: () => void;
  onProceedToCheckout: (product: Product) => void;
}

export function ProductDetailsFooter({
  product,
  onClose,
  onProceedToCheckout,
}: ProductDetailsFooterProps) {
  return (
    <div className="pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
      <div className="flex flex-col">
        <span className="text-caption text-ink-muted">Полная стоимость</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-h2 font-bold text-ink tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="font-mono text-body line-through text-ink-muted tabular-nums">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="md" onClick={onClose}>
          Закрыть
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            onClose();
            onProceedToCheckout(product);
          }}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Перейти к оформлению
        </Button>
      </div>
    </div>
  );
}
