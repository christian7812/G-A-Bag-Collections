import { AuthProvider } from '@refinedev/core';

const ADMIN_STORAGE_KEY = 'ga_admin_auth_user';

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Certified credentials: admin@pinkaura.com / pinkaura2026
    if (email === 'admin@pinkaura.com' && password === 'pinkaura2026') {
      const user = {
        name: 'G&A Boutique Manager',
        email,
        role: 'Administrator',
        token: `ga-admin-token-${Date.now()}`,
      };
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid administrator email or password. Use admin@pinkaura.com / pinkaura2026',
      },
    };
  },

  logout: async () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },

  check: async () => {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
      logout: true,
    };
  },

  onError: async (error) => {
    console.error('Refine Auth Error:', error);
    return { error };
  },

  getIdentity: async () => {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    return null;
  },
};
