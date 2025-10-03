import { defineStore } from 'pinia'
import type { User, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '~/types/auth'
import { api } from '~/utils/api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    getUser: (state): User | null => state.user,
    isLoggedIn: (state): boolean => state.isAuthenticated,
    isLoading: (state): boolean => state.loading,
  },

  actions: {
    // بارگذاری توکن از localStorage هنگام شروع اپلیکیشن
    initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth_token')
        const userStr = localStorage.getItem('auth_user')
        
        if (token && userStr) {
          try {
            this.token = token
            this.user = JSON.parse(userStr)
            this.isAuthenticated = true
          } catch (error) {
            this.clearAuth()
          }
        }
      }
    },

    // ثبت‌نام کاربر جدید
    async register(credentials: RegisterRequest): Promise<{ success: boolean; message: string }> {
      this.loading = true
      
      try {
        const response = await api.post<RegisterResponse>('/auth/register', credentials)
        
        if (response.error) {
          return {
            success: false,
            message: response.error.message || 'Registration failed',
          }
        }

        return {
          success: true,
          message: response.data?.message || 'Registration successful',
        }
      } catch (error) {
        return {
          success: false,
          message: 'An unexpected error occurred',
        }
      } finally {
        this.loading = false
      }
    },

    // ورود کاربر
    async login(credentials: LoginRequest): Promise<{ success: boolean; message: string }> {
      this.loading = true
      
      try {
        const response = await api.post<LoginResponse>('/auth/login', credentials)
        
        if (response.error) {
          return {
            success: false,
            message: response.error.message || 'Login failed',
          }
        }

        if (response.data) {
          this.setAuth(response.data.user, response.data.token)
          return {
            success: true,
            message: response.data.message || 'Login successful',
          }
        }

        return {
          success: false,
          message: 'Invalid response from server',
        }
      } catch (error) {
        return {
          success: false,
          message: 'An unexpected error occurred',
        }
      } finally {
        this.loading = false
      }
    },

    // خروج کاربر
    async logout() {
      this.clearAuth()
      await navigateTo('/login')
    },

    // ذخیره اطلاعات احراز هویت
    setAuth(user: User, token: string) {
      this.user = user
      this.token = token
      this.isAuthenticated = true

      if (process.client) {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
      }
    },

    // پاک کردن اطلاعات احراز هویت
    clearAuth() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    },
  },
})