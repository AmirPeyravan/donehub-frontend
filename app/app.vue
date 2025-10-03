<script setup lang="ts">
// Initialize auth on app mount
const authStore = useAuthStore()
onMounted(() => {
  authStore.initializeAuth()
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>