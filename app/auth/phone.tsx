import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    const fullPhoneNumber = `+92${phoneNumber}`;
    console.log('Phone number entered:', fullPhoneNumber);
    // Navigate to password screen
    router.push('/auth/password');
  };

  const isValid = phoneNumber.length === 10 && /^[0-9]+$/.test(phoneNumber);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.heading}>Enter phone number</Text>
      <Text style={styles.subtext}>Enter your number to log in</Text>

      <View style={styles.phoneInputContainer}>
        <Text style={styles.prefix}>+92</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder=""
        />
      </View>

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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 40,
  },
  prefix: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: '500',
  },
  input: {
    fontSize: 18,
    flex: 1,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});