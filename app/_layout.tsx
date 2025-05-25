import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Orbitron_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="auth/phone" />
      <Stack.Screen name="auth/password" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}