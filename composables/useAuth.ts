import { useAuthStore } from '~/stores/auth'
import type { LoginRequest, RegisterRequest } from '~/types/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // Initialize auth on mount
  onMounted(() => {
    authStore.initializeAuth()
  })

  const login = async (credentials: LoginRequest) => {
    const result = await authStore.login(credentials)
    
    if (result.success) {
      await router.push('/')
    }
    
    return result
  }

  const register = async (credentials: RegisterRequest) => {
    const result = await authStore.register(credentials)
    
    if (result.success) {
      await router.push('/login')
    }
    
    return result
  }

  const logout = async () => {
    await authStore.logout()
  }

  const checkAuth = () => {
    return authStore.isAuthenticated
  }

  const getUser = () => {
    return authStore.user
  }

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const loading = computed(() => authStore.loading)

  return {
    login,
    register,
    logout,
    checkAuth,
    getUser,
    isAuthenticated,
    user,
    loading
  }
}