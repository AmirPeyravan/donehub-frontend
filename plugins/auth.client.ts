import { useAuthStore, type User } from '~/stores/auth';

export default defineNuxtPlugin({
  name: 'auth-rehydration',
  async setup() {
    const authStore = useAuthStore();

    // Skip rehydration if already authenticated (e.g., during SSR or CSR navigation)
    if (authStore.isLoggedIn) {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      // Immediately set tokens to avoid race conditions
      authStore.setTokens(accessToken, refreshToken);

      try {
        // Fetch user data to confirm token validity and rehydrate user state
        const user = await useApi<User>('/auth/user');
        authStore.setUser(user);
      } catch (error) {
        console.error('Session restore failed:', error);
        // If fetching user fails, the token is likely expired or invalid.
        // The `useApi` interceptor will handle token refresh or logout.
        authStore.logout();
      }
    }
  }
});