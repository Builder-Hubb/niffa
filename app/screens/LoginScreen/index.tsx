import { auth } from '@/firebase/config';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-[#FDFDFD]'>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="flag" size={28} color="#FDFDFD" />
            </View>
          </View>
          <Text className='font-bold text-[32px] mb-8 tracking-1 text-[#2E7D32]'>Niffa</Text>
          <Text className='mb-3 text-[#757575] text[14px] italic'>Your community, your voice</Text>
          <Text className='text-[16px] text-[#424242] text-center leading-[22px] max-w-[80%]'>
            Welcome back! Ready to make your community better?
          </Text>
        </View>

        <View className='flex-1 mb-5'>
          <View className='flex-row items-center bg-[#A5D6A7] rounded-xl mb-4 px-4 min-h-[56px] shadow-sm'>
            <View  className='mr-3'>
              <Ionicons name="mail-outline" size={20} color="#757575" />
            </View>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#757575"
              className='flex-1 text-[16px] text-[#212121] py-4'
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View className='flex-row items-center bg-[#A5D6A7] rounded-xl mb-4 px-4 min-h-[56px] shadow-sm'>
            <View className='mr-3'>
              <Ionicons name="lock-closed-outline" size={20} color="#757575" />
            </View>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#757575"
              className='flex-1 text-[16px] text-[#212121] py-4 pr-12'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              className='absolute right-4 top-1/2 transform -translate-y-1/2'
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#757575"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className='mb-6 self-end'>
            <Text className='text-[14px] font-bold text-[#2E7D32]'>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <Text style={styles.loginButtonText}>Signing in...</Text>
            ) : (
              <>
                <Text style={styles.loginButtonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="#FDFDFD" />
              </>
            )}
          </TouchableOpacity>

          <View className='mb-6 items-center flex-row'>
            <View className='text-[#E0E0E0] h-[1px] flex-1' />
            <Text  className='text-[#757575] text-[14px] px-4'>or</Text>
            <View className='text-[#E0E0E0] h-[1px] flex-1'  />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#757575" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.signupPrompt}>New to the community?</Text>
          <TouchableOpacity
            onPress={() => router.push('/signup')}
            style={styles.signupButton}
          >
            <Text style={styles.signupButtonText}>Join Niffa Today</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            🇳🇬 Built for Nigerians, by Nigerians
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A5D6A7',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  forgotPasswordText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: '#757575',
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#757575',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
  },
  socialButtonText: {
    color: '#757575',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  signupPrompt: {
    color: '#757575',
    fontSize: 16,
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: '#FFF176',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signupButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: '#757575',
    fontSize: 12,
    textAlign: 'center',
  },
});
