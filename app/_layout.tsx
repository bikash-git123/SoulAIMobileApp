import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, NunitoSans_400Regular, NunitoSans_500Medium } from '@expo-google-fonts/nunito-sans';

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
        {/* Make the splash screen we built the primary initial route */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* Make the login screen full screen without the default header */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* Make the signup screen full screen without the default header */}
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        {/* Make the verification screen full screen without the default header */}
        <Stack.Screen name="verify" options={{ headerShown: false }} />
        {/* Make the language screen full screen without the default header */}
        <Stack.Screen name="language" options={{ headerShown: false }} />
        {/* Make the fullname screen full screen without the default header */}
        <Stack.Screen name="fullname" options={{ headerShown: false }} />
        {/* Make the gender screen full screen without the default header */}
        <Stack.Screen name="gender" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
