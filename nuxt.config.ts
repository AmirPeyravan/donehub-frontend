export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      {
        code: 'fa',
        iso: 'fa-IR',
        name: 'فارسی',
        dir: 'rtl'
      }
    ],
    defaultLocale: 'fa',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts' // a path to the vue-i18n config file
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
      },
    },
  },

  typescript: {
    typeCheck: true
  },

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