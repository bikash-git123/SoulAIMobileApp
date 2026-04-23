import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Responsive Scaling Utility
const scale = SCREEN_WIDTH / 375;
const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const THERAPY_TYPES = [
  { id: "1", title: "Cognitive Therapy", color: Colors.therapy.orange },
  {
    id: "2",
    title: "Acceptance and Commitment Therapy",
    color: Colors.therapy.blue,
  },
  {
    id: "3",
    title: "Dialectical Behavior Therapy",
    color: Colors.therapy.purple,
  },
  { id: "4", title: "Mindfulness Based", color: Colors.therapy.orange },
  { id: "5", title: "Psychodynamic", color: Colors.therapy.blue },
  { id: "6", title: "Solution focused", color: Colors.therapy.purple },
];

const CHAT_PROMPTS = ["I want to talk about my mood", "I wish to talk about my day"];

export default function ChatStarterScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [inputText, setInputText] = useState("");

  const displayName = name || "Bikash";

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E2F4FF"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.flex1}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : normalize(20)}
        >
          {/* Main Content Area */}
          <View style={styles.flex1}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => {}}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather name="menu" size={normalize(28)} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.avatarContainer}>
                  <Image source={require("@/assets/images/avatar.png")} style={styles.avatar} />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.flex1}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={true}
            >
              {/* Greeting Header */}
              <View style={styles.header}>
                <Text style={styles.greetingText}>
                  Hello {displayName}, How{"\n"}can I help you?
                </Text>
                <Text style={styles.updateText}>Last Update: 22.04.26</Text>
              </View>

              {/* Therapy Type Buttons */}
              <View style={styles.therapyList}>
                {THERAPY_TYPES.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => {}}
                    style={[styles.therapyButton, { backgroundColor: item.color }]}
                  >
                    <Text style={styles.therapyButtonText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Chat Prompts */}
              <View style={styles.promptsContainer}>
                {CHAT_PROMPTS.map((prompt, index) => (
                  <TouchableOpacity key={index} style={styles.promptCard} activeOpacity={0.7}>
                    <View style={styles.dot} />
                    <Text style={styles.promptText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Bottom Chat Input Bar - Flex positioned, NOT absolute */}
            <View style={styles.bottomBarContainer}>
              <View style={styles.bottomBar}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ask me anything..."
                    placeholderTextColor="#A0A0A0"
                    value={inputText}
                    onChangeText={setInputText}
                  />
                </View>
                <TouchableOpacity style={styles.iconButton}>
                  <Feather name="mic" size={normalize(24)} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="paper-plane-outline" size={normalize(24)} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: normalize(24),
    paddingTop: normalize(10),
    paddingBottom: normalize(20),
  },
  avatarContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: "#D1E5FF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(20), // Standard padding, no longer needs massive hack
  },
  header: {
    alignItems: "center",
    marginTop: normalize(10),
    marginBottom: normalize(30),
  },
  greetingText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(32),
    color: "#000",
    textAlign: "center",
    lineHeight: normalize(42),
  },
  updateText: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(16),
    color: "#8A8A8A",
    marginTop: normalize(8),
  },
  therapyList: {
    alignItems: "center",
    marginBottom: normalize(40), // Reduced from fixed 80 for better layout
  },
  therapyButton: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(24),
    borderRadius: normalize(25),
    marginBottom: normalize(8),
    // width: "80%", // Responsive width
    maxWidth: 320,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  therapyButtonText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(18),
    color: "#FFF",
    textAlign: "center",
  },
  promptsContainer: {
    marginBottom: normalize(20),
    alignItems: "center",
    marginTop: normalize(40),
  },
  promptCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.brand.cardBackground,
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(24),
    borderRadius: normalize(30),
    marginBottom: normalize(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 0.5,
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: Colors.brand.dotGreen,
    marginRight: normalize(12),
  },
  promptText: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(18),
    color: "#333",
  },
  bottomBarContainer: {
    backgroundColor: "transparent",
    paddingBottom: normalize(10),
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.brand.inputBackground,
    height: normalize(50),
    borderRadius: normalize(25),
    justifyContent: "center",
    paddingHorizontal: normalize(20),
    marginRight: normalize(10),
  },
  input: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(18),
    color: "#333",
  },
  iconButton: {
    width: normalize(44),
    height: normalize(44),
    justifyContent: "center",
    alignItems: "center",
  },
});
