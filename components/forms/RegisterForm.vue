<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useNotification } from '~/composables/useNotification'

const authStore = useAuthStore()
const { success, error: notifError } = useNotification()
const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  passwordConfirm: ''
})

const passwordMatchError = ref('')

// Use useAsyncData to handle the registration process
const { execute: handleRegister, pending, error } = useAsyncData(
  'register',
  async () => {
    // Clear previous errors
    error.value = null
    passwordMatchError.value = ''

    // Client-side check for password match
    if (form.password !== form.passwordConfirm) {
      passwordMatchError.value = 'Passwords do not match'
      // Throw an error to stop the async data process
      throw new Error(passwordMatchError.value)
    }

    // Call the store action
    await authStore.register({
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
  await handleRegister().catch(() => {
    // This catch block handles the client-side password match error
    if (passwordMatchError.value) {
      notifError(passwordMatchError.value)
    }
  })

  // Check for errors from the API call
  if (error.value) {
    const errorMessage = error.value.data?.message || 'An unknown error occurred.'
    notifError(errorMessage)
  } else if (authStore.isAuthenticated) {
    success('Registration successful! Redirecting...')
    await router.push('/')
  }
}

// Keep the password strength indicator as it's good UX
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
      required
      maxlength="255"
      autocomplete="username"
    />
    
    <div>
      <BaseInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Choose a strong password"
        required
        autocomplete="new-password"
      />
      <p v-if="form.password" :class="['text-xs mt-1', passwordStrength.color]">
        Strength: {{ passwordStrength.text }}
      </p>
    </div>
    
    <BaseInput
      v-model="form.passwordConfirm"
      type="password"
      label="Confirm Password"
      placeholder="Re-enter your password"
      :error="passwordMatchError"
      required
      autocomplete="new-password"
    />
    
    <BaseButton
      type="submit"
      :loading="pending"
      :disabled="pending"
      full-width
    >
      {{ pending ? 'Creating account...' : 'Register' }}
    </BaseButton>
    
    <p class="text-center text-sm text-text-muted">
      Already have an account?
      <NuxtLink to="/login" class="text-primary hover:text-primary-hover font-medium">
        Login here
      </NuxtLink>
    </p>
  </form>
</template>