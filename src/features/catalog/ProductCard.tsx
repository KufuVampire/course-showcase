import React from 'react';
import { Star, Clock, User, ArrowRight } from 'lucide-react';
import { Product, ProductType } from '@/shared/api';
import { formatDuration, formatPrice } from '@/shared/lib/formatters';
import { Badge, Button, Card } from '@/shared/ui';

export interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onCheckout: (product: Product) => void;
}

const typeConfig: Record<ProductType, { label: string; variant: 'primary' | 'accent' | 'consult' }> = {
  course: { label: 'Курс', variant: 'primary' },
  workshop: { label: 'Воркшоп', variant: 'accent' },
  consultation: { label: 'Консультация', variant: 'consult' },
};

const levelLabels: Record<string, string> = {
  all: 'Любой уровень',
  beginner: 'Для начинающих',
  intermediate: 'Middle / Middle+',
  advanced: 'Senior / Lead',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onCheckout,
}) => {
  const typeMeta = typeConfig[product.type];

  return (
    <Card
      hoverable
      padding="none"
      className="flex flex-col h-full overflow-hidden border border-border group"
    >
      {/* Card Header Media Accent */}
      <div className="p-6 pb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
            {product.badge && <Badge variant="default">{product.badge}</Badge>}
          </div>

          <div className="flex items-center gap-1 text-caption text-ink font-semibold">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-ink-muted font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        <h3
          onClick={() => onOpenDetails(product)}
          className="font-display text-h2 font-bold text-ink hover:text-primary transition-colors cursor-pointer leading-tight text-xl"
        >
          {product.title}
        </h3>

        <p className="text-caption text-ink-muted line-clamp-2 leading-relaxed">
          {product.subtitle}
        </p>
      </div>

      {/* Meta tags & Details */}
      <div className="px-6 py-2 flex flex-wrap gap-2 text-caption text-ink-muted">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-primary" />
          {formatDuration(product.durationHours)}
        </span>
        <span>•</span>
        <span>{levelLabels[product.level] || product.level}</span>
      </div>

      {/* Instructor info */}
      <div className="px-6 py-3 flex items-center gap-2.5 text-caption border-t border-border/50 mt-auto bg-surface-sunken/40">
        <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center text-ink-muted font-bold text-xs shrink-0">
          <User className="w-4 h-4" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-ink truncate">{product.instructor.name}</span>
          <span className="text-ink-muted text-xs truncate">{product.instructor.role}</span>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="p-6 pt-4 border-t border-border flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-ink text-xl">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-caption line-through text-ink-muted">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <span className="text-xs text-ink-muted">Рассрочка от 0%</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenDetails(product)}
            aria-label={`Подробнее о ${product.title}`}
          >
            Инфо
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onCheckout(product)}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Купить
          </Button>
        </div>
      </div>
    </Card>
  );
};
