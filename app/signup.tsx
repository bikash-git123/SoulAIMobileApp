import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { Colors } from "@/constants/theme";
import { API_BASE_URL } from "@/constants/Config";
import { ENDPOINTS } from "@/constants/endpoints";
import { Typography } from "@/constants/Typography";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { toast } from "@/utils/toast";

// Remove constant VALID_EMAIL as we are using a real API now

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      toast.error("Error", "Please enter your email address.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Error", "Please enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Error", "Please enter a password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Error", "Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.auth.register}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success response
        // { "success": true, "message": "...", "data": { ... } }
        toast.success("Success", data.message || "OTP sent to your email.");
        router.push({
          pathname: "/emailverify",
          params: { email: email.trim() },
        });
      } else if (response.status === 422) {
        // Validation error
        const errorMsg = data.detail?.[0]?.msg || "Validation error";
        toast.error("Error", errorMsg);
      } else {
        // Other errors
        toast.error("Error", data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        "Connection Error",
        "Could not connect to the server. If you are using a physical device, please use your machine's IP address instead of localhost.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={[Colors.gradient.start, Colors.gradient.end]} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>Get Started</Text>
            <Text style={styles.subtitleText}>Create your personalized experience</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <AppInput
              iconName="user"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.inputMargin}
            />

            <AppInput
              iconName="lock"
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.inputMargin}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#555555" />
                </TouchableOpacity>
              }
            />

            <AppInput
              iconName="lock"
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.inputMargin}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Feather
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#555555"
                  />
                </TouchableOpacity>
              }
            />

            <AppButton
              title={isLoading ? "" : "Send OTP"}
              style={styles.signInBtnMargin}
              onPress={handleSendOtp}
              disabled={isLoading}
              icon={isLoading ? <ActivityIndicator color="#FFF" /> : undefined}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>Or Sign Up With</Text>
          </View>

          {/* Social Logins */}
          <View style={styles.socialContainer}>
            <AppButton
              title="Apple"
              variant="social"
              icon={<AntDesign name="apple" size={20} color="#000" />}
              style={styles.socialBtnMargin}
            />
            <AppButton
              title="Google"
              variant="social"
              icon={<AntDesign name="google" size={20} color="#DB4437" />}
            />
          </View>

          {/* Bottom Link */}
          <View style={styles.bottomLinkContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/login")}>
              <Text style={styles.bottomLinkText}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  titleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.title,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.subtitle,
    color: "#FFFFFF",
    opacity: 0.6,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputMargin: {
    marginBottom: 12,
  },
  signInBtnMargin: {
    marginTop: 4,
  },
  dividerContainer: {
    marginTop: 32,
    marginBottom: 20,
    alignItems: "center",
  },
  dividerText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 12,
    color: "#DBE7FB",
    opacity: 0.6,
  },
  socialContainer: {
    width: "100%",
    alignItems: "center",
  },
  socialBtnMargin: {
    marginBottom: 16,
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
});
