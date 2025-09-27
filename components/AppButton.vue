<template>
  <button
    :class="[
      'px-6 py-2 font-semibold rounded-md transition-all duration-300 focus:outline-none',
      'transform hover:scale-105',
      variantClasses
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary
  },
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-secondary text-dark-bg hover:shadow-glow-secondary';
    default:
      return 'bg-primary text-white hover:shadow-glow-primary';
  }
});
</script>