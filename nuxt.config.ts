import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  css: [fileURLToPath(new URL('./assets/css/main.css', import.meta.url))],

  vite: {
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },

  imports: {
    dirs: ['stores']
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
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  },

  typescript: {
    strict: false,
    shim: false,
    typeCheck: false
  }
})
