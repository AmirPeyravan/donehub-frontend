// User Interface
export interface User {
  id: number
  username: string
  created_at: string
}

// Auth Request Interfaces
export interface RegisterRequest {
  username: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

// Auth Response Interfaces
export interface RegisterResponse {
  message: string
  user: User
}

export interface LoginResponse {
  message: string
  user: User
  token: string
}

// Error Response Interface
export interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

// API Response Wrapper
export interface ApiResponse<T = any> {
  data?: T
  error?: ErrorResponse
  status: number
}

// Notification Types
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}