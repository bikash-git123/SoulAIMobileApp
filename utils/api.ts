import { API_BASE_URL } from "@/constants/Config";
import { ENDPOINTS } from "@/constants/endpoints";
import { storage } from "@/utils/storage";

interface RequestOptions extends RequestInit {
  body?: any;
  _isRetry?: boolean;
}

export interface ApiResult<T = any> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Handles the token refresh logic.
 */
async function handleTokenRefresh(): Promise<string | null> {
  try {
    console.log("🔄 [AUTH] Refreshing access token...");
    const refreshToken = await storage.getRefreshToken();
    if (!refreshToken) {
      console.log("❌ [AUTH] No refresh token found in storage.");
      return null;
    }

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.auth.refresh}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const newAccessToken = data.data.access_token;
      const newRefreshToken = data.data.refresh_token;

      await storage.setAccessToken(newAccessToken);
      if (newRefreshToken) {
        await storage.setRefreshToken(newRefreshToken);
      }

      console.log("✅ [AUTH] Token refreshed successfully.");
      return newAccessToken;
    }

    console.log("❌ [AUTH] Token refresh failed:", data.message || "Unknown error");
    return null;
  } catch (error) {
    console.error("[AUTH] Error refreshing token:", error);
    return null;
  }
}

/**
 * Core fetch function with 401 interceptor and retry logic.
 */
async function fetchApi(endpoint: string, options: RequestOptions = {}): Promise<Response> {
  const token = await storage.getAccessToken();

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

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  const method = config.method || "GET";

  try {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] 🌐 [NETWORK REQUEST] ${method} ${fullUrl}`);
    if (options.body) console.log(`[${timestamp}] 📦 [REQUEST BODY]`, options.body);

    let response = await fetch(fullUrl, config);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      if (!options._isRetry && endpoint !== ENDPOINTS.auth.refresh) {
        console.warn(`⚠️ [AUTH] 401 Unauthorized on ${endpoint}. Attempting token refresh...`);

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = handleTokenRefresh();
        }

        const newToken = await refreshPromise;
        isRefreshing = false;
        refreshPromise = null;

        if (newToken) {
          console.log(`🔁 [AUTH] Retrying ${method} ${endpoint} with new token...`);
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          };

          return fetchApi(endpoint, {
            ...options,
            headers: retryHeaders,
            _isRetry: true,
          });
        }
      }

      console.error(`🔴 [AUTH] Authentication failed for ${endpoint}. Cleaning up session...`);
      await storage.removeAccessToken();
      await storage.removeRefreshToken();
    }

    return response;
  } catch (error) {
    console.error(`🚨 [NETWORK ERROR] ${method} ${fullUrl} failed:`, error);
    throw error;
  }
}

/**
 * Standardized request wrapper to handle try-catch, JSON parsing and response formatting.
 */
async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetchApi(endpoint, options);
    const status = response.status;

    let responseData: any = null;
    try {
      const respTimestamp = new Date().toLocaleTimeString();
      responseData = await response.json();
      console.log(`[${respTimestamp}] 📩 [NETWORK RESPONSE] ${status} ${fullUrl}`, responseData);
    } catch (e) {
      const respTimestamp = new Date().toLocaleTimeString();
      console.log(`[${respTimestamp}] 📩 [NETWORK RESPONSE] ${status} ${fullUrl} (Non-JSON or Empty)`);
    }

    if (response.ok) {
      return {
        success: true,
        data: responseData?.data !== undefined ? responseData.data : responseData,
        message: responseData?.message || "Request successful",
        status,
      };
    } else {
      // Handle error responses (4xx, 5xx)
      const errorMsg =
        responseData?.message ||
        responseData?.detail?.message ||
        responseData?.detail?.[0]?.msg ||
        `Request failed with status ${status}`;

      return {
        success: false,
        data: responseData,
        message: errorMsg,
        status,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message || "An unexpected network error occurred",
      status: 0,
    };
  }
}

/**
 * Public API client object.
 */
export const apiClient = {
  fetch: fetchApi,
  request: request,

  get: <T = any>(endpoint: string, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body: any, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "POST", body }),

  patch: <T = any>(endpoint: string, body: any, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "PATCH", body }),

  put: <T = any>(endpoint: string, body: any, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "PUT", body }),

  delete: <T = any>(endpoint: string, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
