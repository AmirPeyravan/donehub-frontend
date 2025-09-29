import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (accessToken && refreshToken) {
    authStore.setTokens(accessToken, refreshToken)

    try {
      const user = await $fetch('/v1/auth/user', {
        baseURL: '/api',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      
      if (user && typeof user === 'object' && 'id' in user) {
        authStore.setUser(user as any)
      } else {
        authStore.logout()
      }
    } catch (error) {
      console.error('Failed to restore session:', error)
      authStore.logout()
    }
  }
})