import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import Header from "../../components/ui/header";

import "../../global.css";

export default function HealthRecordsScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;

    const titleSize = isSmartWatch ? 'text-xl' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const cardTitleSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const iconSize = isSmartWatch ? 20 : isMobile ? 24 : isTablet ? 28 : 32;
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : 'px-16 py-12';

    const records = [
        { id: 1, title: "Blood Test Results", date: "Oct 28, 2025", type: "Lab Report", icon: "flask" },
        { id: 2, title: "X-Ray Chest", date: "Oct 15, 2025", type: "Imaging", icon: "image" },
        { id: 3, title: "Prescription - Antibiotics", date: "Oct 10, 2025", type: "Prescription", icon: "medical" }
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Health Records - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="dark-content" />
                
                {/* Header */}
                <Header title="Health Records" subtitle="Manage your medical documents" />

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Upload Card */}
                    <TouchableOpacity className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 shadow-xl elevation-4 mb-6">
                        <View className="flex-row items-center">
                            <View className="bg-white/20 rounded-full p-4">
                                <Ionicons name="cloud-upload" size={iconSize} color="white" />
                            </View>
                            <View className="flex-1 ml-4">
                                <Text className={`${cardTitleSize} font-bold text-white`}>
                                    Upload New Record
                                </Text>
                                <Text className={`${textSize} text-blue-100 mt-1`}>
                                    Add lab reports, prescriptions, or scans
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={iconSize} color="white" />
                        </View>
                    </TouchableOpacity>

                    {/* Categories */}
                    <View className="flex-row gap-3 mb-6">
                        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-lg elevation-2 items-center">
                            <View className="bg-blue-100 rounded-full p-3 mb-2">
                                <Ionicons name="flask" size={iconSize} color="#2563EB" />
                            </View>
                            <Text className={`${textSize} font-semibold text-gray-900`}>
                                Lab Reports
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-lg elevation-2 items-center">
                            <View className="bg-green-100 rounded-full p-3 mb-2">
                                <Ionicons name="medical" size={iconSize} color="#10B981" />
                            </View>
                            <Text className={`${textSize} font-semibold text-gray-900`}>
                                Prescriptions
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-lg elevation-2 items-center">
                            <View className="bg-purple-100 rounded-full p-3 mb-2">
                                <Ionicons name="image" size={iconSize} color="#8B5CF6" />
                            </View>
                            <Text className={`${textSize} font-semibold text-gray-900`}>
                                Scans
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Records List */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Recent Records
                        </Text>
                        <View className="gap-3">
                            {records.map((record) => (
                                <TouchableOpacity
                                    key={record.id}
                                    className="flex-row items-center bg-gray-50 rounded-xl p-4 border border-gray-200"
                                    activeOpacity={0.7}
                                >
                                    <View className="bg-blue-100 rounded-full p-3 mr-4">
                                        <Ionicons name={record.icon as any} size={iconSize} color="#2563EB" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className={`${textSize} font-bold text-gray-900`}>
                                            {record.title}
                                        </Text>
                                        <Text className={`${textSize} text-gray-600 mt-1`}>
                                            {record.type} • {record.date}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Info Card */}
                    <View className="bg-blue-50 rounded-3xl p-6 shadow-lg elevation-2 mb-6 border border-blue-200">
                        <View className="flex-row items-start">
                            <Ionicons name="shield-checkmark" size={iconSize} color="#2563EB" />
                            <View className="flex-1 ml-3">
                                <Text className={`${textSize} font-bold text-blue-900 mb-2`}>
                                    Your data is secure
                                </Text>
                                <Text className={`${textSize} text-blue-700`}>
                                    All health records are encrypted and stored securely. Only you and authorized healthcare providers can access them.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <BottomNavigation />
            </View>
        </>
    );
}
