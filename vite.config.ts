import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // ignore editor backup/history folders that may contain stale syntax
      ignored: ['**/.history/**', '**/.git/**', '**/node_modules/**'],
    },
  },
})
