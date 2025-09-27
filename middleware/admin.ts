import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // This middleware should run after the 'auth' middleware,
  // so we can assume the user is logged in.
  if (!authStore.isAdmin) {
    // If the user is not an admin, redirect them away.
    // Redirecting to their profile page is a safe default.
    return navigateTo('/profile')
  }
})