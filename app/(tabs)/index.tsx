import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  categories,
  currentUser,
  Issue,
  mockIssues,
  searchIssues
} from '../data/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [displayedIssues, setDisplayedIssues] = useState<Issue[]>(mockIssues);
  const [likedIssues, setLikedIssues] = useState<Set<string>>(new Set());

  //init liked issues from user data
  useEffect(() => {
    const userLikedIssues = new Set<string>();
    mockIssues.forEach(issue => {
      if (issue.likedBy.includes(currentUser.id)) {
        userLikedIssues.add(issue.id);
      }
    });
    setLikedIssues(userLikedIssues);
  }, []);

  //search and category filtering
  useEffect(() => {
    let filteredIssues = mockIssues;
    if (searchText.trim()) {
      filteredIssues = searchIssues(searchText.trim());
    }
    if (selectedCategory !== 'All') {
      filteredIssues = filteredIssues.filter(issue => issue.category === selectedCategory);
    }

    setDisplayedIssues(filteredIssues);
  }, [searchText, selectedCategory]);

  const handleLike = (issueId: string) => {
    const newLikedIssues = new Set(likedIssues);

    if (likedIssues.has(issueId)) {
      newLikedIssues.delete(issueId);
      //update the firebase soon
      const issue = mockIssues.find(i => i.id === issueId);
      if (issue) {
        issue.votes -= 1;
        issue.likedBy = issue.likedBy.filter(id => id !== currentUser.id);
      }
    } else {
      newLikedIssues.add(issueId);
      //update the firebase soon
      const issue = mockIssues.find(i => i.id === issueId);
      if (issue) {
        issue.votes += 1;
        issue.likedBy.push(currentUser.id);
      }
    }

    setLikedIssues(newLikedIssues);
    setDisplayedIssues([...displayedIssues]);
  };

  const handleAddReport = () => {
    router.push('/screens/AddReportScreen');
  };

  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };

  const handleIssuePress = (issue: Issue) => {
    router.push(`/screens/IssueDetailScreen?id=${issue.id}`);
  };

  const handleNotificationPress = () => {
    router.push('/screens/NotificationsScreen');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-orange-500';
      case 'in-progress': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" />

      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            className="flex-row items-center flex-1"
            onPress={handleProfilePress}
          >
            <View className="w-10 h-10 rounded-full bg-green-700 mr-3 overflow-hidden">
              <Image
                source={{ uri: currentUser.avatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={16} color="#757575" />
                <Text className="text-sm text-gray-600 ml-1">Location</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-base font-semibold text-gray-900">{currentUser.location}</Text>
                <Ionicons name="chevron-down" size={16} color="#757575" className="ml-1" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            onPress={handleNotificationPress}
          >
            <Ionicons name="notifications-outline" size={20} color="#757575" />
            <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-4">
          <Ionicons name="search" size={20} color="#757575" />
          <TextInput
            placeholder="Search issues, locations..."
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 ml-3 text-base text-gray-900"
            placeholderTextColor="#757575"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch} className="ml-2">
              <Ionicons name="close-circle" size={20} color="#757575" />
            </TouchableOpacity>
          )}
          <TouchableOpacity className="ml-2">
            <Ionicons name="options-outline" size={20} color="#757575" />
          </TouchableOpacity>
        </View>

        {/* category filters*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.name)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                selectedCategory === category.name
                  ? 'bg-green-700'
                  : 'bg-gray-100'
              }`}
            >
              <Ionicons
                name={category.icon as any}
                size={16}
                color={selectedCategory === category.name ? 'white' : '#757575'}
              />
              <Text className={`text-sm font-medium ml-1 ${
                selectedCategory === category.name
                  ? 'text-white'
                  : 'text-gray-600'
              }`}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* issues */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-gray-900">
            {searchText ? `Search Results (${displayedIssues.length})` : 'Recent Reports'}
          </Text>
          <TouchableOpacity onPress={() => router.push('/screens/AllIssuesScreen')}>
            <Text className="text-green-700 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        {displayedIssues.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">No issues found</Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              {searchText ? 'Try adjusting your search terms' : 'No reports in this category yet'}
            </Text>
          </View>
        ) : (
          displayedIssues.map((issue) => (
            <TouchableOpacity
              key={issue.id}
              className="mb-4"
              onPress={() => handleIssuePress(issue)}
            >
              <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <View className="relative">
                  <Image
                    source={{ uri: issue.image }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  <View className="absolute top-3 left-3">
                    <View className={`px-2 py-1 rounded-full ${getStatusColor(issue.status)}`}>
                      <Text className="text-white text-xs font-medium capitalize">
                        {issue.status.replace('-', ' ')}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
                    onPress={() => handleLike(issue.id)}
                  >
                    <Ionicons
                      name={likedIssues.has(issue.id) ? "heart" : "heart-outline"}
                      size={18}
                      color={likedIssues.has(issue.id) ? "#EF4444" : "#757575"}
                    />
                  </TouchableOpacity>
                </View>
                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <Image
                      source={{ uri: issue.userAvatar }}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <Text className="text-sm text-gray-500">{issue.userName}</Text>
                    <Text className="text-gray-400 text-xs ml-auto">{issue.timeAgo}</Text>
                  </View>

                  <Text className="text-lg font-bold text-gray-900 mb-2">
                    {issue.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-3 leading-5" numberOfLines={2}>
                    {issue.description}
                  </Text>

                  <View className="flex-row items-center mb-3">
                    <Ionicons name="location-outline" size={14} color="#757575" />
                    <Text className="text-gray-500 text-sm ml-1" numberOfLines={1}>
                      {issue.location}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className={`flex-row items-center px-3 py-1 rounded-full mr-3 ${
                          likedIssues.has(issue.id) ? 'bg-green-700' : 'bg-green-100'
                        }`}
                        onPress={() => handleLike(issue.id)}
                      >
                        <Ionicons
                          name="arrow-up"
                          size={14}
                          color={likedIssues.has(issue.id) ? "white" : "#2E7D32"}
                        />
                        <Text className={`text-sm font-medium ml-1 ${
                          likedIssues.has(issue.id) ? 'text-white' : 'text-green-700'
                        }`}>
                          {issue.votes}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center">
                        <Ionicons name="chatbubble-outline" size={14} color="#757575" />
                        <Text className="text-gray-500 text-sm ml-1">{issue.comments.length}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="share-outline" size={16} color="#757575" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View className="h-20" />
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-green-700 rounded-full items-center justify-center shadow-lg"
        onPress={handleAddReport}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
