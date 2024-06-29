import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import lightningcss from 'vite-plugin-lightningcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), lightningcss()],
  server: {
    port: 3000,
  },
  build: {
    outDir: './abc', // 빌드 결과물 폴더명 변경
    cssCodeSplit: true,
    sourcemap: true, // 프로덕션 소스 맵을 생성
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: () => 'index.js', // 모든 코드를 하나의 파일로
      },
    },
  },
  esbuild: {
    target: 'es2020',
  },
})
