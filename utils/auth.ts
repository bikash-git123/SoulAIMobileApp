import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/utils/api";
import { storage } from "@/utils/storage";
import { toast } from "@/utils/toast";
import { router } from "expo-router";

export type SocialProvider = "google" | "apple";

export const AuthService = {
  /**
   * Generic handler to exchange a social provider token for an app token
   */
  async loginWithSocialToken(provider: SocialProvider, token: string) {
    try {
      const response = await apiClient.post(ENDPOINTS.auth.social(provider), {
        token,
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        const accessToken = data.data?.access_token || data.access_token;
        if (accessToken) {
          await storage.setToken(accessToken);
          toast.success("Success", "Authenticated successfully!");
          router.replace("/language");
          return { success: true, data };
        }
      }

      const errorMsg = data.message || data.detail?.message || "Login failed";
      toast.error("Error", errorMsg);
      return { success: false, error: errorMsg };
    } catch (error) {
      console.error(`AuthService [${provider}] Error:`, error);
      toast.error("Connection Error", "Could not reach the authentication server.");
      return { success: false, error: "Connection error" };
    }
  },

  /**
   * Clears session and redirects to login
   */
  async logout() {
    await storage.removeToken();
    router.replace("/login");
  },
};
