import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: (content, filename) => {
          // _functions.scss自身には自動挿入しないように(無限ループ防止)
          if (filename.includes('_functions.scss')) {
            return content;
          }
          return `@use "styles/functions" as *;\n${content}`;
        },
        // Sassに src ディレクトリを基準にパスを探させる設定
        loadPaths: ['src']
      }
    }
  }
})
