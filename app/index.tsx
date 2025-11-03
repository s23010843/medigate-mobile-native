import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

import "../global.css";

export default function WelcomeScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/account-setup' as any);
    };

    return (
        <View className="flex-1 bg-gradient-to-b from-blue-600 to-blue-900">
            <StatusBar barStyle="light-content" />
            
            {/* Blue Gradient Background */}
            <View className="absolute inset-0 bg-blue-600" />
            <View className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 opacity-90" />

            <View className="flex-1 items-center justify-between px-6 py-12 relative">
                {/* Top Section - Logo and Branding */}
                <View className="items-center mt-16">
                    <View className="bg-white rounded-3xl p-8 shadow-2xl mb-8 elevation-8">
                        <Image 
                            className="w-28 h-28" 
                            source={require("../assets/images/favicon.png")} 
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-6xl font-extrabold text-white text-center mb-4 tracking-tight">
                        MediGate
                    </Text>
                    <Text className="text-xl text-blue-100 text-center font-medium px-4">
                        Your Healthcare Journey Starts Here
                    </Text>
                </View>

                {/* Middle Section - Features */}
                <View className="w-full gap-4 mt-8">
                    <View className="flex-row items-center bg-white/20 rounded-2xl p-5 border border-white/30">
                        <View className="bg-white/30 rounded-full p-3 mr-4">
                            <Ionicons name="shield-checkmark" size={28} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-bold text-lg">Secure & Private</Text>
                            <Text className="text-blue-50 text-sm mt-1">Your health data is encrypted and protected</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center bg-white/20 rounded-2xl p-5 border border-white/30">
                        <View className="bg-white/30 rounded-full p-3 mr-4">
                            <Ionicons name="calendar" size={28} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-bold text-lg">Easy Appointments</Text>
                            <Text className="text-blue-50 text-sm mt-1">Book and manage appointments effortlessly</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center bg-white/20 rounded-2xl p-5 border border-white/30">
                        <View className="bg-white/30 rounded-full p-3 mr-4">
                            <Ionicons name="medical" size={28} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white font-bold text-lg">Expert Care</Text>
                            <Text className="text-blue-50 text-sm mt-1">Connect with qualified healthcare professionals</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Section - CTA */}
                <View className="w-full mb-8">
                    <TouchableOpacity
                        onPress={handleGetStarted}
                        className="bg-white rounded-full py-5 shadow-2xl elevation-8"
                        activeOpacity={0.85}
                    >
                        <View className="flex-row items-center justify-center">
                            <Text className="text-blue-700 text-xl font-bold mr-2">
                                Get Started
                            </Text>
                            <Ionicons name="arrow-forward" size={24} color="#1d4ed8" />
                        </View>
                    </TouchableOpacity>

                    <Text className="text-blue-100 text-center text-sm mt-6 px-8 leading-5">
                        By continuing, you agree to our{' '}
                        <Text className="text-white font-bold">Terms of Service</Text>
                        {' '}and{' '}
                        <Text className="text-white font-bold">Privacy Policy</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}