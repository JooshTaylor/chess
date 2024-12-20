import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/gameHub': {
        target: 'https://localhost:3000',
        ws: true,
        secure: false,
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, '../wwwroot'),
    emptyOutDir: true,
  },
})