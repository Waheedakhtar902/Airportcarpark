import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { fileURLToPath, URL } from 'node:url';
import { parkingApiPlugin } from './server/parkingApi';

export default defineConfig(({ mode }) => {
  // Loads every variable from .env (not just VITE_*). These stay on the server:
  // only VITE_-prefixed variables are ever exposed to browser code.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      // Server-side proxy that adds the Quick Access Parking API key. See server/parkingApi.ts.
      parkingApiPlugin({
        apiBase: env.QAP_API_BASE || 'https://quickaccessparking.co.uk/api/v1.0',
        apiKey: env.QAP_API_KEY || '',
      }),
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
    server: { port: 5173, strictPort: true, host: '127.0.0.1' },
    preview: { port: 4173, strictPort: true, host: '127.0.0.1' },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
    },
  };
});
