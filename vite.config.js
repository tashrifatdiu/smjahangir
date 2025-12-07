import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/auth': 'http://localhost:5002',
      '/journal': 'http://localhost:5002',
      '/contact': 'http://localhost:5002',
      '/team-member': 'http://localhost:5002',
      '/notice': 'http://localhost:5002',
      '/task': 'http://localhost:5002',
      '/event': 'http://localhost:5002',
      '/attendance': 'http://localhost:5002'
    }
  }
})
