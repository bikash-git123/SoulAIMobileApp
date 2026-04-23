import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize } from "@/utils/responsive";

export default function ChatScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const [inputText, setInputText] = useState("");

  const chatCategory = category || "Cognitive Therapy";

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.flex1}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {/* Header Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="menu" size={normalize(26)} color="#333" />
            </TouchableOpacity>
            
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>{chatCategory}</Text>
            </View>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require("@/assets/images/avatar.png")}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Chat Messages Area */}
          <ScrollView
            style={styles.flex1}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Messages would go here */}
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Start a conversation with Soul AI</Text>
            </View>
          </ScrollView>

          {/* Bottom Input Section */}
          <View style={styles.bottomBar}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ask me anything..."
                placeholderTextColor="#A0A0A0"
                value={inputText}
                onChangeText={setInputText}
                multiline={false}
              />
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="mic" size={normalize(24)} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="paper-plane-outline"
                size={normalize(24)}
                color="#333"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF7FF", // Matching the light blue background
  },
  flex1: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: "#3C61DD",
    borderRadius: normalize(25),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(20),
    backgroundColor: "#FFF",
  },
  categoryText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(14),
    color: "#333",
  },
  avatarContainer: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    overflow: "hidden",
    backgroundColor: "#D1E5FF",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  chatContent: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(16),
    color: "#A0A0A0",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    backgroundColor: "transparent",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "rgba(60, 97, 221, 0.08)", // Very light blue/tint
    height: normalize(52),
    borderRadius: normalize(26),
    justifyContent: "center",
    paddingHorizontal: normalize(20),
    marginRight: normalize(10),
  },
  input: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(16),
    color: "#333",
  },
  iconButton: {
    width: normalize(44),
    height: normalize(44),
    justifyContent: "center",
    alignItems: "center",
  },
});
