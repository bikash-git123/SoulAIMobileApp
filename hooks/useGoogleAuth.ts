import { AuthService } from "@/utils/auth";
import { toast } from "@/utils/toast";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import Constants, { ExecutionEnvironment } from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

// Detect if we're running inside Expo Go (storeClient)
// In Expo Go, exp:// URIs are blocked by Google — we must use the auth.expo.io proxy
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

const EXPO_PROXY_REDIRECT_URI = "https://auth.expo.io/@soulbuster/soulai";

type GoogleOAuthClientIds = {
  androidClientId?: string;
  iosClientId?: string;
  webClientId?: string;
};

export function getGoogleOAuthClientIds(): GoogleOAuthClientIds {
  // Read from app.json `expo.extra.googleOAuth`.
  const extra = Constants.expoConfig?.extra as any;
  const fromExtra: GoogleOAuthClientIds | undefined = extra?.googleOAuth;

  return {
    androidClientId: fromExtra?.androidClientId ?? undefined,
    iosClientId: fromExtra?.iosClientId ?? undefined,
    webClientId: fromExtra?.webClientId ?? undefined,
  };
}

export function hasGoogleOAuthClientId(): boolean {
  const ids = getGoogleOAuthClientIds();
  if (Platform.OS === "android") return !!ids.androidClientId;
  if (Platform.OS === "ios") return !!ids.iosClientId;
  return !!ids.webClientId;
}

export const useGoogleAuth = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  // ✅ Expo Go → use auth.expo.io proxy (HTTPS, accepted by Google)
  // ✅ Dev/production build → use soulai:// deep link scheme
  const redirectUri = isExpoGo
    ? EXPO_PROXY_REDIRECT_URI
    : AuthSession.makeRedirectUri({ scheme: "soulai" });

  // console.log("[GoogleAuth] Environment:", isExpoGo ? "Expo Go" : "Native Build");
  // console.log("[GoogleAuth] Redirect URI:", redirectUri);

  // Google.useAuthRequest (from expo-auth-session/providers/google) already
  // knows Google's discovery endpoints internally — no need to pass them.
  const { androidClientId, iosClientId, webClientId } = getGoogleOAuthClientIds();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    redirectUri,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("[GoogleAuth] Auth success, token type:", authentication?.tokenType);

      if (authentication?.idToken) {
        console.log("[GoogleAuth] idToken received ✅");
        verify(authentication.idToken);
      } else if (authentication?.accessToken) {
        console.log("[GoogleAuth] No idToken — using accessToken as fallback");
        verify(authentication.accessToken);
      } else {
        console.warn("[GoogleAuth] No token in response", authentication);
        toast.error("Auth Error", "No token received from Google.");
        setIsVerifying(false);
      }
    } else if (response?.type === "error") {
      console.error("[GoogleAuth] Error:", response.error);
      toast.error("Auth Error", response.error?.message ?? "Google Sign-In failed.");
      setIsVerifying(false);
    } else if (response?.type === "cancel") {
      console.log("[GoogleAuth] User cancelled");
      setIsVerifying(false);
    }
  }, [response]);

  const verify = async (token: string) => {
    setIsVerifying(true);
    try {
      await AuthService.loginWithSocialToken("google", token);
    } catch (error) {
      console.error("[GoogleAuth] Verification error:", error);
      toast.error("Error", "Sign-in verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  const signIn = async () => {
    console.log("[GoogleAuth] Sign-In button pressed");

    if (!request) {
      console.warn("[GoogleAuth] Auth request not ready");
      toast.error("Error", "Google auth not ready. Please try again.");
      return;
    }

    try {
      const result = await promptAsync();
      console.log("[GoogleAuth] promptAsync result:", result.type);
    } catch (error) {
      console.error("[GoogleAuth] promptAsync error:", error);
      toast.error("Error", "Could not open Google Sign-In.");
    }
  };

  return {
    signIn,
    isLoading: isVerifying,
    isReady: !!request,
  };
};
