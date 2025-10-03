<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel'
  label?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const inputClasses = computed(() => {
  const base = 'w-full px-4 py-3 bg-surface border rounded-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-200'
  const errorClass = props.error 
    ? 'border-error focus:border-error focus:ring-error/20' 
    : 'border-border-light focus:border-primary focus:ring-primary/20'
  
  return `${base} ${errorClass}`
})
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-medium text-text-primary mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-0.5">*</span>
    </label>
    
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :maxlength="maxlength"
      :class="inputClasses"
    >
    
    <div v-if="error || maxlength" class="mt-1.5 flex justify-between items-center">
      <p v-if="error" class="text-sm text-error">
        {{ error }}
      </p>
      <p v-if="maxlength" class="text-xs text-text-muted ml-auto">
        {{ String(modelValue).length }}/{{ maxlength }}
      </p>
    </div>
  </div>
</template>