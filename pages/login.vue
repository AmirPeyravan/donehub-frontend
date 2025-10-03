<script setup lang="ts">
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
  <div>
    <LoginForm />
  </div>
</template>