import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Niffa',
    description: 'Earn rewards for learning and contributing online.',
    image: require('@/assets/images/bridge-anim.png'),
  },
  {
    id: '2',
    title: 'Grow Your Knowledge',
    description: 'Collect points and exchange them for real benefits.',
    image: require('@/assets/images/bridge-anim.png'),
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/screens/home');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled={false}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        extraData={currentSlide}
      />
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  slide: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: '100%', height: 250, marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#777', textAlign: 'center' },
  button: { marginTop: 30, backgroundColor: '#000', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
