import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    minify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion':   ['framer-motion'],
          'vendor-helmet':   ['react-helmet-async'],
          'vendor-lucide':   ['lucide-react'],
          'data-blog-en':    ['./src/data/blogPosts.js'],
          'data-blog-bn':    ['./src/data/blogPostsBn.js'],
        },
      },
    },
  },
})
