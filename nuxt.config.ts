// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Enable experimental features for Nuxt 4
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  // Update proxy configuration for Nuxt 4
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },

  // Add TypeScript configuration
  typescript: {
    typeCheck: true
  },

  // Add app configuration
  app: {
    head: {
      title: 'DoneHub',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})