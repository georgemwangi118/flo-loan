import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  server: {
    // The admin API is PHP; run `npm run dev:api` alongside `npm run dev`.
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
