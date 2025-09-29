import { defineStore } from 'pinia'

// Define proper types based on the API documentation
export interface Role {
  id: number;
  name: string;
  display_name: string;
}

export interface Permission {
  id: number;
  name: string;
  display_name: string;
  group: string;
}

export interface User {
  id: number;
  name: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  has_password: boolean;
  roles: Role[];
  permissions: Permission[];
}

export const useAuthStore = defineStore('auth', {
  // STATE: Initial state must be the same on server and client.
  // We will restore the session from localStorage in a client-side plugin.
  state: () => ({
    user: null as User | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.accessToken && !!state.user,

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
    },

    /**
     * Check if user has a specific permission
     */
    hasPermission: (state) => (permission: string): boolean => {
      if (!state.user) return false;
      if (state.user.is_admin) return true; // Admins have all permissions
      return state.user.permissions?.some(p => p.name === permission) ?? false;
    },

    /**
     * Check if user has a specific role
     */
    hasRole: (state) => (roleName: string): boolean => {
      if (!state.user) return false;
      return state.user.roles?.some(role => role.name === roleName) ?? false;
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