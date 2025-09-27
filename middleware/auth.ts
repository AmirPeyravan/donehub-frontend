import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn) {
    // If the user is not logged in, redirect to the login page.
    // We also include a `redirect` query parameter to send them back
    // to the originally requested page after they log in.
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})