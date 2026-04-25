import { AppButton } from "@/components/ui/AppButton";
import { OtpInput } from "@/components/ui/OtpInput";
import { Colors } from "@/constants/theme";
import { API_BASE_URL } from "@/constants/Config";
import { ENDPOINTS } from "@/constants/endpoints";
import { Typography } from "@/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { toast } from "@/utils/toast";

// Remove VALID_OTP as we are using real API now

export default function EmailVerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 4) {
      toast.error("Incomplete OTP", "Please enter the 4-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.auth.verifyOtp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: typeof email === "string" ? email : email?.[0] || "",
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success response
        // { "success": true, "message": "OTP verified successfully. User is now verified.", "data": null }
        toast.success("Success", data.message || "OTP verified successfully.");
        router.push("/login");
      } else {
        // Error response
        const errorMsg = data.detail?.message || data.message || "Invalid or expired OTP";
        toast.error("Error", errorMsg);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error(
        "Connection Error",
        "Could not connect to the server. Please check your internet connection and verify the server is running.",
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
        <View style={styles.centerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>Verify Email</Text>
            <Text style={styles.subtitleText}>
              Enter OTP Received{"\n"}on the entered email address
            </Text>
          </View>

          {/* Email Label */}
          <Text style={styles.emailLabel}>{email || "bikash.tlcr@gmail.com"}</Text>

          {/* OTP Input Form */}
          <View style={styles.formContainer}>
            <OtpInput length={4} onChange={setOtp} />

            <AppButton
              title={isLoading ? "" : "Verify"}
              style={styles.verifyBtnMargin}
              onPress={handleVerify}
              disabled={isLoading}
              icon={isLoading ? <ActivityIndicator color="#FFF" /> : undefined}
            />
          </View>

          {/* Resend Link */}
          <TouchableOpacity activeOpacity={0.7} style={styles.resendContainer}>
            <Text style={styles.resendText}>Resend Verification Code</Text>
          </TouchableOpacity>

          {/* Bottom Re-enter Email Link */}
          <View style={styles.bottomLinkContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Text style={styles.bottomLinkText}>Re-enter Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
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
    textAlign: "center",
    marginBottom: 40,
  },
  emailLabel: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  verifyBtnMargin: {
    marginTop: 20,
  },
  resendContainer: {
    marginTop: 8,
  },
  resendText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.6,
  },
  bottomLinkContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  bottomLinkText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
