// A flag to prevent multiple parallel refresh attempts
let isRefreshing = false

// Create a custom $fetch wrapper
export const useApi = $fetch.create({
  baseURL: '/api',

  // Interceptor to automatically add the Authorization header
  onRequest({ options }) {
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
          const { access_token, refresh_token } = await $fetch<{access_token: string, refresh_token: string}>('/auth/refresh', {
            baseURL: '/api',
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
          return $fetch(request, options);

        } catch (e) {
          // If the refresh fails, logout the user completely
          authStore.logout()
          if (typeof window !== 'undefined') {
            await navigateTo('/auth/login')
          }
          return Promise.reject(e);
        } finally {
          isRefreshing = false
        }
      } else {
        // If a refresh is already in progress, let the request fail
        return Promise.reject(response)
      }
    }
  }
})