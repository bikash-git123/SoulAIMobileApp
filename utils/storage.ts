import * as SecureStore from "expo-secure-store";

export const STORAGE_KEYS = {
  USER_TOKEN: "userToken",
};

export const storage = {
  async setItem(key: string, value: string) {
    try {
      console.log(`[Storage] Setting item: ${key}`);
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`[Storage] Error setting ${key}:`, error);
    }
  },

  async getItem(key: string) {
    try {
      const value = await SecureStore.getItemAsync(key);
      console.log(`[Storage] Gettiing item: ${key}, status: ${value ? "found" : "not found"}`);
      return value;
    } catch (error) {
      console.error(`[Storage] Error getting ${key}:`, error);
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      console.log(`[Storage] Removing item: ${key}`);
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`[Storage] Error removing ${key}:`, error);
    }
  },

  // Specialized helpers for token
  async getToken() {
    return this.getItem(STORAGE_KEYS.USER_TOKEN);
  },

  async setToken(token: string) {
    return this.setItem(STORAGE_KEYS.USER_TOKEN, token);
  },

  async removeToken() {
    return this.removeItem(STORAGE_KEYS.USER_TOKEN);
  },
};
