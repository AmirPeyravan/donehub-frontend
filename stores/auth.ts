import { defineStore } from 'pinia'
import type { User, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '~/types/auth'

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
  },

  actions: {
    // This action handles both login and register responses
    private setAuth(user: User, token: string) {
      this.user = user
      this.token = token
    },

    async register(credentials: RegisterRequest) {
      const response = await useApiFetch<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: credentials,
      })
      if (response.token && response.user) {
        this.setAuth(response.user, response.token)
      }
      return response
    },

    async login(credentials: LoginRequest) {
      const response = await useApiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: credentials,
      })
      if (response.token && response.user) {
        this.setAuth(response.user, response.token)
      }
      return response
    },

    async logout() {
      if (this.token) {
        try {
          await useApiFetch('/auth/logout', { method: 'POST' })
        } catch (error) {
          console.error('Failed to logout from server, clearing client state anyway.', error)
        }
      }
      this.clearAuth()
      if (process.client) {
        await navigateTo('/login')
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
    },
  },

  // Enable persistence for this store
  persist: true,
})