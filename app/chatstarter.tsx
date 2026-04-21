import { Colors } from '@/constants/theme';
import { Typography } from '@/constants/Typography';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const THERAPY_TYPES = [
  { id: '1', title: 'Cognitive Therapy', color: Colors.therapy.orange },
  { id: '2', title: 'Acceptance and Commitment Therapy', color: Colors.therapy.blue },
  { id: '3', title: 'Dialectical Behavior Therapy', color: Colors.therapy.purple },
  { id: '4', title: 'Mindfulness Based', color: Colors.therapy.orange },
  { id: '5', title: 'Psychodynamic', color: Colors.therapy.blue },
  { id: '6', title: 'Solution focused', color: Colors.therapy.purple },
];

const CHAT_PROMPTS = [
  'I want to talk about my mood',
  'I wish to talk about my day',
];

export default function ChatStarterScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [inputText, setInputText] = useState('');

  const displayName = name || 'Bikash';

  return (
    <LinearGradient
      colors={['#FFFFFF', '#E2F4FF']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => { }}>
              <Feather name="menu" size={28} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('@/assets/images/avatar.png')}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Greeting Header */}
            <View style={styles.header}>
              <Text style={styles.greetingText}>
                Hello {displayName}, How{'\n'}can I help you?
              </Text>
              <Text style={styles.updateText}>Last Update: 12.02.26</Text>
            </View>

            {/* Therapy Type Buttons */}
            <View style={styles.therapyList}>
              {THERAPY_TYPES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => { }}
                  style={[
                    styles.therapyButton,
                    { backgroundColor: item.color },
                  ]}
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

          {/* Bottom Chat Input Bar */}
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
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="paper-plane-outline" size={24} color="#333" />
            </TouchableOpacity>
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
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1E5FF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Space for bottom bar
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  greetingText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 28,
    color: '#000',
    textAlign: 'center',
    lineHeight: 38,
  },
  updateText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 8,
  },
  therapyList: {
    alignItems: 'center',
    marginBottom: 80,
  },
  therapyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 8,
    minWidth: 200,
    alignItems: 'center',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  therapyButtonText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
  },
  promptsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.brand.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 12,
    // Soft shadow like image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: .5
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brand.dotGreen,
    marginRight: 12,
  },
  promptText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
    color: '#333',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.brand.inputBackground,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 10,
  },
  input: {
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
