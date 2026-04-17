import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { Colors } from '@/constants/theme';
import { Typography } from '@/constants/Typography';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={[Colors.gradient.start, Colors.gradient.end]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>Welcome to Soul AI</Text>
            <Text style={styles.subtitleText}>Sign in to your account</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <AppInput
              iconName="user"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputMargin}
            />

            <AppInput
              iconName="lock"
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={styles.inputMargin}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#555555" />
                </TouchableOpacity>
              }
            />

            <AppButton
              title="Sign In"
              style={styles.signInBtnMargin}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>Or Sign In With</Text>
          </View>

          {/* Social Logins */}
          <View style={styles.socialContainer}>
            <AppButton
              title="Apple"
              variant="social"
              icon={<AntDesign name="apple1" size={20} color="#000" />}
              style={styles.socialBtnMargin}
            />
            <AppButton
              title="Google"
              variant="social"
              icon={<AntDesign name="google" size={20} color="#DB4437" />} // Standard Google Red
            />
          </View>

          {/* Bottom Link */}
          <View style={styles.bottomLinkContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/signup')}>
              <Text style={styles.bottomLinkText}>Don't have an account? Create one</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 80, // Approximate top padding based on design
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 100, // Increased gap to match the screenshot proportions
  },
  titleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.title,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.subtitle,
    color: '#FFFFFF',
    opacity: 0.6,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputMargin: {
    marginBottom: 12,
  },
  signInBtnMargin: {
    marginTop: 4, // 12 + 4 = 16 gap roughly
  },
  dividerContainer: {
    marginTop: 32,
    marginBottom: 20,
    alignItems: 'center',
  },
  dividerText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 12,
    color: '#DBE7FB',
    opacity: 0.6,
  },
  socialContainer: {
    width: '100%',
    alignItems: 'center',
  },
  socialBtnMargin: {
    marginBottom: 16,
  },
  bottomLinkContainer: {
    marginTop: 32, // Same distance as 'Or Sign In With'
    alignItems: 'center',
  },
  bottomLinkText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
  }
});
