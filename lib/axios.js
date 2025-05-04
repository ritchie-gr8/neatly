import axios from "axios";
import Router from "next/router";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Only handle auth errors for API requests, not page transitions
    // This prevents conflicts with Next.js middleware redirects
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // For API requests during a page session, we need to update the client-side auth state
      // Rather than redirecting directly (which Next.js middleware already does)

      // If we're in the browser, dispatch an event to notify the auth context
      if (typeof window !== 'undefined') {
        // Create a custom event that AuthContext can listen for
        window.dispatchEvent(new CustomEvent('auth:expired'));

        // Only redirect programmatically if we're making an explicit API call
        // (not initial page load which Next.js middleware handles)
        if (!originalRequest.url.includes('/auth/me')) {
          const returnUrl = Router.pathname;
          Router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return { user: null };
      }
      throw error.response?.data || error;
    }
  }
};


export default api;
