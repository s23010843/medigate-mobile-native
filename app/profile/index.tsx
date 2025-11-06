import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import Header from "../../components/ui/header";
import { useData } from '../../contexts/DataContext';

import "../../global.css";

export default function ProfileScreen() {
    const router = useRouter();
    const { user } = useData();

    if (!user) {
        return (
            <View className="flex-1 bg-gray-50 items-center justify-center">
                <Text className="text-xl text-gray-600">Loading profile...</Text>
            </View>
        );
    }

    const profileSections = [
        {
            title: 'Personal Information',
            items: [
                { icon: 'person', label: 'Full Name', value: user.fullName || 'Not specified' },
                { icon: 'mail', label: 'Email', value: user.email || 'Not specified' },
                { icon: 'call', label: 'Phone', value: user.phone || 'Not specified' },
                { icon: 'calendar', label: 'Date of Birth', value: user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified' },
                { icon: 'transgender', label: 'Gender', value: user.gender || 'Not specified' },
            ]
        },
        {
            title: 'Medical Information',
            items: [
                { icon: 'water', label: 'Blood Type', value: user.medicalInfo?.bloodType || 'Not specified' },
                { icon: 'fitness', label: 'Height', value: user.medicalInfo?.height || 'Not specified' },
                { icon: 'speedometer', label: 'Weight', value: user.medicalInfo?.weight || 'Not specified' },
                { icon: 'warning', label: 'Allergies', value: user.medicalInfo?.allergies?.length > 0 ? user.medicalInfo.allergies.join(', ') : 'None' },
                { icon: 'medical', label: 'Conditions', value: user.medicalInfo?.chronicConditions?.length > 0 ? user.medicalInfo.chronicConditions.join(', ') : 'None' },
            ]
        },
        {
            title: 'Insurance Information',
            items: [
                { icon: 'shield', label: 'Provider', value: user.medicalInfo?.insuranceProvider || 'Not specified' },
                { icon: 'card', label: 'Insurance ID', value: user.medicalInfo?.insuranceId || 'Not specified' },
            ]
        },
        {
            title: 'Emergency Contact',
            items: [
                { icon: 'person', label: 'Name', value: user.emergencyContact?.name || 'Not specified' },
                { icon: 'heart', label: 'Relationship', value: user.emergencyContact?.relationship || 'Not specified' },
                { icon: 'call', label: 'Phone', value: user.emergencyContact?.phone || 'Not specified' },
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
                            <Text className="text-5xl">{user.avatar || '👤'}</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 mb-1">
                            {user.fullName || 'User'}
                        </Text>
                        <Text className="text-base text-gray-600 mb-4">
                            Patient ID: #{user.id ? user.id.toString().padStart(5, '0') : '00000'}
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
