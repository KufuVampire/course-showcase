import { Star, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { Product } from '@/shared/api';
import { formatDuration } from '@/shared/lib/formatters';
import { Badge, Modal } from '@/shared/ui';
import { LEVEL_LABEL, PRODUCT_TYPE_META } from '@/shared/config/product';
import { ProductDetailsInstructor } from './ui/ProductDetailsInstructor';
import { ProductDetailsSyllabus } from './ui/ProductDetailsSyllabus';
import { ProductDetailsFooter } from './ui/ProductDetailsFooter';

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
            <span className="font-mono">{product.rating.toFixed(2)}</span>
            <span className="text-ink-muted font-normal">({product.reviewsCount}&nbsp;отзывов)</span>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-surface-sunken rounded-md text-caption">
          <div>
            <span className="text-ink-muted block text-xs">Длительность</span>
            <span className="font-semibold text-ink flex items-center gap-1 mt-0.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-accent" />
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
          <h3 className="font-display font-semibold text-ink text-lg">О&nbsp;продукте</h3>
          <p className="text-body text-ink leading-relaxed text-pretty">{product.description}</p>
        </div>

        {/* Instructor */}
        <ProductDetailsInstructor instructor={product.instructor} />

        {/* Syllabus */}
        <ProductDetailsSyllabus syllabus={product.syllabus} />

        {/* What's included */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display font-semibold text-ink text-lg">Что входит в&nbsp;стоимость</h3>
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
          <span>Гарантия возврата 100&nbsp;% средств в&nbsp;течение 14&nbsp;дней, если программа вам не&nbsp;подойдет.</span>
        </div>

        {/* Footer Checkout CTA */}
        <ProductDetailsFooter
          product={product}
          onClose={onClose}
          onProceedToCheckout={onProceedToCheckout}
        />
      </div>
    </Modal>
  );
}
