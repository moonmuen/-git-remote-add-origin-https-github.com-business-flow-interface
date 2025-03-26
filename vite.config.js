import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 获取仓库名称，用于GitHub Pages部署
// 如果是本地开发，base为'/'
// 如果是GitHub Pages部署，base为'/仓库名/'
const base = process.env.NODE_ENV === 'production' ? '/business-flow-interface/' : '/'

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