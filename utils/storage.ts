import * as SecureStore from "expo-secure-store";

export const STORAGE_KEYS = {
  USER_TOKEN: "userToken",
};

export const storage = {
  async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Storage setItem error:", error);
    }
  },

  async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Storage getItem error:", error);
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("Storage removeItem error:", error);
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
