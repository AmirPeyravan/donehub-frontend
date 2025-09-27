// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt' // اضافه کردن Pinia
  ],

  tailwindcss: {
    cssPath: '@/assets/css/main.css',
  },

  // Proxy configuration to forward /api requests to the backend
  routeRules: {
    '/api/**': {
      // Replace with your actual backend URL
      proxy: 'http://localhost:8000/api/**',
    },
  },

  // This is needed to make the proxy work on the server side
  nitro: {
    devProxy: {
      '/api/**': {
        target: 'http://localhost:8000/api/**',
        changeOrigin: true,
      },
    },
  },
})