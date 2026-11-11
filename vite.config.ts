import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyUI',
      fileName: (format) => `my-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'my-ui.css'
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
