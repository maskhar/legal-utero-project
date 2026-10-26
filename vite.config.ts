import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '^/api/merek/search(?:\\?|$)': {
          target: 'https://use.apiindonesia.id',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/merek\/search(?=\?|$)/, '/api/v1/merek/search'),
          headers: { 'x-api-key': env.API_INDONESIA ?? '' },
        },
      },
    },
  }
})
