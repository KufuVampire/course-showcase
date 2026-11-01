import { useCallback, useState } from 'react';
import type { Product } from '@/shared/api';
import { CatalogFilters, CatalogList, ProductDetailsModal, useCatalog } from '@/features/catalog';
import { CheckoutModal } from '@/features/checkout';
import { AccountModal } from '@/features/account';
import { AuthProvider, useAuthContext } from './AuthContext';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { BenefitsSection } from './BenefitsSection';
import { ProcessSection } from './ProcessSection';
import { ReviewsSection } from './ReviewsSection';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { JsonLd } from './JsonLd';

function MainLayout() {
  const { user } = useAuthContext();
  const { products, isLoading, error, filters, counts, updateFilters, resetFilters, reload } =
    useCatalog();

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleOpenDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  }, []);

  const handleOpenCheckout = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  }, []);

  const handleOpenAccount = useCallback(() => {
    setIsAccountOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false);
  }, []);

  const handleCloseCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
  }, []);

  const handleCloseAccount = useCallback(() => {
    setIsAccountOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col font-sans transition-colors selection:bg-accent/30 selection:text-ink">
      <JsonLd products={products} />

      <Navbar onOpenAccount={handleOpenAccount} userEmail={user?.email} />

      <main id="main" tabIndex={-1} className="flex-1 flex flex-col outline-none">
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
              Выберите курс для системного роста, воркшоп для освоения точечного навыка или
              запишитесь на персональную консультацию.
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
            onOpenDetails={handleOpenDetails}
            onCheckout={handleOpenCheckout}
            onResetFilters={resetFilters}
            onRetry={reload}
          />
        </section>

        <BenefitsSection />
        <ProcessSection />
        <ReviewsSection />
        <FaqSection />
      </main>

      <Footer />

      {/* MODALS */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        onProceedToCheckout={handleOpenCheckout}
      />

      {isCheckoutOpen && selectedProduct && (
        <CheckoutModal
          key={selectedProduct.id}
          product={selectedProduct}
          isOpen={isCheckoutOpen}
          onClose={handleCloseCheckout}
          onOpenAccount={handleOpenAccount}
        />
      )}

      <AccountModal isOpen={isAccountOpen} onClose={handleCloseAccount} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
