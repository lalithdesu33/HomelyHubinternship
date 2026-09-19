import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api':{
        target: 'https://homelyhubinternship-9w4x.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})