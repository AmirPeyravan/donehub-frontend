import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  // On initial client-side load, try to restore the session.
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (accessToken && refreshToken) {
    // Set tokens in the store so subsequent API calls are authenticated.
    authStore.setTokens(accessToken, refreshToken)

    try {
      // Fetch the user profile to validate the token and get user data.
      const user = await $fetch('/auth/user', {
        baseURL: '/api',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      
      // Check if user data is valid
      if (user && typeof user === 'object' && 'id' in user) {
        authStore.setUser(user as any)
      } else {
        // If user fetch fails (e.g., token expired and refresh failed), logout.
        authStore.logout()
      }
    } catch (error) {
      // Also logout on any error during the initial user fetch.
      console.error('Failed to restore session:', error)
      authStore.logout()
    }
  }
})