import { Colors } from "@/constants/theme";
import { Typography } from "@/constants/Typography";
import { normalize } from "@/utils/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
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

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function ChatScreen() {
  const router = useRouter();
  const { title, therapy, lastUpdate } = useLocalSearchParams<{
    title?: string;
    therapy?: string;
    lastUpdate?: string;
  }>();

  const displayTitle = title || "Finding Balance";
  const displayTherapy = therapy || "Cognitive Therapy";
  const displayLastUpdate = lastUpdate || "12.02.26";

  const [inputText, setInputText] = useState("");

  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: "m1",
        role: "user",
        text: "I've been feeling really overwhelmed lately. It's like no matter what I do, I can't catch up or relax.",
      },
      {
        id: "m2",
        role: "assistant",
        text: "That sounds exhausting. When everything starts piling up, it can feel like there’s no space to breathe. Do you notice if certain situations or thoughts make that feeling stronger?",
      },
      {
        id: "m3",
        role: "user",
        text: "Yeah, mostly when I think about all the things I haven’t finished yet. It just makes me feel stuck.",
      },
    ],
    [],
  );

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const onPressMenu = () => {
    router.push("/conversations");
  };

  const onSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: `m-${Date.now()}`, role: "user", text: trimmed }]);
    setInputText("");
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E2F4FF"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView
          style={styles.flex1}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={onPressMenu}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="menu" size={normalize(24)} color="#333" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <View style={styles.therapyPill}>
                <Text style={styles.therapyPillText}>{displayTherapy}</Text>
              </View>
            </View>

            <View style={styles.avatarStub} />
          </View>

          {/* Title + update */}
          <View style={styles.titleBlock}>
            <Text style={styles.titleText}>{displayTitle}</Text>
            <Text style={styles.updateText}>Last Update: {displayLastUpdate}</Text>
          </View>

          {/* Messages */}
          <ScrollView
            style={styles.flex1}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.slice(0, 2).map((m) => (
              <ChatBubble key={m.id} role={m.role} text={m.text} />
            ))}

            <View style={styles.dateDivider}>
              <View style={styles.dateLine} />
              <Text style={styles.dateText}>10:30am - 12.02.26</Text>
              <View style={styles.dateLine} />
            </View>

            {messages.slice(2).map((m) => (
              <ChatBubble key={m.id} role={m.role} text={m.text} />
            ))}
          </ScrollView>

          {/* Input */}
          <View style={styles.bottomBarContainer}>
            <View style={styles.bottomBar}>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Ask me anything..."
                  placeholderTextColor="#A0A0A0"
                  style={styles.input}
                  onSubmitEditing={onSend}
                  returnKeyType="send"
                />
              </View>

              <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                <Feather name="mic" size={normalize(20)} color="#333" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={onSend}>
                <Ionicons name="paper-plane-outline" size={normalize(20)} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function ChatBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubbleRow, isUser ? styles.bubbleRowRight : styles.bubbleRowLeft]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.bubbleText, isUser ? styles.userText : styles.assistantText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(20),
    paddingTop: normalize(8),
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  therapyPill: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    borderRadius: normalize(18),
    borderWidth: 1,
    borderColor: "rgba(60, 97, 221, 0.55)",
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  therapyPillText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(13),
    color: "#1C1C1E",
  },
  avatarStub: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(17),
    backgroundColor: "#D1E5FF",
  },
  titleBlock: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(18),
    paddingBottom: normalize(6),
  },
  titleText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(22),
    color: "#111111",
  },
  updateText: {
    marginTop: normalize(6),
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(12),
    color: "#8A8A8E",
  },
  messagesContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(12),
    paddingBottom: normalize(16),
  },
  bubbleRow: {
    flexDirection: "row",
    marginBottom: normalize(10),
  },
  bubbleRowLeft: {
    justifyContent: "flex-start",
  },
  bubbleRowRight: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "86%",
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    borderRadius: normalize(14),
  },
  userBubble: {
    backgroundColor: "#3C61DD",
    borderTopRightRadius: normalize(6),
  },
  assistantBubble: {
    backgroundColor: Colors.brand.cardBackground,
    borderTopLeftRadius: normalize(6),
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  bubbleText: {
    fontSize: normalize(14),
    lineHeight: normalize(22),
  },
  userText: {
    fontFamily: Typography.fonts.medium,
    color: "#FFFFFF",
  },
  assistantText: {
    fontFamily: Typography.fonts.regular,
    color: "#1C1C1E",
  },
  dateDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(10),
    marginVertical: normalize(10),
    opacity: 0.6,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  dateText: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(11),
    color: "#8A8A8E",
  },
  bottomBarContainer: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(12),
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(10),
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.brand.inputBackground,
    height: normalize(46),
    borderRadius: normalize(24),
    justifyContent: "center",
    paddingHorizontal: normalize(14),
  },
  input: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(14),
    color: "#333",
  },
  iconButton: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(21),
    alignItems: "center",
    justifyContent: "center",
  },
});
