import React, { useEffect, useRef, useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView, 
  Platform, 
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; 

export default function SignupOtpScreen() { 
  const router = useRouter(); 
  const [otp, setOtp] = useState(['', '', '', '']); 
  const [timer, setTimer] = useState(60); 

  const inputRefs = useRef<TextInput[]>([]); 

  useEffect(() => { 
    if (timer > 0) { 
      const interval = setInterval(() => { 
        setTimer((prev) => prev - 1); 
      }, 1000); 
      return () => clearInterval(interval); 
    } 
  }, [timer]); 

  const handleOtpChange = (value: string, index: number) => { 
    if (!/^\d*$/.test(value)) return; 

    const newOtp = [...otp]; 
    newOtp[index] = value; 
    setOtp(newOtp); 

    if (value && index < 3) { 
      inputRefs.current[index + 1]?.focus(); 
    } 

    if (!value && index > 0) { 
      inputRefs.current[index - 1]?.focus(); 
    } 
  }; 

  const handleResend = () => { 
    setTimer(60); 
    console.log('OTP resent'); 
    // You can trigger your resend OTP API here 
  }; 

  const handleContinue = () => { 
    const fullOtp = otp.join(''); 
    console.log('Entered OTP:', fullOtp); 
    router.push('/auth/signup-details'); 
  }; 

  const isValid = otp.every((digit) => digit !== ''); 

  return ( 
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.select({ ios: 'padding', android: undefined })} 
    > 
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}> 
        <Ionicons name="arrow-back" size={28} color="#333" /> 
      </TouchableOpacity> 

      <Text style={styles.heading}>Enter OTP</Text> 
      <Text style={styles.subtext}>We've sent a 4-digit code to your phone</Text> 

      <View style={styles.otpContainer}> 
        {otp.map((digit, index) => ( 
          <TextInput 
            key={index} 
            style={styles.otpBox} 
            keyboardType="numeric" 
            maxLength={1} 
            value={digit} 
            onChangeText={(val) => handleOtpChange(val, index)} 
            ref={(ref) => { 
              if (ref) inputRefs.current[index] = ref; 
            }} 
          /> 
        ))} 
      </View> 

      <View style={styles.timerContainer}> 
        {timer > 0 ? ( 
          <Text style={styles.timerText}>Resend in {timer}s</Text> 
        ) : ( 
          <TouchableOpacity onPress={handleResend}> 
            <Text style={styles.resendText}>Resend OTP</Text> 
          </TouchableOpacity> 
        )} 
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
  otpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30, 
  }, 
  otpBox: { 
    borderBottomWidth: 2, 
    borderColor: '#ccc', 
    width: 50, 
    height: 60, 
    fontSize: 24, 
    textAlign: 'center', 
  }, 
  timerContainer: { 
    marginBottom: 40, 
    alignItems: 'center', 
  }, 
  timerText: { 
    color: '#666', 
    fontSize: 14, 
  }, 
  resendText: { 
    color: '#000', 
    fontSize: 14, 
    fontWeight: '600', 
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