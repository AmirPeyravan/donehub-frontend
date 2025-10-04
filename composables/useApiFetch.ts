import { ofetch } from 'ofetch'
import { useAuthStore } from '~/stores/auth'

export const useApiFetch = <T>(...args: Parameters<typeof ofetch<T>>) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const [url, options] = args

  const defaultOptions: typeof options = {
    baseURL: config.public.apiBase,
    headers: {
      ...options?.headers,
      Accept: 'application/json',
    },

    // افزودن توکن به هدرها
    onRequest({ options }) {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        }
      }
    },

    // مدیریت خطای 401
    async onResponseError({ response }) {
      if (response.status === 401) {
        // توکن نامعتبر یا منقضی شده است
        authStore.clearAuth()
        if (process.client) {
          await navigateTo('/login')
        }
      }
    },
  }

  return ofetch<T>(url, { ...defaultOptions, ...options })
}