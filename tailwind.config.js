/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0D1117',
        'primary': '#00A9FF',
        'secondary': '#39FF14',
        'light-gray': '#C9D1D9',
        'dark-gray': '#8B949E',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(0, 169, 255, 0.8)',
        'glow-secondary': '0 0 15px rgba(57, 255, 20, 0.8)',
      }
    },
  },
  plugins: [],
}