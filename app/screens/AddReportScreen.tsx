import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { categories } from '../data/mockData';

export default function AddReportScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImagePicker = () => {
        Alert.alert(
            'Add Photo',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => console.log('Camera selected') },
                { text: 'Gallery', onPress: () => console.log('Gallery selected') },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim() || !location.trim() || !selectedCategory) {
            Alert.alert('Missing Information', 'Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        // api call simulation
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                'Report Submitted Successfully!',
                'Your report has been submitted and will be reviewed by the community.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.back()
                    }
                ]
            );
        }, 2000);
    };

    const filteredCategories = categories.filter(cat => cat.name !== 'All');

    return (
        <SafeAreaView className="flex-1 bg-[#FDFDFD]">
            <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" />
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={24} color="#2E7D32" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Report Issue</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                <View className="my-6">
                    <Text className="text-base font-semibold text-gray-900 mb-3">Add Photo *</Text>
                    <TouchableOpacity
                        onPress={handleImagePicker}
                        className="h-48 bg-gray-100 rounded-xl items-center justify-center border-2 border-dashed border-gray-300"
                    >
                        {image ? (
                            <Image source={{ uri: image }} className="w-full h-full rounded-xl" />
                        ) : (
                            <View className="items-center">
                                <Ionicons name="camera-outline" size={48} color="#9CA3AF" />
                                <Text className="text-gray-500 mt-2">Take a photo or select from gallery</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className="mb-4">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Issue Title *</Text>
                    <TextInput
                        placeholder="Brief title describing the issue"
                        value={title}
                        onChangeText={setTitle}
                        className="bg-gray-100 rounded-xl px-4 py-4 text-base text-gray-900"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
                <View className="mb-4">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Description *</Text>
                    <TextInput
                        placeholder="Detailed description of the issue"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        className="bg-gray-100 rounded-xl px-4 py-4 text-base text-gray-900"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
                <View className="mb-4">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Location *</Text>
                    <TextInput
                        placeholder="Enter location or address"
                        value={location}
                        onChangeText={setLocation}
                        className="bg-gray-100 rounded-xl px-4 py-4 text-base text-gray-900"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
                {/* Category */}
                <View className="mb-6">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Category *</Text>
                    <View className="bg-gray-100 rounded-xl px-4 py-3">
                        {filteredCategories.map(category => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => setSelectedCategory(category.name)}
                                className={`flex-row items-center py-2 ${selectedCategory === category.name ? 'bg-green-50' : ''
                                    }`}
                            >
                                <Ionicons name={category.icon} size={24} color={selectedCategory === category.name ? '#2E7D32' : '#9CA3AF'} />
                                <Text className={`ml-3 text-base ${selectedCategory === category.name ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    className={`bg-[#2E7D32] rounded-xl py-4 items-center ${isSubmitting ? 'opacity-50' : ''}`}
                >
                    <Text className="text-white text-base font-semibold">
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
