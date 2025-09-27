import { defineStore } from 'pinia'

// Define proper types based on the API documentation
interface Role {
  id: number;
  name: string;
  display_name: string;
}

interface User {
  id: number;
  name: string;
  username: string | null;
  email: string | null;
  is_admin: boolean;
  roles: Role[];
  // Add other user fields as needed
}

// Helper function to safely get items from localStorage
const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: getFromLocalStorage('accessToken'),
    refreshToken: getFromLocalStorage('refreshToken'),
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken && !!state.user,

    /**
     * Checks if the user is an administrator.
     * A user is considered an admin if the `is_admin` flag from the API is true,
     * or if they have a role with the internal name 'admin'.
     */
    isAdmin: (state): boolean => {
      if (!state.user) {
        return false;
      }
      // Check the explicit boolean flag first for performance.
      if (state.user.is_admin) {
        return true;
      }
      // Fallback to checking the roles array for an 'admin' role.
      return state.user.roles?.some(role => role.name === 'admin') ?? false;
    }
  },

  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    },

    setUser(user: User) {
      this.user = user;
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    },
  },
})