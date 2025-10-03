<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: 'Register - Auth App',
  meta: [
    { name: 'description', content: 'Create a new account' }
  ]
})
</script>

<template>
  <div>
    <RegisterForm />
  </div>
</template>