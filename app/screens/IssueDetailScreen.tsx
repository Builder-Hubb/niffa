import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Comment, currentUser, getIssueById, Issue } from '../data/mockData';

export default function IssueDetailScreen() {
  const { issueId } = useLocalSearchParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (issueId) {
      const foundIssue = getIssueById(issueId);
      if (foundIssue) {
        setIssue(foundIssue);
        setIsLiked(foundIssue.likedBy.includes(currentUser.id));
        setComments(foundIssue.comments);
      }
    }
  }, [issueId]);

  const handleLikeToggle = () => {
    if (!issue) return;

    setIsLiked(!isLiked);
    setIssue({
      ...issue,
      votes: isLiked ? issue.votes - 1 : issue.votes + 1
    });
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !issue) return;

    setIsSubmittingComment(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        text: commentText.trim(),
        timestamp: 'Just now',
        likes: 0
      };

      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to post comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleOpenMap = () => {
    if (!issue?.coordinates) {
      Alert.alert('Location not available', 'GPS coordinates are not available for this issue.');
      return;
    }

    const { latitude, longitude } = issue.coordinates;
    const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open maps application.');
    });
  };

  const handleShare = () => {
    Alert.alert(
      'Share Issue',
      'Choose how you want to share this issue',
      [
        { text: 'Copy Link', onPress: () => Alert.alert('Link copied to clipboard') },
        { text: 'Social Media', onPress: () => Alert.alert('Opening share options...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-100' };
      case 'in-progress': return { bg: 'bg-blue-500', text: 'text-blue-700', lightBg: 'bg-blue-100' };
      case 'resolved': return { bg: 'bg-green-500', text: 'text-green-700', lightBg: 'bg-green-100' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-700', lightBg: 'bg-gray-100' };
    }
  };

  if (!issue) {
    return (
      <SafeAreaView className="flex-1 bg-[#FDFDFD] items-center justify-center">
        <Text className="text-gray-500">Issue not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-4 py-2 bg-green-700 rounded-lg"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const statusConfig = getStatusColor(issue.status);

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" />

      <View className="px-6 pt-4 pb-2 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Issue Details</Text>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Issue Image */}
        <View className="relative">
          <Image
            source={{ uri: issue.image }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="absolute top-4 left-4">
            <View className={`px-3 py-1 rounded-full ${statusConfig.bg}`}>
              <Text className="text-white text-sm font-medium capitalize">
                {issue.status.replace('-', ' ')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full items-center justify-center"
            onPress={handleLikeToggle}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? "#EF4444" : "#757575"}
            />
          </TouchableOpacity>
        </View>

        <View className="px-6 py-6">
          <Text className="text-2xl font-bold text-gray-900 mb-3">
            {issue.title}
          </Text>

          <View className={`self-start px-3 py-1 rounded-full mb-4 ${statusConfig.lightBg}`}>
            <Text className={`text-sm font-medium ${statusConfig.text}`}>
              Status: {issue.status.replace('-', ' ').toUpperCase()}
            </Text>
          </View>


          <View className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-xl">
            <Image
              source={{ uri: issue.userAvatar }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="font-semibold text-gray-900">{issue.userName}</Text>
              <Text className="text-gray-500 text-sm">Reported {issue.timeAgo}</Text>
            </View>
          </View>

          <Text className="text-gray-700 text-base leading-6 mb-6">
            {issue.description}
          </Text>

          <TouchableOpacity
            onPress={handleOpenMap}
            className="flex-row items-center p-4 bg-blue-50 rounded-xl mb-6"
          >
            <Ionicons name="location" size={20} color="#3B82F6" />
            <View className="flex-1 ml-3">
              <Text className="font-semibold text-gray-900">Location</Text>
              <Text className="text-gray-600 text-sm">{issue.location}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
            <TouchableOpacity
              onPress={handleLikeToggle}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                isLiked ? 'bg-green-700' : 'bg-white border border-gray-200'
              }`}
            >
              <Ionicons
                name={isLiked ? "arrow-up" : "arrow-up-outline"}
                size={16}
                color={isLiked ? "white" : "#2E7D32"}
              />
              <Text className={`ml-2 font-medium ${
                isLiked ? 'text-white' : 'text-green-700'
              }`}>
                {issue.votes} Votes
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
              <Ionicons name="chatbubble-outline" size={16} color="#757575" />
              <Text className="text-gray-600 ml-1">{comments.length} Comments</Text>
            </View>
          </View>

          {/* comments */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Comments ({comments.length})
            </Text>

            {/* add comment */}
            <View className="mb-6">
              <View className="flex-row items-start p-4 bg-gray-50 rounded-xl">
                <Image
                  source={{ uri: currentUser.avatar }}
                  className="w-8 h-8 rounded-full mr-3 mt-1"
                />
                <View className="flex-1">
                  <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder="Add a comment..."
                    multiline
                    className="text-base text-gray-900 mb-3"
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity
                    onPress={handleSubmitComment}
                    disabled={!commentText.trim() || isSubmittingComment}
                    className={`self-start px-4 py-2 rounded-lg ${
                      commentText.trim() && !isSubmittingComment
                        ? 'bg-green-700'
                        : 'bg-gray-300'
                    }`}
                  >
                    <Text className="text-white font-medium">
                      {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {comments.map((comment) => (
              <View key={comment.id} className="mb-4 p-4 bg-white border border-gray-100 rounded-xl">
                <View className="flex-row items-start">
                  <Image
                    source={{ uri: comment.userAvatar }}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="font-semibold text-gray-900 mr-2">
                        {comment.userName}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {comment.timestamp}
                      </Text>
                    </View>
                    <Text className="text-gray-700 text-sm leading-5 mb-2">
                      {comment.text}
                    </Text>
                    <TouchableOpacity className="flex-row items-center">
                      <Ionicons name="heart-outline" size={14} color="#9CA3AF" />
                      <Text className="text-gray-500 text-xs ml-1">
                        {comment.likes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {comments.length === 0 && (
              <View className="items-center py-8">
                <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 mt-2">No comments yet</Text>
                <Text className="text-gray-400 text-sm">Be the first to comment</Text>
              </View>
            )}
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
