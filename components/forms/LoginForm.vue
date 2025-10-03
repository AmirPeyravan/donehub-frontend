<script setup lang="ts">
const { login, loading } = useAuth()
const { error: notifError, success } = useNotification()

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const validate = () => {
  let isValid = true
  
  errors.username = ''
  errors.password = ''
  
  if (!form.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  }
  
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return
  
  const result = await login({
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
      <h2 class="text-2xl font-bold text-text-primary mb-2">Login</h2>
      <p class="text-text-secondary text-sm">Enter your credentials to continue</p>
    </div>
    
    <BaseInput
      v-model="form.username"
      label="Username"
      placeholder="Enter your username"
      :error="errors.username"
      required
      maxlength="255"
    />
    
    <BaseInput
      v-model="form.password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      :error="errors.password"
      required
    />
    
    <BaseButton
      type="submit"
      :loading="loading"
      :disabled="loading"
      full-width
    >
      {{ loading ? 'Logging in...' : 'Login' }}
    </BaseButton>
    
    <p class="text-center text-sm text-text-muted">
      Don't have an account?
      <NuxtLink to="/register" class="text-primary hover:text-primary-hover font-medium">
        Register here
      </NuxtLink>
    </p>
  </form>
</template>