import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/tokens.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <div className="min-h-screen bg-surface text-ink flex items-center justify-center p-6">
      <div className="bg-surface-raised border border-border rounded-lg p-8 shadow-card max-w-md text-center">
        <h1 className="font-display text-h2 text-primary font-bold mb-4">
          Каталог образовательных продуктов
        </h1>
        <p className="text-ink-muted text-body leading-relaxed mb-6">
          Vite + React 19 + TypeScript + Tailwind v4
        </p>
        <span className="inline-block bg-accent text-on-accent font-semibold px-4 py-2 rounded-md">
          Готово к разработке
        </span>
      </div>
    </div>
  </StrictMode>
);
