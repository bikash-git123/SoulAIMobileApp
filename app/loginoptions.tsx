import { AppButton } from "@/components/ui/AppButton";
import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthOptionsScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={[Colors.gradient.start, Colors.gradient.end]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Welcome to Soul AI</Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>
            Sign in to Personalize your{"\n"}Therapy AI Companion
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Continue with Phone Number"
            variant="social"
            icon={<Feather name="message-circle" size={20} color="#000" />}
            style={styles.btnMargin}
            onPress={() => router.push("/sendotp" as any)}
          />

          <AppButton
            title="Continue with Email"
            variant="social"
            icon={<Feather name="mail" size={20} color="#000" />}
            style={styles.btnMargin}
            onPress={() => router.push("/login")}
          />

          <AppButton
            title="Continue with Apple"
            variant="social"
            icon={<AntDesign name="apple" size={20} color="#000" />}
            style={styles.btnMargin}
          />

          <AppButton
            title="Continue with Google"
            variant="social"
            icon={<AntDesign name="google" size={20} color="#DB4437" />}
          />
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By tapping Continue or logging into an existing Soul account, you agree to our{" "}
            <Text style={styles.linkText} onPress={() => router.push("/terms" as any)}>
              Terms
            </Text>{" "}
            and acknowledge that you have read our{" "}
            <Text style={styles.linkText} onPress={() => router.push("/privacy-policy")}>
              Privacy Policy
            </Text>
            , which explains how to opt out of offers and promos.
          </Text>
        </View>

        {/* Bottom Link */}
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
    paddingTop: 100,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 80,
  },

  titleText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.title,
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitleContainer: {
    marginBottom: 40,
  },

  subtitleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 22,
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },

  btnMargin: {
    marginBottom: 16,
  },

  termsContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
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
    marginTop: 30,
    alignItems: "center",
  },

  bottomLinkText: {
    fontFamily: Typography.fonts.bold,
    fontSize: 14,
    color: "#FFFFFF",
  },

  boldText: {
    fontFamily: Typography.fonts.medium,
  },
});
