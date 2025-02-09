import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will forward requests starting with /auth to your backend server
      '/auth': {
        target: 'http://localhost:8000', // Your backend URL
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, ''), // Optional: Rewrite the path if needed
      },
    },
  },
})
