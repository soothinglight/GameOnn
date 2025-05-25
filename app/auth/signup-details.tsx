import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpDetails() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValid =
    username.length >= 3 &&
    /^\d+$/.test(age) &&
    parseInt(age) >= 13 &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleContinue = () => {
    console.log({
      username,
      age,
      password,
    });
    // Proceed to home or next step
    router.push('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.heading}>Complete your profile</Text>
      <Text style={styles.subtext}>Enter your details to finish signing up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Set Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
    marginBottom: 30,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});