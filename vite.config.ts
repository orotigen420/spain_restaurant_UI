import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Sassに src ディレクトリを基準にパスを探させる設定
        loadPaths: ['src']
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      '.loca.lt', // localtunnelのURLを許可
      // ngrokのURLを許可
      '.ngrok-free.app',
      '.ngrok-free.dev'
    ],
  }
})
