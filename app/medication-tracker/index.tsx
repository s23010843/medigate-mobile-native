import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, Switch, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import Header from "../../components/ui/header";
import SearchBox from "../../components/ui/search-box";

import "../../global.css";

export default function MedicationTrackerScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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

    const medications = [
        { 
            id: 1, 
            name: "Amoxicillin", 
            dosage: "500mg", 
            frequency: "3 times daily", 
            time: "8:00 AM", 
            taken: true,
            available: true,
            color: "bg-blue-500"
        },
        { 
            id: 2, 
            name: "Vitamin D", 
            dosage: "2000 IU", 
            frequency: "Once daily", 
            time: "9:00 AM", 
            taken: false,
            available: true,
            color: "bg-orange-500"
        },
        { 
            id: 3, 
            name: "Blood Pressure Med", 
            dosage: "10mg", 
            frequency: "Once daily", 
            time: "8:00 PM", 
            taken: false,
            available: false,
            color: "bg-green-500"
        }
    ];

    const filteredMedications = medications.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Medication Tracker - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="dark-content" />
                
                {/* Header */}
                <Header title="Medications" subtitle="Track your medication schedule" />

                {/* Search Box */}
                <View className="px-4 pt-4">
                    <SearchBox 
                        placeholder="Search medications..." 
                        onSearch={setSearchQuery}
                    />
                </View>

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Today's Progress */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Today's Progress
                        </Text>
                        <View className="items-center">
                            <View className="w-32 h-32 rounded-full bg-blue-100 items-center justify-center mb-4">
                                <Text className="text-5xl font-bold text-blue-600">
                                    33%
                                </Text>
                            </View>
                            <Text className={`${textSize} text-gray-600`}>
                                1 of 3 medications taken
                            </Text>
                        </View>
                    </View>

                    {/* Reminder Settings */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <Ionicons name="notifications" size={iconSize} color="#2563EB" />
                                <View className="ml-3 flex-1">
                                    <Text className={`${textSize} font-bold text-gray-900`}>
                                        Medication Reminders
                                    </Text>
                                    <Text className={`${textSize} text-gray-600 mt-1`}>
                                        Get notified when it's time
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                                thumbColor={notificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
                            />
                        </View>
                    </View>

                    {/* Medications List */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Medications
                        </Text>
                        <View className="gap-4">
                            {filteredMedications.map((med) => (
                                <View
                                    key={med.id}
                                    className={`rounded-xl p-4 border-2 ${
                                        med.taken ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-200'
                                    }`}
                                >
                                    <View className="flex-row items-center justify-between mb-3">
                                        <View className="flex-row items-center flex-1">
                                            <View className={`${med.color} rounded-full p-2 mr-3`}>
                                                <Ionicons name="medical" size={20} color="white" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className={`${textSize} font-bold ${
                                                    med.taken ? 'text-gray-500 line-through' : 'text-gray-900'
                                                }`}>
                                                    {med.name}
                                                </Text>
                                                <Text className={`${textSize} ${
                                                    med.taken ? 'text-gray-400' : 'text-gray-600'
                                                } mt-1`}>
                                                    {med.dosage} • {med.frequency}
                                                </Text>
                                                <View className="flex-row items-center mt-2">
                                                    <Ionicons 
                                                        name={med.available ? "checkmark-circle" : "close-circle"} 
                                                        size={16} 
                                                        color={med.available ? "#10B981" : "#EF4444"} 
                                                    />
                                                    <Text className={`${textSize} ml-1 ${
                                                        med.available ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {med.available ? 'Available' : 'Not Available'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        {med.taken && (
                                            <View className="bg-green-100 rounded-full p-2">
                                                <Ionicons name="checkmark" size={20} color="#10B981" />
                                            </View>
                                        )}
                                    </View>
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center">
                                            <Ionicons name="time" size={16} color="#6B7280" />
                                            <Text className={`${textSize} text-gray-600 ml-2`}>
                                                {med.time}
                                            </Text>
                                        </View>
                                        {!med.taken && med.available && (
                                            <TouchableOpacity
                                                className="bg-blue-600 px-4 py-2 rounded-full flex-row items-center"
                                                activeOpacity={0.7}
                                            >
                                                <Ionicons name="add" size={16} color="white" />
                                                <Text className={`${textSize} text-white font-semibold ml-1`}>
                                                    Add
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Add Medication Button */}
                    <TouchableOpacity
                        className="bg-blue-600 rounded-full py-5 shadow-xl elevation-4 mb-6 flex-row items-center justify-center"
                        activeOpacity={0.85}
                    >
                        <Ionicons name="add-circle" size={iconSize} color="white" />
                        <Text className={`${buttonTextSize} text-white font-bold ml-2`}>
                            Add Medication
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Bottom Navigation */}
                <BottomNavigation />
            </View>
        </>
    );
}
