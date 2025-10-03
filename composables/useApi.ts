import { api } from '~/utils/api'
import type { ApiResponse } from '~/types/auth'

export const useApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const request = async <T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.request<T>(method, url, data)
      
      if (response.error) {
        error.value = response.error.message
      }
      
      return response
    } catch (err) {
      error.value = 'An unexpected error occurred'
      return {
        error: { message: error.value },
        status: 500
      }
    } finally {
      loading.value = false
    }
  }

  const get = <T>(url: string) => request<T>('get', url)
  const post = <T>(url: string, data?: any) => request<T>('post', url, data)
  const put = <T>(url: string, data?: any) => request<T>('put', url, data)
  const patch = <T>(url: string, data?: any) => request<T>('patch', url, data)
  const del = <T>(url: string) => request<T>('delete', url)

  return {
    loading: readonly(loading),
    error: readonly(error),
    get,
    post,
    put,
    patch,
    delete: del
  }
}