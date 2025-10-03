export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (!authStore.isAuthenticated) {
    authStore.initializeAuth()
  }
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})