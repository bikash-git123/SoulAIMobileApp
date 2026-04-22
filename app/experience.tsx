import { AppButton } from '@/components/ui/AppButton';
import { Typography } from '@/constants/Typography';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { toast } from '@/utils/toast';


const EXPERIENCE_LEVELS = [
  'Getting Started',
  'Some Experience',
  'Significant Experience',
];


export default function ExperienceScreen() {
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  return (
    <LinearGradient
      // Approximating the radial gradient from the CSS
      colors={['#FFFFFF', '#E2F4FF']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Top Navigation & Progress */}
          <View style={styles.topNavContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#111111" />
            </TouchableOpacity>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.titleText}>Your Experience with {'\n'}Therapy?</Text>
              <Text style={styles.subtitleText}>Let us know more about you</Text>
            </View>

            {/* Experience Options */}
            <View style={styles.optionsContainer}>
              {EXPERIENCE_LEVELS.map((level) => {
                const isSelected = selectedExperience === level;
                return (
                  <TouchableOpacity
                    key={level}
                    activeOpacity={0.7}
                    onPress={() => setSelectedExperience(level)}
                    style={[
                      styles.languageOption,
                      isSelected && styles.languageOptionSelected
                    ]}
                  >
                    <Text style={[
                      styles.languageText,
                      isSelected ? { color: '#8A8A8E' } : { color: '#8A8A8E' }
                    ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>


            <AppButton
              title="Next"
              style={styles.nextButton}
              onPress={() => {
                if (!selectedExperience) {
                  toast.error('Error', 'Please select your experience level');
                  return;
                }
                router.push('/response');
              }}
            />
          </ScrollView>
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
  topNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(60, 97, 221, 0.1)', // Light blue track
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '65%', // Adjusted for consistent flow
    height: '100%',
    backgroundColor: '#3C61DD', // Primary blue
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 32, // Large title
    color: '#111111',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.subtitle,
    color: '#8A8A8E',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  languageOption: {
    width: '100%',
    height: 60, // slightly taller than standard input based on visual weight
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  languageOptionSelected: {
    borderColor: '#3C61DD', // Blue border for selected state
    borderWidth: 1.5,
  },
  languageText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
  },
  nextButton: {
    // marginTop: 10,
  }
});
