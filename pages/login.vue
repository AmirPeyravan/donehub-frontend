<script setup lang="ts">
import LoginForm from '~/components/forms/LoginForm.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: 'Login - Auth App',
  meta: [
    { name: 'description', content: 'Login to your account' }
  ]
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <LoginForm />
  </div>
</template>
