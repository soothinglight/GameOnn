import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PasswordLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    console.log('Password entered:', password);
    // TODO: Validate password with backend or Firebase
    // For now, we can just log and redirect
    router.push('/(tabs)');
  };

  const isValid = password.length >= 6;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.heading}>Enter your password</Text>
      <Text style={styles.subtext}>Enter the password associated with your phone number</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder=""
      />

      <TouchableOpacity
        style={[styles.button, !isValid && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtext: {
    color: '#666',
    marginBottom: 32,
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});