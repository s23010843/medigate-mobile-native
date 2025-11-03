import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import Header from "../../components/ui/header";
import SearchBox from "../../components/ui/search-box";

import "../../global.css";

export default function DashboardScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [searchQuery, setSearchQuery] = useState('');

    // Mock doctor data
    const doctors = [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', phone: '+1 234-567-8901', avatar: '👩‍⚕️', lastSeen: 'Online', verified: true },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatrician', phone: '+1 234-567-8902', avatar: '👨‍⚕️', lastSeen: 'Last seen 5m ago', verified: true },
        { id: 3, name: 'Dr. Emily Davis', specialty: 'Dermatologist', phone: '+1 234-567-8903', avatar: '👩‍⚕️', lastSeen: 'Last seen 1h ago', verified: false },
        { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedic', phone: '+1 234-567-8904', avatar: '👨‍⚕️', lastSeen: 'Last seen 2h ago', verified: true },
        { id: 5, name: 'Dr. Linda Martinez', specialty: 'Neurologist', phone: '+1 234-567-8905', avatar: '👩‍⚕️', lastSeen: 'Online', verified: true },
        { id: 6, name: 'Dr. Robert Taylor', specialty: 'General Physician', phone: '+1 234-567-8906', avatar: '👨‍⚕️', lastSeen: 'Last seen 30m ago', verified: false },
    ];

    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.phone.includes(searchQuery)
    );

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

    const handleDoctorPress = (doctorId: number) => {
        router.push(`/doctor-profile?id=${doctorId}` as any);
    };

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
            <Header title="Doctors" subtitle="Find and connect with doctors" />

            {/* Search Box */}
            <View className="px-4 pt-4">
                <SearchBox 
                    placeholder="Search doctors, specialties, or phone..." 
                    onSearch={setSearchQuery}
                />
            </View>

            {/* Doctor List - WhatsApp-like UI */}
            <ScrollView 
                className="flex-1"
                showsVerticalScrollIndicator={false}
            >
                {filteredDoctors.map((doctor) => (
                    <TouchableOpacity
                        key={doctor.id}
                        onPress={() => handleDoctorPress(doctor.id)}
                        className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center"
                        activeOpacity={0.7}
                    >
                        {/* Avatar */}
                        <View className="mr-3">
                            <View className="w-14 h-14 rounded-full bg-blue-100 items-center justify-center">
                                <Text className="text-3xl">{doctor.avatar}</Text>
                            </View>
                            {doctor.verified && (
                                <View className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5">
                                    <Ionicons name="checkmark" size={12} color="white" />
                                </View>
                            )}
                        </View>

                        {/* Doctor Info */}
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between mb-1">
                                <Text className="text-gray-900 font-semibold text-base">
                                    {doctor.name}
                                </Text>
                                <Text className="text-gray-400 text-xs">
                                    {doctor.lastSeen === 'Online' ? 'Online' : doctor.lastSeen}
                                </Text>
                            </View>
                            <Text className="text-gray-600 text-sm mb-1">
                                {doctor.specialty}
                            </Text>
                            <Text className="text-gray-400 text-xs">
                                {doctor.phone}
                            </Text>
                        </View>

                        {/* Status Indicator */}
                        {doctor.lastSeen === 'Online' && (
                            <View className="w-3 h-3 bg-green-500 rounded-full ml-2" />
                        )}
                    </TouchableOpacity>
                ))}

                {filteredDoctors.length === 0 && (
                    <View className="items-center justify-center py-20">
                        <Ionicons name="search-outline" size={64} color="#9CA3AF" />
                        <Text className="text-gray-500 mt-4 text-center">
                            No doctors found
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
