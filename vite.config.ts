import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

// Plugin to ensure 404.html exists for static hosting (GitHub Pages SPA fallback)
function spa404Plugin() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const distDir = fileURLToPath(new URL('./dist', import.meta.url));
      const indexPath = path.join(distDir, 'index.html');
      const fallbackPath = path.join(distDir, '404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spa404Plugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
