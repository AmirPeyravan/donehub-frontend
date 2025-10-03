<script setup lang="ts">
interface Props {
  elevated?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  elevated: false,
  padding: 'md',
  hoverable: false
})

const cardClasses = computed(() => {
  const base = 'bg-surface rounded-lg transition-shadow duration-200'
  
  const shadow = props.elevated 
    ? 'shadow-medium' 
    : 'shadow-soft'
  
  const hover = props.hoverable 
    ? 'hover:shadow-strong cursor-pointer' 
    : ''
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return `${base} ${shadow} ${hover} ${paddings[props.padding]}`
})
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="mb-4 pb-4 border-b border-border-light">
      <slot name="header" />
    </div>
    
    <div>
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-border-light">
      <slot name="footer" />
    </div>
  </div>
</template>