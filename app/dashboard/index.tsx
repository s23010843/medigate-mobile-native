import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function DashboardScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;

    const titleSize = isSmartWatch ? 'text-xl' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const subtitleSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const cardTitleSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const textSize = isSmartWatch ? 'text-[10px]' : isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg';
    const iconSize = isSmartWatch ? 24 : isMobile ? 32 : isTablet ? 40 : 48;
    const containerPadding = isSmartWatch ? 'px-2 py-3' : isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : isDesktop ? 'px-16 py-12' : 'px-24 py-16';
    const cardPadding = isSmartWatch ? 'p-3' : isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8';

    const handleLogout = () => {
        // TODO: Implement actual logout logic
        router.replace('/' as any);
    };

    const quickActions = [
        { id: 1, title: 'Book Appointment', icon: 'calendar', color: 'bg-blue-500' },
        { id: 2, title: 'Medical Records', icon: 'document-text', color: 'bg-green-500' },
        { id: 3, title: 'Prescriptions', icon: 'medical', color: 'bg-purple-500' },
        { id: 4, title: 'Messages', icon: 'chatbubbles', color: 'bg-orange-500' },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Dashboard - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View className="bg-blue-600 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 rounded-b-3xl shadow-lg">
                <View className="flex-row items-center justify-between mb-4 sm:mb-6">
                    <View>
                        <Text className={`${titleSize} font-bold text-white`}>
                            {isSmartWatch ? 'Dashboard' : 'Welcome Back'}
                        </Text>
                        {!isSmartWatch && (
                            <Text className={`${subtitleSize} text-blue-100 mt-1`}>
                                How can we help you today?
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity 
                        onPress={handleLogout}
                        className="bg-white/20 rounded-full p-2 sm:p-3"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="log-out-outline" size={isSmartWatch ? 18 : 24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                className={`flex-1 ${containerPadding}`}
                showsVerticalScrollIndicator={false}
            >
                {/* Quick Actions */}
                <View className="mb-6 sm:mb-8">
                    <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                        Quick Actions
                    </Text>
                    <View className="flex-row flex-wrap gap-3 sm:gap-4">
                        {quickActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                className={`${action.color} rounded-2xl ${cardPadding} items-center justify-center shadow-md elevation-4 flex-1 min-w-[40%] sm:min-w-[45%] md:min-w-[22%]`}
                                activeOpacity={0.8}
                            >
                                <Ionicons name={action.icon as any} size={iconSize} color="white" />
                                <Text className={`${textSize} text-white font-semibold text-center mt-2 sm:mt-3`}>
                                    {action.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Upcoming Appointments */}
                <View className="mb-6 sm:mb-8">
                    <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                        Upcoming Appointments
                    </Text>
                    <View className="bg-white rounded-2xl p-4 sm:p-6 shadow-md elevation-2">
                        <View className="items-center justify-center py-8 sm:py-12">
                            <Ionicons name="calendar-outline" size={iconSize} color="#9CA3AF" />
                            <Text className={`${textSize} text-gray-500 mt-3 text-center`}>
                                No upcoming appointments
                            </Text>
                            <TouchableOpacity className="mt-4 bg-blue-600 px-6 py-3 rounded-full">
                                <Text className={`${textSize} text-white font-semibold`}>
                                    Book Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Health Summary */}
                <View className="mb-6 sm:mb-8">
                    <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                        Health Summary
                    </Text>
                    <View className="bg-white rounded-2xl p-4 sm:p-6 shadow-md elevation-2">
                        <View className="flex-row items-center mb-4">
                            <View className="bg-green-100 rounded-full p-3 mr-4">
                                <Ionicons name="heart" size={isSmartWatch ? 20 : 24} color="#10B981" />
                            </View>
                            <View className="flex-1">
                                <Text className={`${textSize} text-gray-900 font-semibold`}>
                                    Overall Health
                                </Text>
                                <Text className={`${textSize} text-gray-500 mt-1`}>
                                    Looking Good
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity className="bg-gray-100 rounded-xl p-3 sm:p-4 mt-2">
                            <Text className={`${textSize} text-blue-600 font-semibold text-center`}>
                                View Full Report
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="mb-6 sm:mb-8">
                    <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                        Recent Activity
                    </Text>
                    <View className="bg-white rounded-2xl p-4 sm:p-6 shadow-md elevation-2">
                        <View className="items-center justify-center py-8 sm:py-12">
                            <Ionicons name="time-outline" size={iconSize} color="#9CA3AF" />
                            <Text className={`${textSize} text-gray-500 mt-3 text-center`}>
                                No recent activity
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        </>
    );
}
