import { Typography } from "@/constants/Typography";
import { normalize } from "@/utils/responsive";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConversationsScreen() {
  const router = useRouter();
  const { initialMessage } = useLocalSearchParams<{ initialMessage: string }>();

  // Mock data for the list
  const recentConversations = [
    {
      id: "1",
      title: initialMessage || "Having a bad mood",
      timestamp: "05:12",
      subtitle: "Cognitive Therapy • Caring is the ...",
    },
    {
      id: "2",
      title: "Having a bad mood",
      timestamp: "05:12",
      subtitle: "Caring is the new exercise",
    },
    {
      id: "3",
      title: "Having a bad mood",
      timestamp: "05:12",
      subtitle: "Caring is the new exercise",
    },
    {
      id: "4",
      title: "Having a bad mood",
      timestamp: "05:12",
      subtitle: "Caring is the new exercise",
    },
    {
      id: "5",
      title: "Having a bad mood",
      timestamp: "05:12",
      subtitle: "Caring is the new exercise",
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="menu" size={normalize(26)} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Conversations</Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.avatarContainer}>
              <Image source={require("@/assets/images/avatar.png")} style={styles.avatar} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Chips */}
        <View style={styles.chipsContainer}>
          <TouchableOpacity style={[styles.chip, styles.blueChip]}>
            <Text style={styles.chipText}>Human Therapist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, styles.blueChip]}>
            <Text style={styles.chipText}>Group Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.chip, styles.sosChip]}>
            <Text style={[styles.chipText, styles.sosText]}>SOS!</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionLabel}>RECENT</Text>

          {/* Conversations Card */}
          <View style={styles.conversationsCard}>
            {recentConversations.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.conversationItem,
                  index === recentConversations.length - 1 && styles.noBorder,
                ]}
              >
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemTime}>{item.timestamp}</Text>
                  </View>
                  <Text style={styles.itemSubtitle} numberOfLines={1}>
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* FAB: New Chat */}
        <TouchableOpacity style={styles.fab} onPress={() => router.push("/chatstarter")}>
          <Feather name="plus" size={normalize(24)} color="#FFF" />
          <Text style={styles.fabText}>New chat</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF7FF", // Light blue background from screenshot
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
  headerTitle: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(20),
    color: "#000",
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
  chipsContainer: {
    flexDirection: "row",
    paddingHorizontal: normalize(20),
    marginBottom: normalize(25),
    gap: normalize(10),
  },
  chip: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    borderRadius: normalize(25),
    justifyContent: "center",
    alignItems: "center",
    minWidth: normalize(80),
  },
  blueChip: {
    backgroundColor: "#3C61DD", // Standard blue
  },
  sosChip: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FF4D4D",
  },
  chipText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(13),
    color: "#FFF",
  },
  sosText: {
    color: "#FF4D4D",
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(100), // Space for FAB
  },
  sectionLabel: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(12),
    color: "#8A8A8E",
    marginBottom: normalize(10),
    letterSpacing: 1,
  },
  conversationsCard: {
    backgroundColor: "#FFF",
    borderRadius: normalize(15),
    paddingVertical: normalize(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  conversationItem: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    borderBottomWidth: 0.5,
    borderBottomColor: "#F2F2F2",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: normalize(4),
  },
  itemTitle: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(16),
    color: "#000",
  },
  itemTime: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(12),
    color: "#8A8A8E",
  },
  itemSubtitle: {
    fontFamily: Typography.fonts.regular,
    fontSize: normalize(13),
    color: "#8A8A8E",
  },
  fab: {
    position: "absolute",
    bottom: normalize(30),
    right: normalize(20),
    backgroundColor: "#3C61DD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(12),
    borderRadius: normalize(30),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    fontFamily: Typography.fonts.medium,
    fontSize: normalize(16),
    color: "#FFF",
    marginLeft: normalize(8),
  },
});
