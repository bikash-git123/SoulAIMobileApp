import { AppButton } from '@/components/ui/AppButton';
import { Typography } from '@/constants/Typography';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BackHandler, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export default function OnboardingScreen() {
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
            <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#111111" />
            </TouchableOpacity>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.content}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Every Person is Unique</Text>
              <Text style={styles.subtitle}>
                Personalized your therapy{"\n"}Experience
              </Text>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
              <AppButton
                title="Customize Soul AI"
                onPress={() => router.push('/experience')}
                style={styles.button}
              />

              <Text style={styles.footerText}>
                All the data shared with Soul AI is protected and secured only within the application.
              </Text>
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
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
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
    width: '52%',
    height: '100%',
    backgroundColor: '#3C61DD',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontFamily: Typography.fonts.regular,
    fontSize: 36,
    color: '#3C61DD',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: Typography.fonts.regular,
    fontSize: 20,
    color: '#9BBFF2', // A lighter blue shade matching the image
    textAlign: 'center',
    lineHeight: 28,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 30,
    marginBottom: 20,
    marginTop: 140,
  },
  button: {
    width: '100%',
    backgroundColor: '#3C61DD',
    borderRadius: 12,
    height: 56,
  },
  footerText: {
    fontFamily: Typography.fonts.bold,
    fontSize: 13,
    color: '#3C61DD',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
