<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-lg text-dark-gray">Redirecting...</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  middleware: [
    function (to, from) {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        return navigateTo('/profile', { replace: true });
      } else {
        return navigateTo('/auth/login', { replace: true });
      }
    }
  ]
});
</script>