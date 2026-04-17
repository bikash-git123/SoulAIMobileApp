import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { Typography } from '@/constants/Typography';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GenderScreen() {
  const router = useRouter();

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
              <Text style={styles.titleText}>Hi Arjun!</Text>
              <Text style={styles.subtitleText}>Let us know more about you</Text>
            </View>

            {/* Input Field Form */}
            <View style={styles.formContainer}>
              <AppInput 
                placeholder="Age"
                keyboardType="numeric"
                style={styles.inputStyle}
              />
              
              <TouchableOpacity activeOpacity={0.8} style={styles.fullWidth}>
                <AppInput 
                  placeholder="Country"
                  style={styles.inputStyle}
                  editable={false}
                  pointerEvents="none"
                  rightIcon={<Feather name="chevron-down" size={20} color="#8A8A8E" />}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.fullWidth}>
                <AppInput 
                  placeholder="Gender"
                  style={styles.inputStyle}
                  editable={false}
                  pointerEvents="none"
                  rightIcon={<Feather name="chevron-down" size={20} color="#8A8A8E" />}
                />
              </TouchableOpacity>
              
              <AppButton 
                title="Next"
                style={styles.nextButton}
              />
            </View>
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
    backgroundColor: 'rgba(60, 97, 221, 0.1)', 
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '80%', 
    height: '100%',
    backgroundColor: '#3C61DD', 
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
    fontSize: 32, 
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
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  inputStyle: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF', 
    borderColor: 'rgba(0,0,0,0.05)', 
  },
  nextButton: {
    marginTop: 8,
  }
});
