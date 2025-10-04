<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useNotification } from '~/composables/useNotification'

const authStore = useAuthStore()
const { success, error: notifError } = useNotification()
const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

// Use useAsyncData to handle the login process
const { execute: handleLogin, pending, error } = useAsyncData(
  'login',
  async () => {
    // Clear previous errors
    error.value = null

    // Call the store action
    await authStore.login({
      username: form.username,
      password: form.password
    })
  },
  {
    immediate: false, // Don't run on component mount
    watch: [], // Don't re-run when dependencies change
  }
)

const handleSubmit = async () => {
  await handleLogin()

  // Check for errors from the API call
  if (error.value) {
    const errorMessage = error.value.data?.message || 'An unknown error occurred.'
    notifError(errorMessage)
  } else if (authStore.isAuthenticated) {
    success('Login successful! Redirecting...')
    await router.push('/')
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
      required
      maxlength="255"
      autocomplete="username"
    />
    
    <BaseInput
      v-model="form.password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      required
      autocomplete="current-password"
    />
    
    <BaseButton
      type="submit"
      :loading="pending"
      :disabled="pending"
      full-width
    >
      {{ pending ? 'Logging in...' : 'Login' }}
    </BaseButton>
    
    <p class="text-center text-sm text-text-muted">
      Don't have an account?
      <NuxtLink to="/register" class="text-primary hover:text-primary-hover font-medium">
        Register here
      </NuxtLink>
    </p>
  </form>
</template>