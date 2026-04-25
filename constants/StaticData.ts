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
