import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import Header from "../../components/ui/header";

import "../../global.css";

export default function ProfileScreen() {
    const router = useRouter();

    const profileSections = [
        {
            title: 'Personal Information',
            items: [
                { icon: 'person', label: 'Full Name', value: 'John Doe' },
                { icon: 'mail', label: 'Email', value: 'john.doe@example.com' },
                { icon: 'call', label: 'Phone', value: '+1 234-567-8900' },
                { icon: 'calendar', label: 'Date of Birth', value: 'January 15, 1990' },
            ]
        },
        {
            title: 'Medical Information',
            items: [
                { icon: 'water', label: 'Blood Type', value: 'O+' },
                { icon: 'fitness', label: 'Height', value: '5\'10"' },
                { icon: 'speedometer', label: 'Weight', value: '165 lbs' },
                { icon: 'warning', label: 'Allergies', value: 'Penicillin' },
            ]
        },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="dark-content" />
                
                {/* Header */}
                <Header title="Profile" subtitle="Manage your account information" />

                <ScrollView 
                    className="flex-1 px-4 py-6"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Picture & Basic Info */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-4 mb-6 items-center">
                        <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-4">
                            <Text className="text-5xl">👤</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 mb-1">
                            John Doe
                        </Text>
                        <Text className="text-base text-gray-600 mb-4">
                            Patient ID: #12345
                        </Text>
                        <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
                            <Text className="text-white font-semibold">
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Profile Sections */}
                    {profileSections.map((section, sectionIndex) => (
                        <View key={sectionIndex} className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                            <Text className="text-xl font-bold text-gray-900 mb-4">
                                {section.title}
                            </Text>
                            <View className="gap-4">
                                {section.items.map((item, itemIndex) => (
                                    <View key={itemIndex} className="flex-row items-center">
                                        <View className="bg-blue-100 rounded-full p-3 mr-4">
                                            <Ionicons name={item.icon as any} size={20} color="#2563EB" />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-sm text-gray-600">
                                                {item.label}
                                            </Text>
                                            <Text className="text-base font-semibold text-gray-900 mt-1">
                                                {item.value}
                                            </Text>
                                        </View>
                                        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}

                    {/* Quick Actions */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className="text-xl font-bold text-gray-900 mb-4">
                            Quick Actions
                        </Text>
                        <TouchableOpacity 
                            onPress={() => router.push('/settings' as any)}
                            className="flex-row items-center justify-between py-3 border-b border-gray-200"
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="settings" size={24} color="#2563EB" />
                                <Text className="text-base text-gray-900 ml-3">Settings</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => router.push('/privacy-policy' as any)}
                            className="flex-row items-center justify-between py-3 border-b border-gray-200"
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="shield-checkmark" size={24} color="#2563EB" />
                                <Text className="text-base text-gray-900 ml-3">Privacy Policy</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => router.push('/terms-and-conditions' as any)}
                            className="flex-row items-center justify-between py-3"
                        >
                            <View className="flex-row items-center">
                                <Ionicons name="document-text" size={24} color="#2563EB" />
                                <Text className="text-base text-gray-900 ml-3">Terms & Conditions</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        onPress={() => router.replace('/' as any)}
                        className="bg-red-600 rounded-full py-4 shadow-lg elevation-4 mb-6"
                        activeOpacity={0.85}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Bottom Navigation */}
                <BottomNavigation />
            </View>
        </>
    );
}
