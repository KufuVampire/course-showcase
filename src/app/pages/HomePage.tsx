import type { Product } from '@/shared/api';
import { CatalogFilters, CatalogList, type useCatalog } from '@/features/catalog';
import { HeroSection } from '../HeroSection';
import { BenefitsSection } from '../BenefitsSection';
import { ProcessSection } from '../ProcessSection';
import { ReviewsSection } from '../ReviewsSection';
import { FaqSection } from '../FaqSection';

export interface HomePageProps {
  catalogState: ReturnType<typeof useCatalog>;
  onOpenDetails: (product: Product) => void;
  onCheckout: (product: Product) => void;
}

export function HomePage({ catalogState, onOpenDetails, onCheckout }: HomePageProps) {
  const { products, isLoading, error, filters, counts, updateFilters, resetFilters, reload } =
    catalogState;

  return (
    <>
      <HeroSection />

      {/* CATALOG SECTION */}
      <section
        id="catalog"
        className="scroll-mt-20 py-20 md:py-28 max-w-page mx-auto px-4 sm:px-6 w-full flex flex-col gap-10"
      >
        <div className="flex flex-col gap-3">
          <span className="text-caption font-semibold text-primary uppercase tracking-wider">
            Витрина программ
          </span>
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <h2 className="font-display text-h2 font-bold text-ink leading-tight">
              Каталог образовательных продуктов
            </h2>
            <span aria-live="polite" aria-atomic="true" className="text-caption text-ink-muted">
              Найдено программ: <strong className="text-ink">{products.length}</strong>
            </span>
          </div>
          <p className="text-body text-ink-muted max-w-2xl leading-relaxed">
            Выберите курс для системного роста, воркшоп для освоения точечного навыка или запишитесь
            на персональную консультацию.
          </p>
        </div>

        <CatalogFilters
          filters={filters}
          onFilterChange={updateFilters}
          onReset={resetFilters}
          counts={counts}
        />

        <CatalogList
          products={products}
          isLoading={isLoading}
          error={error}
          onOpenDetails={onOpenDetails}
          onCheckout={onCheckout}
          onResetFilters={resetFilters}
          onRetry={reload}
        />
      </section>

      <BenefitsSection />
      <ProcessSection />
      <ReviewsSection />
      <FaqSection />
    </>
  );
}
