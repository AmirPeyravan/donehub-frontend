<script setup lang="ts">
const { register, loading } = useAuth()
const { error: notifError, success } = useNotification()

const form = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

const errors = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

const passwordStrength = computed(() => {
  const pwd = form.password
  if (!pwd) return { level: 0, text: '', color: '' }
  
  let strength = 0
  if (pwd.length >= 6) strength++
  if (pwd.length >= 10) strength++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
  if (/\d/.test(pwd)) strength++
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++
  
  const levels = [
    { level: 0, text: '', color: '' },
    { level: 1, text: 'Weak', color: 'text-error' },
    { level: 2, text: 'Fair', color: 'text-warning' },
    { level: 3, text: 'Good', color: 'text-blue-500' },
    { level: 4, text: 'Strong', color: 'text-success' },
    { level: 5, text: 'Very Strong', color: 'text-success' }
  ]
  
  return levels[strength]
})

const validate = () => {
  let isValid = true
  
  errors.username = ''
  errors.password = ''
  errors.passwordConfirm = ''
  
  if (!form.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  } else if (form.username.length > 255) {
    errors.username = 'Username must be less than 255 characters'
    isValid = false
  }
  
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  if (!form.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password'
    isValid = false
  } else if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return
  
  const result = await register({
    username: form.username,
    password: form.password
  })
  
  if (result.success) {
    success(result.message)
  } else {
    notifError(result.message)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-text-primary mb-2">Register</h2>
      <p class="text-text-secondary text-sm">Create a new account</p>
    </div>
    
    <BaseInput
      v-model="form.username"
      label="Username"
      placeholder="Choose a username"
      :error="errors.username"
      required
      maxlength="255"
    />
    
    <div>
      <BaseInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Choose a strong password"
        :error="errors.password"
        required
      />
      <p v-if="form.password && !errors.password" :class="['text-xs mt-1', passwordStrength.color]">
        Strength: {{ passwordStrength.text }}
      </p>
    </div>
    
    <BaseInput
      v-model="form.passwordConfirm"
      type="password"
      label="Confirm Password"
      placeholder="Re-enter your password"
      :error="errors.passwordConfirm"
      required
    />
    
    <BaseButton
      type="submit"
      :loading="loading"
      :disabled="loading"
      full-width
    >
      {{ loading ? 'Creating account...' : 'Register' }}
    </BaseButton>
    
    <p class="text-center text-sm text-text-muted">
      Already have an account?
      <NuxtLink to="/login" class="text-primary hover:text-primary-hover font-medium">
        Login here
      </NuxtLink>
    </p>
  </form>
</template>