import { NunitoSans_400Regular, NunitoSans_500Medium, useFonts } from '@expo-google-fonts/nunito-sans';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_500Medium,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* splash screen we built the primary initial route */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* loginoptions screen full screen without the default header */}
        <Stack.Screen name="loginoptions" options={{ headerShown: false }} />
        {/* login screen full screen without the default header */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* signup screen full screen without the default header */}
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        {/* sendotp screen full screen without the default header */}
        <Stack.Screen name="sendotp" options={{ headerShown: false }} />
        {/* verification screen full screen without the default header */}
        <Stack.Screen name="verify" options={{ headerShown: false }} />
        {/* email verification screen full screen without the default header */}
        <Stack.Screen name="emailverify" options={{ headerShown: false }} />
        {/* language screen full screen without the default header */}
        <Stack.Screen name="language" options={{ headerShown: false }} />
        {/* fullname screen full screen without the default header */}
        <Stack.Screen name="fullname" options={{ headerShown: false }} />
        {/* gender screen full screen without the default header */}
        <Stack.Screen name="gender" options={{ headerShown: false }} />
        <Stack.Screen name="experience" options={{ headerShown: false }} />
        <Stack.Screen name="response" options={{ headerShown: false }} />
        <Stack.Screen name="support" options={{ headerShown: false }} />
        <Stack.Screen name="chatstarter" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
