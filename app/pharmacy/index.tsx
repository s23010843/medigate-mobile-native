import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function PharmacyScreen() {
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

    const pharmacies = [
        { 
            id: 1, 
            name: "CVS Pharmacy", 
            distance: "0.5 mi", 
            rating: 4.5,
            open: true,
            address: "123 Main St, City, State"
        },
        { 
            id: 2, 
            name: "Walgreens", 
            distance: "0.8 mi", 
            rating: 4.3,
            open: true,
            address: "456 Oak Ave, City, State"
        },
        { 
            id: 3, 
            name: "Rite Aid", 
            distance: "1.2 mi", 
            rating: 4.2,
            open: false,
            address: "789 Elm St, City, State"
        }
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Pharmacy - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="light-content" />
                
                {/* Header */}
                <View className="bg-blue-600 px-4 py-6 sm:px-6 sm:py-8 rounded-b-3xl shadow-lg">
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="flex-row items-center mb-4"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text className={`${textSize} text-white ml-2 font-semibold`}>
                            Back
                        </Text>
                    </TouchableOpacity>
                    <Text className={`${titleSize} font-bold text-white mb-4`}>
                        Find Pharmacy
                    </Text>
                    
                    {/* Search Bar */}
                    <View className="flex-row items-center bg-white rounded-full px-4 py-3">
                        <Ionicons name="search" size={20} color="#6B7280" />
                        <TextInput
                            className={`flex-1 ml-3 ${textSize} text-gray-900`}
                            placeholder="Search for pharmacies..."
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Quick Actions */}
                    <View className="flex-row gap-3 mb-6">
                        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-lg elevation-2 items-center">
                            <View className="bg-blue-100 rounded-full p-3 mb-2">
                                <Ionicons name="document-text" size={iconSize} color="#2563EB" />
                            </View>
                            <Text className={`${textSize} font-semibold text-gray-900 text-center`}>
                                Prescriptions
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-lg elevation-2 items-center">
                            <View className="bg-green-100 rounded-full p-3 mb-2">
                                <Ionicons name="refresh" size={iconSize} color="#10B981" />
                            </View>
                            <Text className={`${textSize} font-semibold text-gray-900 text-center`}>
                                Refills
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-lg elevation-2 items-center">
                            <View className="bg-purple-100 rounded-full p-3 mb-2">
                                <Ionicons name="time" size={iconSize} color="#8B5CF6" />
                            </View>
                            <Text className={`${textSize} font-semibold text-gray-900 text-center`}>
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Nearby Pharmacies */}
                    <View className="mb-4">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Nearby Pharmacies
                        </Text>
                        <View className="gap-4">
                            {pharmacies.map((pharmacy) => (
                                <TouchableOpacity
                                    key={pharmacy.id}
                                    className="bg-white rounded-3xl p-5 shadow-lg elevation-2"
                                    activeOpacity={0.7}
                                >
                                    <View className="flex-row items-start justify-between mb-3">
                                        <View className="flex-1">
                                            <Text className={`${cardTitleSize} font-bold text-gray-900`}>
                                                {pharmacy.name}
                                            </Text>
                                            <View className="flex-row items-center mt-2">
                                                <Ionicons name="location" size={16} color="#6B7280" />
                                                <Text className={`${textSize} text-gray-600 ml-1`}>
                                                    {pharmacy.distance}
                                                </Text>
                                                <Text className="text-gray-400 mx-2">•</Text>
                                                <Ionicons name="star" size={16} color="#FBBF24" />
                                                <Text className={`${textSize} text-gray-600 ml-1`}>
                                                    {pharmacy.rating}
                                                </Text>
                                            </View>
                                        </View>
                                        <View className={`px-3 py-1 rounded-full ${
                                            pharmacy.open ? 'bg-green-100' : 'bg-red-100'
                                        }`}>
                                            <Text className={`${textSize} font-semibold ${
                                                pharmacy.open ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {pharmacy.open ? 'Open' : 'Closed'}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <Text className={`${textSize} text-gray-600 mb-4`}>
                                        {pharmacy.address}
                                    </Text>
                                    
                                    <View className="flex-row gap-2">
                                        <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-full">
                                            <Text className={`${buttonTextSize} text-white text-center font-semibold`}>
                                                Get Directions
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="bg-blue-100 px-4 py-3 rounded-full">
                                            <Ionicons name="call" size={20} color="#2563EB" />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Info Card */}
                    <View className="bg-blue-50 rounded-3xl p-6 shadow-lg elevation-2 mb-6 border border-blue-200">
                        <View className="flex-row items-start">
                            <Ionicons name="information-circle" size={iconSize} color="#2563EB" />
                            <View className="flex-1 ml-3">
                                <Text className={`${textSize} font-bold text-blue-900 mb-2`}>
                                    Easy Prescription Transfer
                                </Text>
                                <Text className={`${textSize} text-blue-700`}>
                                    Transfer your prescriptions to any pharmacy with just a few taps. We'll handle the rest!
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
