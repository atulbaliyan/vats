import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vats/',
  plugins: [
    react(),
    {
      name: 'preview-redirect-to-base',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && !req.url.startsWith('/vats')) {
            const redirectUrl = `/vats${req.url.startsWith('/') ? req.url : `/${req.url}`}`;
            res.writeHead(302, { Location: redirectUrl });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('scheduler') ||
              id.includes('@radix-ui')
            ) {
              return 'vendor-react';
            }
            if (id.includes('gsap') || id.includes('lenis') || id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react') || id.includes('zustand')) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  // @ts-expect-error - vitest configuration
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/test/**/*.test.{ts,tsx}'],
  },
});
