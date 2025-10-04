import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // With pinia-plugin-persistedstate, the store is automatically hydrated.
  // If the user is already logged in, redirect them away from guest pages.
  if (authStore.isAuthenticated) {
    return navigateTo('/', { replace: true })
  }
})