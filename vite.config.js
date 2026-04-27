import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-ecommerce-website-zc26.onrender.com'
      },
      '/images': {
        target: 'https://backend-ecommerce-website-zc26.onrender.com'
      }
    }
  }
})
