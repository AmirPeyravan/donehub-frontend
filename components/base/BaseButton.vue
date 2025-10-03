<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  fullWidth: false
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active focus:ring-primary/30 shadow-soft hover:shadow-medium',
    secondary: 'bg-surface text-text-primary border border-border-medium hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-300',
    ghost: 'text-primary hover:bg-primary/10 active:bg-primary/20 focus:ring-primary/20',
    danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 focus:ring-error/30 shadow-soft hover:shadow-medium'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${width}`
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>