import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import lightningcss from 'vite-plugin-lightningcss'
import svgr from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import mdx from 'vite-plugin-mdx'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // 리액트 지원 플러그인
    tsconfigPaths(), // tsconfig.json의 경로 별칭을 사용할 수 있게 해줍
    lightningcss(), // CSS를 고속으로 처리하고 최적화해주는 플러그인
    svgr(), // SVG파일 React컴포넌트로 직접쓸수 있게 해주는 플러그인
    envCompatible(),
    WindiCSS(), // Tailwind CSS를 빠르게 사용
    VitePWA({
      registerType: 'autoUpdate',
    }), // PWA(Progressive Web App) 기능을 쉽게 추가
    checker({
      typescript: true,
    }), // typescript 오류 확인
    mdx(), // MDX 파일을 React 컴포넌트로 사용할 수 있게 해주는 플러그인
  ],
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
