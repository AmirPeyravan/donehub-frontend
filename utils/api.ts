import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from '~/types/auth'

class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    const config = useRuntimeConfig()
    
    this.axiosInstance = axios.create({
      baseURL: config.public.apiBase,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request Interceptor - اضافه کردن توکن به هدرها
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response Interceptor - مدیریت خطاها
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // توکن منقضی شده - لاگ‌اوت خودکار
          this.removeToken()
          if (process.client) {
            await navigateTo('/login')
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private getToken(): string | null {
    if (process.client) {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  private removeToken(): void {
    if (process.client) {
      localStorage.removeItem('auth_token')
    }
  }

  // Generic Request Method
  async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance({
        method,
        url,
        data,
      })

      return {
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          error: error.response.data,
          status: error.response.status,
        }
      }
      
      return {
        error: {
          message: 'Network error occurred',
        },
        status: 500,
      }
    }
  }

  // Convenience Methods
  get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>('get', url)
  }

  post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('post', url, data)
  }

  put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('put', url, data)
  }

  patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('patch', url, data)
  }

  delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>('delete', url)
  }
}

// Export singleton instance
export const api = new ApiService()