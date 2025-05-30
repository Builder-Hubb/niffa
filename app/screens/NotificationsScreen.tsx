import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { mockNotifications, Notification } from '../data/mockData';


export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = async () => {
    setRefreshing(true);
    // will connect to firebase for notifications
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);

    if (notification.issueId) {
      router.push({
        pathname: '/screens/IssueDetailScreen',
        params: { issueId: notification.issueId }
      });
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return { name: 'heart', color: '#EF4444' };
      case 'comment':
        return { name: 'chatbubble', color: '#3B82F6' };
      case 'status_update':
        return { name: 'refresh-circle', color: '#F59E0B' };
      case 'report_approved':
        return { name: 'checkmark-circle', color: '#10B981' };
      case 'system':
        return { name: 'information-circle', color: '#8B5CF6' };
      default:
        return { name: 'notifications', color: '#6B7280' };
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-gray-900">Notifications</Text>
            {unreadCount > 0 && (
              <View className="ml-2 w-6 h-6 bg-red-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text className="text-green-700 font-medium">Mark all read</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <View className="items-center justify-center py-12 px-6">
            <Ionicons name="notifications-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-center mt-4 text-lg font-medium">
              No notifications yet
            </Text>
            <Text className="text-gray-400 text-center mt-2 text-sm">
              When people interact with your reports, you'll see notifications here
            </Text>
          </View>
        ) : (
          <View className="px-6 py-4">
            {notifications.map((notification) => {
              const iconConfig = getNotificationIcon(notification.type);

              return (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => handleNotificationPress(notification)}
                  className={`mb-4 p-4 rounded-2xl border ${
                    notification.isRead
                      ? 'bg-white border-gray-100'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <View className="flex-row">
                    <View className="mr-3">
                      {notification.userAvatar ? (
                        <View className="relative">
                          <Image
                            source={{ uri: notification.userAvatar }}
                            className="w-12 h-12 rounded-full"
                          />
                          <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full items-center justify-center">
                            <Ionicons
                              name={iconConfig.name as any}
                              size={12}
                              color={iconConfig.color}
                            />
                          </View>
                        </View>
                      ) : (
                        <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
                          <Ionicons
                            name={iconConfig.name as any}
                            size={20}
                            color={iconConfig.color}
                          />
                        </View>
                      )}
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-1">
                        <Text className="text-base font-semibold text-gray-900">
                          {notification.title}
                        </Text>
                        {!notification.isRead && (
                          <View className="w-3 h-3 bg-blue-500 rounded-full ml-2 mt-1" />
                        )}
                      </View>

                      <Text className="text-gray-600 text-sm leading-5 mb-2">
                        {notification.message}
                      </Text>

                      {notification.issueTitle && (
                        <View className="bg-gray-50 px-3 py-2 rounded-lg mb-2">
                          <Text className="text-gray-700 text-sm font-medium">
                            {notification.issueTitle}
                          </Text>
                        </View>
                      )}

                      <Text className="text-gray-400 text-xs">
                        {notification.timestamp}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
