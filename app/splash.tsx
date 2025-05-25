import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';

// Prevent auto-hiding of splash screen
ExpoSplashScreen.preventAutoHideAsync();

const SplashScreenComponent = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hide the native splash screen
    ExpoSplashScreen.hideAsync();

    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate to login after 5 seconds
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        GameOnn
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        all sports booking app
      </Animated.Text>
    </View>
  );
};

export default SplashScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // dark navy
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    marginTop: 10,
    textTransform: 'uppercase',
  },
});