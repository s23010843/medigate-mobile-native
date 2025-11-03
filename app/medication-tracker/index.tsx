import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, Switch, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function MedicationTrackerScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
            color: "bg-blue-500"
        },
        { 
            id: 2, 
            name: "Vitamin D", 
            dosage: "2000 IU", 
            frequency: "Once daily", 
            time: "9:00 AM", 
            taken: false,
            color: "bg-orange-500"
        },
        { 
            id: 3, 
            name: "Blood Pressure Med", 
            dosage: "10mg", 
            frequency: "Once daily", 
            time: "8:00 PM", 
            taken: false,
            color: "bg-green-500"
        }
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Medication Tracker - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="light-content" />
                
                {/* Header */}
                <View className="bg-blue-600 px-4 py-6 sm:px-6 sm:py-8 rounded-b-3xl shadow-lg">
                    <View className="flex-row items-center justify-between mb-4">
                        <TouchableOpacity 
                            onPress={() => router.back()}
                            className="flex-row items-center"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                            <Text className={`${textSize} text-white ml-2 font-semibold`}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className="bg-white/20 rounded-full p-2"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className={`${titleSize} font-bold text-white`}>
                        Medication Tracker
                    </Text>
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
                            Today's Schedule
                        </Text>
                        <View className="gap-4">
                            {medications.map((med) => (
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
                                        {!med.taken && (
                                            <TouchableOpacity
                                                className="bg-blue-600 px-4 py-2 rounded-full"
                                                activeOpacity={0.7}
                                            >
                                                <Text className={`${textSize} text-white font-semibold`}>
                                                    Mark Taken
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
            </View>
        </>
    );
}
