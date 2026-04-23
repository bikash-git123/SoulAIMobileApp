import { storage } from '@/utils/storage';
import { API_BASE_URL } from '@/constants/Config';

interface RequestOptions extends RequestInit {
  body?: any;
}

export const apiClient = {
  async fetch(endpoint: string, options: RequestOptions = {}) {
    const token = await storage.getToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    if (options.body && typeof options.body !== "string") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (response.status === 401) {
        await storage.removeToken();
        // Optional: You could use a global state or event emitter to trigger a redirect
        // For now, clearing the token is the primary action.
      }

      return response;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  },

  async get(endpoint: string, options: RequestOptions = {}) {
    return this.fetch(endpoint, { ...options, method: "GET" });
  },

  async post(endpoint: string, body: any, options: RequestOptions = {}) {
    return this.fetch(endpoint, { ...options, method: "POST", body });
  },

  async patch(endpoint: string, body: any, options: RequestOptions = {}) {
    return this.fetch(endpoint, { ...options, method: "PATCH", body });
  },

  async delete(endpoint: string, options: RequestOptions = {}) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  },
};
