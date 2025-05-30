import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const { width, height } = Dimensions.get('window');

const NiffaOnboarding = () => {
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/screens/LoginScreen');
    } catch (error) {
      console.error('Error saving onboarding state:', error);
      router.replace('/screens/LoginScreen');
    }
  };

  const Done = ({ ...props }) => (
    <TouchableOpacity
      className="mx-2.5 px-5 py-3 bg-green-700 rounded-full shadow-lg"
      {...props}
    >
      <Text className="text-white font-bold text-base">Start Reporting</Text>
    </TouchableOpacity>
  );

  const Skip = ({ ...props }) => (
    <TouchableOpacity className="mx-2.5 px-4 py-2" {...props}>
      <Text className="text-gray-600 text-base font-medium">Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity className="mx-2.5 px-5 py-2.5 bg-green-300 rounded-2xl" {...props}>
      <Text className="text-green-700 font-bold text-base">Next</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DoneButtonComponent={Done}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      onSkip={handleOnboardingComplete}
      onDone={handleOnboardingComplete}
      containerStyles={{ backgroundColor: '#FDFDFD' }}
      titleStyles={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        textAlign: 'center',
        marginHorizontal: 20,
        lineHeight: 32,
      }}
      subTitleStyles={{
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
        marginHorizontal: 20,
        lineHeight: 24,
      }}
      pages={[
        {
          backgroundColor: '#FDFDFD',
          image: (
            <LottieView
              source={require('../assets/animations/street-issue.json')}
              autoPlay
              loop
              style={{ width: width * 0.8, height: height * 0.4 }}
            />
          ),
          title: 'Your street. Your voice. Your power.',
          subtitle: 'Snap, flag, and track local issues — no more waiting for the government.',
        },
        {
          backgroundColor: '#FDFDFD',
          image: (
            <LottieView
              source={require('../assets/animations/community.json')}
              autoPlay
              loop
              style={{ width: width * 0.8, height: height * 0.4 }}
            />
          ),
          title: 'One tap can clean your street.',
          subtitle: 'Report once. Others see. Together, we fix.',
        },
        {
          backgroundColor: '#FDFDFD',
          image: (
            <LottieView
              source={require('../assets/animations/reward.json')}
              autoPlay
              loop
              style={{ width: width * 0.8, height: height * 0.4 }}
            />
          ),
          title: 'Report it. Fix it. Win.',
          subtitle: 'Earn civic points. Redeem for airtime, food, and more.',
        },
        {
          backgroundColor: '#FDFDFD',
          image: (
            <LottieView
              source={require('../assets/animations/community.json')}
              autoPlay
              loop
              style={{ width: width * 0.8, height: height * 0.4 }}
            />
          ),
          title: 'By the streets. For the streets.',
          subtitle: 'From Ojuelegba to Oshodi, Niffa gives you a voice.',
        },
      ]}
    />
  );
};

export default NiffaOnboarding;
