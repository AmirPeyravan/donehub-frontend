import type { NitroFetchOptions } from 'nitropack'
import { useAuthStore } from '~/stores/auth'

let isRefreshing = false

export const useApi = $fetch.create({
  baseURL: '/api',

  onRequest({ options }) {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${authStore.accessToken}`)
    }
  },

  async onResponseError({ request, response, options }) {
    const authStore = useAuthStore()

    if (response.status === 401 && !request.toString().endsWith('/refresh') && authStore.refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const { access_token, refresh_token } = await $fetch<{ access_token: string; refresh_token: string }>('/auth/refresh', {
            baseURL: '/api',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authStore.refreshToken}`
            }
          })

          authStore.setTokens(access_token, refresh_token)

          const newOptions: NitroFetchOptions<string> = {
            ...options,
            headers: new Headers(options.headers),
            method: options.method as
              | 'get' | 'post' | 'put' | 'delete'
              | 'patch' | 'head' | 'options'
              | undefined
          }
          ;(newOptions.headers as Headers).set('Authorization', `Bearer ${access_token}`)

          return $fetch(request as string, newOptions)

        } catch (e) {
          authStore.logout()
          if (typeof window !== 'undefined') {
            await navigateTo('/auth/login')
          }
          return Promise.reject(e)
        } finally {
          isRefreshing = false
        }
      } else {
        return Promise.reject(response)
      }
    }
  }
})
