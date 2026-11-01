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
        className="scroll-mt-20 py-16 md:py-24 max-w-page mx-auto px-4 sm:px-6 w-full flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <span className="text-caption font-medium text-primary">
            Каталог программ
          </span>
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <h2 className="font-display text-h2 font-semibold text-ink leading-tight text-balance">
              Каталог образовательных продуктов
            </h2>
            <span aria-live="polite" aria-atomic="true" className="text-caption font-mono text-ink-muted">
              Найдено: <strong className="text-ink font-mono">{products.length}</strong>
            </span>
          </div>
          <p className="text-body text-ink-muted max-w-2xl leading-relaxed text-pretty">
            Курсы для системного роста, воркшопы для освоения точечного навыка и&nbsp;персональные код-ревью консультации.
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

      {/* VALUE PRINCIPLES */}
      <BenefitsSection />

      {/* LEARNING TIMELINE & QUIZ */}
      <ProcessSection />

      {/* REVIEWS & CASE STUDIES */}
      <ReviewsSection />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
