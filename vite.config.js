import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // 确保在腾讯云静态路径下能正确加载 JS/CSS
  build: {
    outDir: 'dist'
  }
})