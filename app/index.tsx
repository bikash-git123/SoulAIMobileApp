import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { Typography } from '@/constants/Typography';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the login screen after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [router]);

  return (
    <LinearGradient
      colors={[Colors.gradient.start, Colors.gradient.end]}
      style={styles.container}
    >
      <View style={styles.centerContainer}>
        <Text style={styles.titleText}>Soul AI</Text>
        <Text style={styles.subtitleText}>
          A personalized therapy{'\n'}AI Companion
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: Typography.fonts.regular, // Using regular for Soul AI 
    fontSize: Typography.sizes.title,     // 32px
    color: '#FFFFFF',
    marginBottom: 0, // Reduced gap as requested
  },
  subtitleText: {
    fontFamily: Typography.fonts.medium,  // Using Medium for subtitle
    fontSize: Typography.sizes.subtitle,  // 16px
    color: '#FFFFFF',
    opacity: 0.6, // 60% opacity per design
    textAlign: 'center',
    lineHeight: 22, // Adjusted slightly for cleaner stacking
  },
});
