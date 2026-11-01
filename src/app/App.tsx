import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import type { Product } from '@/shared/api';
import { useCatalog } from '@/features/catalog';
import { ProductDetailsModal } from '@/features/catalog/ProductDetailsModal';
import { CheckoutModal } from '@/features/checkout';
import { AccountModal } from '@/features/account';
import { AuthProvider, useAuthContext } from './AuthContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { JsonLd } from './JsonLd';
import { ScrollManager } from './ScrollManager';
import { HomePage } from './pages/HomePage';
import { OfertaPage } from './pages/OfertaPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

function MainLayout() {
  const { user } = useAuthContext();
  const catalogState = useCatalog();

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
      <ScrollManager />
      <JsonLd products={catalogState.products} />

      <Navbar onOpenAccount={handleOpenAccount} userEmail={user?.email} />

      <main id="main" tabIndex={-1} className="flex-1 flex flex-col outline-none">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                catalogState={catalogState}
                onOpenDetails={handleOpenDetails}
                onCheckout={handleOpenCheckout}
              />
            }
          />
          <Route path="/oferta" element={<OfertaPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
