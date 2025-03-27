import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 对于Vercel部署，base应该是'/'
const base = '/'

export default defineConfig({
  plugins: [vue()],
  base: base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3008,
    open: true
  }
}) 