import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { normalize } from "@/utils/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CHAT_PROMPTS, THERAPY_TYPES } from "@/constants/StaticData";

export default function ChatStarterScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [inputText, setInputText] = useState("");

  const displayName = name || "Bikash";

  const handleSend = () => {
    if (inputText.trim()) {
      router.push({
        pathname: "/conversations",
        params: { initialMessage: inputText.trim() },
      } as any);
      setInputText("");
    }
  };

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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {/* Main Content Area */}
          <View style={styles.flex1}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => {}}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather name="menu" size={28} color="#333" />
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
              keyboardShouldPersistTaps="handled"
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
                  <Feather name="mic" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
                  <Ionicons name="paper-plane-outline" size={24} color="#333" />
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
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },
  greetingText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(32),
    color: "#000000",
    textAlign: "center",
    lineHeight: 42,
  },
  updateText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(14),
    color: "#464646",
    marginTop: 12,
  },
  therapyList: {
    alignItems: "center",
  },
  therapyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 12,
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
    fontSize: normalize(14),
    color: "#FFF",
    textAlign: "center",
  },
  promptsContainer: {
    marginBottom: 20,
    alignItems: "center",
    marginTop: 38,
  },
  promptCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.brand.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 0.5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brand.dotGreen,
    marginRight: 12,
  },
  promptText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(14),
    color: "#000000",
  },
  bottomBarContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.brand.inputBackground,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginRight: 10,
  },
  input: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(18),
    color: "#333",
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});
