import { AppButton } from "@/components/ui/AppButton";
import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/utils/api";
import { storage } from "@/utils/storage";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

export default function AuthOptionsScreen() {
  const router = useRouter();
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const { signIn: googleSignIn, isLoading: isGoogleLoading } = useGoogleAuth();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await storage.getToken();
        if (token) {
          try {
            const response = await apiClient.get(ENDPOINTS.users.me);

            // If token was expired (401), apiClient already removed it.
            // We just need to check if we should proceed.
            if (response.status === 401) {
              setIsCheckingToken(false);
              return;
            }

            const result = await response.json();

            if (result.success && result.data) {
              const { full_name, age, country, gender } = result.data;
              if (full_name && age && country && gender) {
                router.replace("/onboarding");
              } else {
                const missing = [];
                if (!full_name) missing.push("full_name");
                if (!age) missing.push("age");
                if (!country) missing.push("country");
                if (!gender) missing.push("gender");
                console.log("Missing profile details:", missing.join(", "));
                router.replace("/language");
              }
            } else {
              router.replace("/language");
            }
          } catch (apiError) {
            console.error("Error fetching user profile:", apiError);
            router.replace("/language");
          }
        }
      } catch (e) {
        console.error("Error checking token:", e);
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  if (isCheckingToken) {
    return (
      <LinearGradient
        colors={[Colors.gradient.start, Colors.gradient.end]}
        style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[Colors.gradient.start, Colors.gradient.end]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        {/* Header (same as first screen) */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Welcome to Soul AI</Text>
        </View>

        {/* Buttons (acts like formContainer) */}
        <View style={styles.formContainer}>
          <Text style={[styles.subtitleText, { marginBottom: 30 }]}>
            Sign in to Personalize your{"\n"}Therapy AI Companion
          </Text>

          <AppButton
            title="Continue with Phone Number"
            variant="social"
            icon={<Feather name="message-circle" size={20} color="#000" />}
            style={styles.inputMargin}
            onPress={() => router.push("/sendotp")}
          />

          <AppButton
            title="Continue with Email"
            variant="social"
            icon={<Feather name="mail" size={20} color="#000" />}
            style={styles.inputMargin}
            onPress={() => router.push("/login")}
          />

          {Platform.OS === "ios" && (
            <AppButton
              title="Continue with Apple"
              variant="social"
              icon={<AntDesign name="apple" size={20} color="#000" />}
              style={styles.inputMargin}
              onPress={() => {
                // Apple Sign In implementation would go here
                console.log("Apple Sign In clicked");
              }}
            />
          )}

          <AppButton
            title="Continue with Google"
            variant="social"
            icon={<AntDesign name="google" size={20} color="#DB4437" />}
            onPress={googleSignIn}
            disabled={isGoogleLoading}
          />
        </View>

        {/* Divider (same position as first screen) */}
        <View style={styles.dividerContainer}>
          <Text style={styles.termsText}>
            By tapping Continue or logging into an existing Soul account, you agree to our{" "}
            <Text style={styles.linkText} onPress={() => router.push("/terms" as any)}>
              Terms
            </Text>{" "}
            and acknowledge that you have read our{" "}
            <Text style={styles.linkText} onPress={() => router.push("/privacy-policy")}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>

        {/* Bottom Link (same as first screen) */}
        <View style={styles.bottomLinkContainer}>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.bottomLinkText}>
              Don’t have an account? <Text style={styles.boldText}>Create one</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },

  /* SAME HEADER STRUCTURE */
  header: {
    alignItems: "center",
    marginBottom: 120,
  },

  titleText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.title,
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.subtitle,
    color: "#FFFFFF",
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 20,
  },

  /* SAME AS formContainer */
  formContainer: {
    width: "100%",
    alignItems: "center",
  },

  inputMargin: {
    marginBottom: 16,
  },

  /* USED AS TERMS AREA */
  dividerContainer: {
    marginTop: 32,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  termsText: {
    fontSize: 12,
    color: "#DBE7FB",
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 18,
  },

  linkText: {
    textDecorationLine: "underline",
  },

  bottomLinkContainer: {
    marginTop: 32,
    alignItems: "center",
  },

  bottomLinkText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: "#FFFFFF",
  },

  boldText: {
    fontFamily: Typography.fonts.medium,
  },
});
