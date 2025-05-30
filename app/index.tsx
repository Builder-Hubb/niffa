import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const { width, height } = Dimensions.get('window');

const NiffaOnboarding = () => {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/screens/LoginScreen');
  };

  const Done = ({...props}) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <Text style={styles.doneText}>Start Reporting</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DoneButtonComponent={Done}
      onSkip={finishOnboarding}
      onDone={finishOnboarding}
      containerStyles={{ backgroundColor: '#FDFDFD' }}
      pages={[
        {
          backgroundColor: '#FDFDFD',
          image: (
            <LottieView
              source={require('../assets/animations/street-issue.json')}
              autoPlay
              loop
              style={styles.lottie}
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
              style={styles.lottie}
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
              style={styles.lottie}
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
              style={styles.lottie}
            />
          ),
          title: 'By the streets. For the streets.',
          subtitle: 'From Ojuelegba to Oshodi, Niffa gives you a voice.',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.8,
    height: height * 0.5,
  },
  doneButton: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2E7D32',
    borderRadius: 20,
  },
  doneText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NiffaOnboarding;
