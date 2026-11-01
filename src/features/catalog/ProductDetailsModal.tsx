import { Star, Clock, CheckCircle2, ShieldCheck, ArrowRight, User } from 'lucide-react';
import type { Product } from '@/shared/api';
import { formatDuration, formatPrice } from '@/shared/lib/formatters';
import { Badge, Button, Modal } from '@/shared/ui';
import { LEVEL_LABEL, PRODUCT_TYPE_META } from '@/shared/config/product';

export interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (product: Product) => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onProceedToCheckout,
}: ProductDetailsModalProps) {
  if (!product) return null;

  const typeMeta = PRODUCT_TYPE_META[product.type];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title={product.title}
      description={product.subtitle}
      ariaLabel={product.title}
    >
      <div className="flex flex-col gap-6">
        {/* Header tags and rating */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
            {product.badge && <Badge variant="default">{product.badge}</Badge>}
          </div>

          <div className="flex items-center gap-1 text-caption text-ink font-semibold">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>{product.rating.toFixed(2)}</span>
            <span className="text-ink-muted font-normal">({product.reviewsCount} отзывов)</span>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-surface-sunken rounded-md text-caption">
          <div>
            <span className="text-ink-muted block text-xs">Длительность</span>
            <span className="font-semibold text-ink flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {formatDuration(product.durationHours)}
            </span>
          </div>
          <div>
            <span className="text-ink-muted block text-xs">Сложность</span>
            <span className="font-semibold text-ink mt-0.5 block">
              {LEVEL_LABEL[product.level]}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-ink-muted block text-xs">Формат</span>
            <span className="font-semibold text-ink mt-0.5 block">
              {product.type === 'consultation' ? 'Персональный созвон 1-на-1' : 'Онлайн + практика'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-ink text-lg">О продукте</h3>
          <p className="text-body text-ink leading-relaxed">{product.description}</p>
        </div>

        {/* Instructor Section */}
        <div className="flex items-start gap-4 p-4 border border-border rounded-md bg-surface-raised">
          <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-ink-muted shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption text-primary font-semibold">Автор & Ведущий</span>
            <h4 className="font-display font-bold text-ink text-base">{product.instructor.name}</h4>
            <span className="text-caption text-ink-muted">{product.instructor.role}</span>
            {product.instructor.bio && (
              <p className="text-caption text-ink-muted mt-1 leading-relaxed">
                {product.instructor.bio}
              </p>
            )}
          </div>
        </div>

        {/* Syllabus / Program */}
        {product.syllabus && product.syllabus.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-display font-semibold text-ink text-lg">Программа обучения</h3>
            <div className="flex flex-col gap-3">
              {product.syllabus.map((item) => (
                <div
                  key={item.title}
                  className="p-3.5 bg-surface-sunken/60 border border-border/70 rounded-md"
                >
                  <span className="font-semibold text-ink text-caption block mb-1.5">
                    {item.title}
                  </span>
                  <ul className="flex flex-col gap-1 pl-4">
                    {item.topics.map((t) => (
                      <li key={t} className="text-caption text-ink-muted list-disc">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's included */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display font-semibold text-ink text-lg">Что входит в стоимость</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.features.map((feat) => (
              <li key={feat} className="flex items-center gap-2 text-caption text-ink">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guarantee badge */}
        <div className="flex items-center gap-2.5 p-3 rounded-md bg-success/10 border border-success/20 text-success text-caption">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>
            Гарантия возврата 100% средств в течение 14 дней, если программа вам не подойдет.
          </span>
        </div>

        {/* Footer Checkout CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col">
            <span className="text-caption text-ink-muted">Полная стоимость</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-h2 font-bold text-ink">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-body line-through text-ink-muted">
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
              variant="accent"
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
      </div>
    </Modal>
  );
}
