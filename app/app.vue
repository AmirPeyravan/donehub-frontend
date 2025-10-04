<script setup lang="ts">
import { onMounted } from 'vue'
// از مسیر نسبی مستقیم استفاده کن
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth?.()
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
