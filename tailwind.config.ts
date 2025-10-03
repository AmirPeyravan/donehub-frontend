import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // رنگ‌های سفارشی پروژه
        background: '#fefae0',
        surface: '#f8f9fa',
        primary: '#e07a5f',
        'primary-hover': '#d06a4f',
        'primary-active': '#c05a3f',
        
        // رنگ‌های نوتیفیکیشن
        success: '#10b981',
        'success-light': '#d1fae5',
        error: '#ef4444',
        'error-light': '#fee2e2',
        warning: '#f59e0b',
        'warning-light': '#fef3c7',
        
        // رنگ‌های متنی
        'text-primary': '#1f2937',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
        
        // رنگ‌های border
        'border-light': '#e5e7eb',
        'border-medium': '#d1d5db',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'base': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
        'shake': 'shake 0.3s ease-in-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}