import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Alert, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Footer from "../../components/ui/footer";

import "../../global.css";

export default function AppointmentBookingScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const handleConfirm = () => {
        Alert.alert(
            'Appointment Confirmed',
            'Your appointment has been successfully booked!',
            [
                { text: 'OK', onPress: () => router.back() }
            ]
        );
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel Booking',
            'Are you sure you want to cancel this booking?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => router.back() }
            ]
        );
    };

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

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Book Appointment - MediGate",
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
                    <Text className={`${titleSize} font-bold text-white`}>
                        Book Appointment
                    </Text>
                </View>

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Select Date */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Select Date
                        </Text>
                        <TouchableOpacity className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4">
                            <Ionicons name="calendar" size={iconSize} color="#2563EB" />
                            <Text className={`${textSize} text-gray-900 ml-3 flex-1`}>
                                Choose a date
                            </Text>
                            <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Select Time */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Select Time
                        </Text>
                        <View className="flex-row flex-wrap gap-3">
                            {timeSlots.map((time, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-gray-100"
                                    activeOpacity={0.7}
                                >
                                    <Text className={`${textSize} text-gray-700 font-semibold`}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Appointment Type */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Appointment Type
                        </Text>
                        <View className="gap-3">
                            <TouchableOpacity className="flex-row items-center bg-blue-50 border-2 border-blue-600 rounded-xl px-4 py-4">
                                <Ionicons name="videocam" size={iconSize} color="#2563EB" />
                                <Text className={`${textSize} text-blue-600 font-bold ml-3`}>
                                    Video Consultation
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4">
                                <Ionicons name="location" size={iconSize} color="#6B7280" />
                                <Text className={`${textSize} text-gray-700 font-semibold ml-3`}>
                                    In-Person Visit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-3 mb-6">
                        {/* Confirm Button */}
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className="bg-blue-600 rounded-full py-5 shadow-xl elevation-4"
                            activeOpacity={0.85}
                        >
                            <Text className={`${buttonTextSize} text-white text-center font-bold`}>
                                Confirm Appointment
                            </Text>
                        </TouchableOpacity>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            onPress={handleCancel}
                            className="bg-white border-2 border-red-500 rounded-full py-5 shadow-lg elevation-2"
                            activeOpacity={0.85}
                        >
                            <Text className={`${buttonTextSize} text-red-500 text-center font-bold`}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
                {/* Footer */}
                <Footer />
            </View>
        </>
    );
}
