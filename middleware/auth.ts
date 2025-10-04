import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // With pinia-plugin-persistedstate, the store is automatically hydrated.
  // We just need to check the authentication status.
  if (!authStore.isAuthenticated) {
    // Redirect them to the login page, preserving the intended destination
    return navigateTo('/login', { replace: true, query: { redirect: to.fullPath } })
  }
})