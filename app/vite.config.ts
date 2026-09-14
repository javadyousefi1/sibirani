import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: false, gzipSize: true, brotliSize: true })],
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name(id: string) {
                if (id.includes('node_modules/react-dom')) return 'react-dom'
                if (id.includes('node_modules/react-router-dom')) return 'react-router-dom'
                if (id.includes('node_modules/@dnd-kit')) return 'dnd-kit'
              },
            },
          ],
        },
      },
    },
  },
})
