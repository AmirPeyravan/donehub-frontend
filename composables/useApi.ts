import { ofetch } from 'ofetch'
import { useAuthStore } from '~/store/auth'

// A flag to prevent multiple parallel refresh attempts
let isRefreshing = false

// Create a custom ofetch instance
const apiFetch = ofetch.create({
  baseURL: '/api',

  // Interceptor to automatically add the Authorization header
  async onRequest({ options }) {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${authStore.accessToken}`)
    }
  },

  // Interceptor to handle 401 errors and refresh the token
  async onResponseError({ request, response, options }) {
    const authStore = useAuthStore()

    // Only handle 401 errors, not for the refresh endpoint itself, and only if a refresh token exists
    if (response.status === 401 && !request.toString().endsWith('/refresh') && authStore.refreshToken) {

      if (!isRefreshing) {
        isRefreshing = true
        try {
          // Attempt to refresh the token
          const { access_token, refresh_token } = await ofetch<{access_token: string, refresh_token: string}>('/auth/refresh', {
            baseURL: '/api', // Ensure baseURL is correctly set for this direct call
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authStore.refreshToken}`
            }
          })

          // Update the store with the new tokens
          authStore.setTokens(access_token, refresh_token)

          // Update the headers of the original failed request
          const newHeaders = new Headers(options.headers);
          newHeaders.set('Authorization', `Bearer ${access_token}`);
          options.headers = newHeaders;

          // Retry the original request with the new token
          // This will transparently resolve the original promise
          return ofetch(request, options);

        } catch (e) {
          // If the refresh fails, logout the user completely
          authStore.logout()
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login'; // Force a full page redirect
          }
          return Promise.reject(e);
        } finally {
          isRefreshing = false
        }
      } else {
        // If a refresh is already in progress, you would ideally queue the request.
        // For this simplified but robust implementation, we let the request fail,
        // and a subsequent user action will benefit from the new token.
        return Promise.reject(response)
      }
    }
  }
})

// The new composable simply exports the customized fetch instance
export const useApi = apiFetch;