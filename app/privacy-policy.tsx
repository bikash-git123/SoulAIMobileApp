import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.gradient.start, Colors.gradient.end]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Privacy Policy</Text>
            <TouchableOpacity onPress={handleClose} style={styles.iconButton}>
              <Ionicons name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Content Card */}
          <View style={styles.contentCard}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={true}
            >
              <Text style={styles.introText}>
                At Soul AI, we are committed to protecting your privacy and
                ensuring that your conversational space remains secure,
                confidential, and calming. This Privacy Policy explains how we
                collect, use, and safeguard your information when you use the
                Soul AI mobile application.
              </Text>

              {/* Section 1 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.sectionIntro}>
                  To provide a personalized and supportive experience, we collect
                  the following types of information:
                </Text>
                <View style={styles.bulletList}>
                  <BulletItem
                    boldText="Account & Onboarding Information: "
                    text="When you first launch the app and progress through our initial onboarding screens, we may collect basic setup information such as your chosen display name, timezone, and general wellness goals to tailor your initial experience."
                  />
                  <BulletItem
                    boldText="Conversational Data: "
                    text="As the core of Soul AI is therapeutic interaction, we collect and process the text inputs, chat logs, and emotional sentiment shared during your sessions with the AI."
                  />
                  <BulletItem
                    boldText="Media & Usage Preferences: "
                    text="We collect data on how you interact with the app's features outside of chat. This includes your listening history and preferences within our curated music library, enabling us to recommend the most effective audio for your relaxation and mindfulness routines."
                  />
                  <BulletItem
                    boldText="Device & Technical Data: "
                    text="We automatically collect standard diagnostic data, including device type, operating system, app performance metrics, and crash reports to ensure the app runs smoothly."
                  />
                </View>
              </View>

              {/* Section 2 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  2. How We Use Your Information
                </Text>
                <Text style={styles.sectionIntro}>
                  We use the collected data strictly to operate and improve the
                  Soul AI experience:
                </Text>
                <View style={styles.bulletList}>
                  <BulletItem text="To power the AI conversational engine and provide empathetic, context-aware responses." />
                  <BulletItem text="To personalize your in-app experience, such as suggesting specific ambient tracks from the music library based on your current mood." />
                  <BulletItem text="To improve our onboarding sequence and user interface based on aggregated usage patterns." />
                  <BulletItem text="To maintain the technical stability and security of the application." />
                </View>
              </View>

              {/* Section 3 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  3. Data Privacy & AI Processing
                </Text>
                <Text style={styles.sectionIntro}>
                  Given the sensitive nature of an AI therapist application, we
                  employ strict data handling protocols:
                </Text>
                <View style={styles.bulletList}>
                  <BulletItem
                    boldText="Anonymization: "
                    text="Conversational data used to train or improve our underlying AI models is stripped of personally identifiable information (PII) before processing."
                  />
                  <BulletItem
                    boldText="No Human Reading: "
                    text="Your private chat logs with Soul AI are not read by human staff unless explicitly requested by you for technical support or if required by law (e.g., imminent threat of harm)."
                  />
                </View>
              </View>

              {/* Section 4 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. Data Security</Text>
                <Text style={styles.sectionIntro}>
                  We implement industry-standard encryption protocols (such as
                  AES-256 and TLS) to protect your data both in transit and at
                  rest. While no digital platform is completely invulnerable, we
                  continuously update our security practices to protect your
                  personal reflections and interactions from unauthorized access.
                </Text>
              </View>

              {/* Section 5 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. Sharing Your Information</Text>
                <Text style={styles.sectionIntro}>
                  We do not sell your personal data or chat logs to third-party
                  advertisers. We may only share your information in the following
                  limited circumstances:
                </Text>
                <View style={styles.bulletList}>
                  <BulletItem
                    boldText="Service Providers: "
                    text="With trusted cloud hosting and AI infrastructure partners who operate strictly under our data processing agreements and confidentiality clauses."
                  />
                  <BulletItem
                    boldText="Legal Requirements: "
                    text="If required to do so by law, or if we believe in good faith that such action is necessary to comply with legal obligations or protect the safety of our users or the public."
                  />
                </View>
              </View>

              {/* Section 6 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  6. Your Rights and Controls
                </Text>
                <Text style={styles.sectionIntro}>
                  You retain full control over your data within Soul AI. Through
                  the app's settings menu, you can:
                </Text>
                <View style={styles.bulletList}>
                  <BulletItem text="Review and export your chat history." />
                  <BulletItem text="Clear your conversation logs and media history." />
                  <BulletItem text="Delete your account entirely, which will permanently erase your personal data from our active servers within 30 days." />
                </View>
              </View>

              {/* Section 7 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
                <Text style={styles.sectionIntro}>
                  We may update this Privacy Policy periodically to reflect
                  changes in our practices or app features. We will notify you of
                  any significant changes via an in-app prompt or email before
                  they take effect.
                </Text>
              </View>

              {/* Section 8 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>8. Contact Us</Text>
                <Text style={styles.sectionIntro}>
                  If you have any questions, concerns, or feedback regarding this
                  Privacy Policy or how we handle your data, please reach out to
                  us at:
                </Text>
                <Text style={styles.contactText}>
                  Email: [Insert Support Email Address]
                </Text>
                <Text style={styles.contactText}>
                  Mailing Address: [Insert Company Address, if applicable]
                </Text>
              </View>

              <Text style={styles.disclaimerText}>
                Disclaimer: This is a foundational privacy policy template
                designed for UI/UX placement and general structural guidance. It
                is highly recommended to have this document reviewed by legal
                counsel to ensure full compliance with regional data protection
                laws (such as GDPR, CCPA, or DPDP Act) before launching the
                application.
              </Text>

              {/* Bottom Padding */}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

function BulletItem({ boldText, text }: { boldText?: string; text: string }) {
  return (
    <View style={styles.bulletContainer}>
      <View style={styles.bullet} />
      <Text style={styles.bulletText}>
        {boldText && <Text style={styles.boldText}>{boldText}</Text>}
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gradient.start,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontFamily: Typography.fonts.medium,
    fontSize: 22,
    color: "#FFF",
    textAlign: "center",
  },
  iconButton: {
    padding: 4,
    width: 40,
    alignItems: "center",
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#E5F1FF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 10,
    overflow: "hidden",
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 20,
  },
  introText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Typography.fonts.bold,
    fontSize: 15,
    color: "#222",
    marginBottom: 4,
  },
  sectionIntro: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 12,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 12,
    paddingRight: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#333",
    marginTop: 7,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  boldText: {
    fontFamily: Typography.fonts.bold,
    color: "#222",
  },
  contactText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginTop: 4,
  },
  disclaimerText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 20,
    lineHeight: 18,
  },
});
