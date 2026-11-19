import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('scheduler')
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
  },
});
