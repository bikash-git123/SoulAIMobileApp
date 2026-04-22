import { AppButton } from '@/components/ui/AppButton';
import { Typography } from '@/constants/Typography';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { apiClient } from '@/utils/api';
import { toast } from '@/utils/toast';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SUPPORT_OPTIONS = [
  'Stress',
  'Relationship',
  'Anxiety',
  'Work / School',
  'Loneliness',
  'Other'
];

export default function SupportScreen() {
  const router = useRouter();
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSupport = (option: string) => {
    if (selectedSupport.includes(option)) {
      setSelectedSupport(selectedSupport.filter(s => s !== option));
    } else {
      setSelectedSupport([...selectedSupport, option]);
    }
  };

  const handleNext = async () => {
    if (selectedSupport.length === 0) {
      toast.error('Error', 'Please select at least one area where you need support');
      return;
    }


    setIsLoading(true);
    try {
      const response = await apiClient.patch('/users/me', {
        support_types: selectedSupport
      });

      if (response.status === 401) {
        toast.error('Session Expired', 'Please login again.');
        router.replace('/');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        router.replace('/chatstarter');
      } else {
        const errorMsg = data.detail?.message || data.message || 'Failed to update support types.';
        toast.error('Update Failed', errorMsg);
      }
    } catch (error) {
      console.error('Update Support Error:', error);
      toast.error('Connection Error', 'Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

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
              <Text style={styles.titleText}>Where do you need {'\n'}support?</Text>
              <Text style={styles.subtitleText}>Same challenges you’re facing now</Text>
            </View>

            {/* Support Options */}
            <View style={styles.optionsContainer}>
              {SUPPORT_OPTIONS.map((option) => {
                const isSelected = selectedSupport.includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.7}
                    onPress={() => toggleSupport(option)}
                    style={[
                      styles.supportOption,
                      isSelected && styles.supportOptionSelected
                    ]}
                  >
                    <Text style={[
                      styles.supportText,
                      { color: '#8A8A8E' }
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>

                );
              })}
            </View>

            <AppButton
              title={isLoading ? "" : "Let's talk about it"}
              style={styles.nextButton}
              onPress={handleNext}
              disabled={isLoading}
              icon={isLoading ? <ActivityIndicator color="#FFF" /> : undefined}
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
    width: '91%', // Adjusted for consistent flow (78% + 13%)
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
    marginBottom: 40
  },
  titleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 30, // Large title
    color: '#111111',
    textAlign: 'center',
    marginBottom: 12
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
  supportOption: {
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
  supportOptionSelected: {
    borderColor: '#3C61DD', // Blue border for selected state
    borderWidth: 1.5,
  },
  supportText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
  },

  nextButton: {
    // marginTop: 10,
  }
});
