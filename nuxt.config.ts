// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  devtools: { 
    enabled: true 
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
    // '@pinia-plugin-persistedstate/nuxt' has been removed and is now configured as a plugin
  ],

  css: ['~/assets/css/main.css'],

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  },

  app: {
    head: {
      title: 'Auth App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Authentication System' }
      ]
    }
  },

  tailwindcss: {
    // cssPath has been removed to avoid conflicts. The global CSS is loaded above.
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  typescript: {
    strict: false,
    shim: false,
    typeCheck: false // Disabled to speed up dev server startup
  },

  imports: {
    dirs: ['stores']
  }
})