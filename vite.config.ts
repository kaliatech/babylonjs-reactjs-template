import { defineConfig } from 'vite'

import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600, // babylonjs ~1500kb, everything else < 800k
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Apply manual chunking for vendor libraries
            if (id.includes('@babylonjs')) {
              return 'vendor_babylonjs'
              // However, if using lazy load imports, allow default vite handling for babylonjs:
              //return
            }
            return 'vendor'
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['@babylonjs/core', '@babylonjs/materials'],
  },
  plugins: [basicSsl(), react()],
  server: {
    port: 5443,
    https: true,
  }
})
