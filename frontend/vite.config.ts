import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { fileURLToPath, URL } from 'node:url';

/**
 * The API lives in backend/ (default http://127.0.0.1:4000). In development, Vite forwards /api to it,
 * so the browser only ever talks to this origin. The frontend holds no secrets.
 */
const API_TARGET = process.env.API_PROXY_TARGET || 'http://127.0.0.1:4000';
const apiProxy = { '/api': { target: API_TARGET, changeOrigin: false } };

export default defineConfig({
  plugins: [
    react(),
    // Compresses every raster image and SVG in the build output.
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 78, progressive: true },
      jpg: { quality: 78, progressive: true },
      webp: { quality: 78 },
      avif: { quality: 60 },
      svg: { multipass: true },
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Pre-bundle these together on startup so every dependency shares one React instance.
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'lucide-react', 'dompurify'],
  },
  server: { port: 5173, strictPort: true, host: '127.0.0.1', proxy: apiProxy },
  preview: { port: 4173, strictPort: true, host: '127.0.0.1', proxy: apiProxy },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
});
