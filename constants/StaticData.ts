import { Colors } from "./theme";

export const LANGUAGES = ["English", "Hindi", "Marathi", "Gujarati", "Odia"];

export const COUNTRIES = [
  "India",
  "USA",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
];

export const GENDERS = ["Male", "Female", "Other"];

export const EXPERIENCE_LEVELS = ["Getting Started", "Some Experience", "Significant Experience"];

export const TONE_OPTIONS = [
  "Warm and Nurturing",
  "Professional",
  "Casual and Friendly",
  "Direct and Straightforward",
  "Motivational",
  "Balanced",
];

export const SUPPORT_OPTIONS = [
  "Stress",
  "Relationship",
  "Anxiety",
  "Work / School",
  "Loneliness",
  "Other",
];

export const THERAPY_TYPES = [
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

export const CHAT_PROMPTS = ["I want to talk about my mood", "I wish to talk about my day"];

export type Conversation = {
  id: string;
  title: string;
  timestamp: string;
  subtitle: string;
};

export type QuickAction = {
  id: "human" | "group" | "sos";
  label: string;
  icon: "user" | "users" | "alert-circle";
  color: string;
};

export const CONVERSATIONS_QUICK_ACTIONS: QuickAction[] = [
  { id: "human", label: "Human Therapist", icon: "user", color: "#333" },
  { id: "group", label: "Group Chat", icon: "users", color: "#333" },
  { id: "sos", label: "SOS!", icon: "alert-circle", color: "#FF3B30" },
];

export const TODAY_CONVERSATIONS_SEED: Conversation[] = [
  {
    id: "1",
    title: "Overwhelmed at Work",
    timestamp: "05:12 AM",
    subtitle: "Cognitive Therapy • Managing workplace anxiety",
  },
  {
    id: "2",
    title: "Can't Sleep Again",
    timestamp: "01:29 AM",
    subtitle: "Behavior Therapy • Insomnia and racing thoughts",
  },
];

export const YESTERDAY_CONVERSATIONS_SEED: Conversation[] = [
  {
    id: "3",
    title: "Argument with Alex",
    timestamp: "11:52 PM",
    subtitle: "Acceptance Therapy • Navigating boundaries",
  },
  {
    id: "4",
    title: "Feeling Unmotivated",
    timestamp: "06:12 PM",
    subtitle: "Mindfulness Based • Coping with low energy",
  },
  {
    id: "5",
    title: "Building Better Habits",
    timestamp: "04:23 PM",
    subtitle: "Solution focused • Establishing daily routines",
  },
];
