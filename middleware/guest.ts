export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  authStore.initializeAuth()
  
  // If user is authenticated, redirect to home
  if (authStore.isAuthenticated) {
    return navigateTo('/')
  }
})