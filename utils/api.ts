import { storage } from "@/utils/storage";
import { API_BASE_URL } from "@/constants/Config";

interface RequestOptions extends RequestInit {
  body?: any;
}

export const apiClient = {
  async fetch(endpoint: string, options: RequestOptions = {}) {
    const token = await storage.getToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
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
      const fullUrl = `${API_BASE_URL}${endpoint}`;
      console.log(`[NETWORK REQUEST] ${config.method || "GET"} ${fullUrl}`, {
        headers: config.headers,
        body: options.body,
      });

      const response = await fetch(fullUrl, config);
      const clonedResponse = response.clone();

      try {
        const responseData = await clonedResponse.json();
        console.log(`[NETWORK RESPONSE] ${response.status} ${fullUrl}`, responseData);
      } catch (e) {
        console.log(`[NETWORK RESPONSE] ${response.status} ${fullUrl} (Non-JSON or Empty)`);
      }

      if (response.status === 401) {
        await storage.removeToken();
      }

      return response;
    } catch (error) {
      console.error("[NETWORK ERROR] API Fetch Error:", error);
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

  async put(endpoint: string, body: any, options: RequestOptions = {}) {
    return this.fetch(endpoint, { ...options, method: "PUT", body });
  },

  async delete(endpoint: string, options: RequestOptions = {}) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  },
};
