import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Footer from "../../components/ui/footer";

import "../../global.css";

export default function DoctorProfileScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;

    const titleSize = isSmartWatch ? 'text-xl' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const cardTitleSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const iconSize = isSmartWatch ? 20 : isMobile ? 24 : isTablet ? 28 : 32;
    const avatarSize = isSmartWatch ? 80 : isMobile ? 120 : isTablet ? 140 : 160;
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : 'px-16 py-12';

    // Mock doctor data
    const doctor = {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        experience: "15 years",
        rating: 4.8,
        reviews: 234,
        about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart disease management.",
        education: [
            "MD - Harvard Medical School",
            "Residency - Johns Hopkins Hospital",
            "Fellowship - Cleveland Clinic"
        ],
        languages: ["English", "Spanish", "French"],
        availability: "Mon-Fri: 9:00 AM - 5:00 PM"
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Doctor Profile - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gray-50">
                <StatusBar barStyle="light-content" />
                
                {/* Header with Back Button */}
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
                        Doctor Profile
                    </Text>
                </View>

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Doctor Info Card */}
                    <View className="bg-white rounded-3xl p-6 shadow-xl elevation-4 mb-6">
                        <View className="items-center mb-6">
                            <View className="bg-blue-100 rounded-full p-2 mb-4" style={{ width: avatarSize, height: avatarSize }}>
                                <Ionicons name="person" size={avatarSize - 20} color="#2563EB" />
                            </View>
                            <Text className={`${cardTitleSize} font-bold text-gray-900 text-center`}>
                                {doctor.name}
                            </Text>
                            <Text className={`${textSize} text-blue-600 font-semibold mt-1`}>
                                {doctor.specialty}
                            </Text>
                            
                            {/* Rating */}
                            <View className="flex-row items-center mt-3">
                                <Ionicons name="star" size={iconSize} color="#FBBF24" />
                                <Text className={`${textSize} font-bold text-gray-900 mx-2`}>
                                    {doctor.rating}
                                </Text>
                                <Text className={`${textSize} text-gray-500`}>
                                    ({doctor.reviews} reviews)
                                </Text>
                            </View>
                        </View>

                        {/* Quick Stats */}
                        <View className="flex-row justify-around border-t border-gray-200 pt-4">
                            <View className="items-center">
                                <Text className={`${cardTitleSize} font-bold text-blue-600`}>
                                    {doctor.experience}
                                </Text>
                                <Text className={`${textSize} text-gray-500 mt-1`}>
                                    Experience
                                </Text>
                            </View>
                            <View className="w-px bg-gray-200" />
                            <View className="items-center">
                                <Text className={`${cardTitleSize} font-bold text-blue-600`}>
                                    {doctor.reviews}+
                                </Text>
                                <Text className={`${textSize} text-gray-500 mt-1`}>
                                    Patients
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* About */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-3`}>
                            About
                        </Text>
                        <Text className={`${textSize} text-gray-600 leading-6`}>
                            {doctor.about}
                        </Text>
                    </View>

                    {/* Education */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-3`}>
                            Education
                        </Text>
                        {doctor.education.map((edu, index) => (
                            <View key={index} className="flex-row items-center mb-2">
                                <Ionicons name="school" size={iconSize} color="#2563EB" />
                                <Text className={`${textSize} text-gray-700 ml-3 flex-1`}>
                                    {edu}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Languages */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-3`}>
                            Languages
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                            {doctor.languages.map((lang, index) => (
                                <View key={index} className="bg-blue-100 px-4 py-2 rounded-full">
                                    <Text className={`${textSize} text-blue-600 font-semibold`}>
                                        {lang}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Availability */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-3`}>
                            Availability
                        </Text>
                        <View className="flex-row items-center">
                            <Ionicons name="time" size={iconSize} color="#2563EB" />
                            <Text className={`${textSize} text-gray-700 ml-3`}>
                                {doctor.availability}
                            </Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-3 mb-6">
                        <TouchableOpacity
                            onPress={() => router.push('/appointments' as any)}
                            className="flex-1 bg-blue-600 rounded-full py-4 shadow-xl elevation-4"
                            activeOpacity={0.85}
                        >
                            <Text className={`${buttonTextSize} text-white text-center font-bold`}>
                                Book Appointment
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-white rounded-full p-4 shadow-xl elevation-4 border-2 border-blue-600"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="chatbubble-outline" size={iconSize} color="#2563EB" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
                {/* Footer */}
                <Footer />
            </View>
        </>
    );
}
