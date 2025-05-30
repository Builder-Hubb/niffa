import { auth } from '@/firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import '../global.css';

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const seenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

      if (!seenOnboarding) {
        router.replace('/NiffaOnboarding');
      } else if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/screens/LoginScreen');
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>

  return <Slot />;
}
