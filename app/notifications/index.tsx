import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import Header from "../../components/ui/header";
import { useData } from '../../contexts/DataContext';

import "../../global.css";

export default function NotificationsScreen() {
    const router = useRouter();
    const { notifications, markNotificationAsRead } = useData();

    const handleNotificationPress = (notification: any) => {
        markNotificationAsRead(notification.id);
        if (notification.actionable && notification.action) {
            router.push(notification.action as any);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Notifications",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="dark-content" />
                
                {/* Header */}
                <Header 
                    title="Notifications" 
                    subtitle={unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'} 
                />

                <ScrollView 
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Mark All as Read */}
                    {unreadCount > 0 && (
                        <View className="px-4 pt-4">
                            <TouchableOpacity className="bg-blue-50 rounded-2xl py-3 px-4">
                                <Text className="text-blue-600 font-semibold text-center">
                                    Mark all as read
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Notifications List */}
                    <View className="px-4 py-4">
                        {notifications.map((notification, index) => (
                            <TouchableOpacity
                                key={notification.id}
                                onPress={() => handleNotificationPress(notification)}
                                className={`bg-white rounded-2xl p-4 mb-3 shadow-sm elevation-2 ${
                                    !notification.read ? 'border-2 border-blue-200' : ''
                                }`}
                                activeOpacity={0.7}
                            >
                                <View className="flex-row items-start">
                                    <View className={`${notification.iconBg} rounded-full p-3 mr-3`}>
                                        <Ionicons 
                                            name={notification.icon as any} 
                                            size={24} 
                                            color={notification.iconColor} 
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row items-center justify-between mb-1">
                                            <Text className="text-base font-bold text-gray-900">
                                                {notification.title}
                                            </Text>
                                            {!notification.read && (
                                                <View className="w-2 h-2 bg-blue-600 rounded-full" />
                                            )}
                                        </View>
                                        <Text className="text-sm text-gray-600 mb-2 leading-5">
                                            {notification.message}
                                        </Text>
                                        <Text className="text-xs text-gray-400">
                                            {notification.time}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Empty State (if no notifications) */}
                    {notifications.length === 0 && (
                        <View className="items-center justify-center py-20">
                            <Ionicons name="notifications-off-outline" size={80} color="#9CA3AF" />
                            <Text className="text-gray-500 mt-4 text-center text-lg">
                                No notifications yet
                            </Text>
                            <Text className="text-gray-400 mt-2 text-center">
                                We'll notify you when something important happens
                            </Text>
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Navigation */}
                <BottomNavigation />
            </View>
        </>
    );
}
