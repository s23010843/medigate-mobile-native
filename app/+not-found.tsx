import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../global.css";

export default function NotFoundScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;

    const errorCodeSize = isSmartWatch ? 'text-6xl' : isMobile ? 'text-9xl' : isTablet ? 'text-[10rem]' : 'text-[12rem]';
    const titleSize = isSmartWatch ? 'text-lg' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const iconSize = isSmartWatch ? 80 : isMobile ? 120 : isTablet ? 150 : 180;
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-6 py-8' : isTablet ? 'px-12 py-12' : isDesktop ? 'px-24 py-16' : 'px-32 py-20';

    return (
        <>
            <Stack.Screen
                options={{
                    title: "404 Not Found - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gradient-to-b from-blue-600 to-blue-900">
            <StatusBar barStyle="light-content" />
            
            {/* Background */}
            <View className="absolute inset-0 bg-blue-600" />
            <View className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 opacity-90" />

            <View className={`flex-1 items-center justify-center ${containerPadding} relative`}>
                {/* Error Icon */}
                <View className="mb-8">
                    <Ionicons name="alert-circle-outline" size={iconSize} color="white" />
                </View>

                {/* Error Code */}
                <Text className={`${errorCodeSize} font-extrabold text-white/20 absolute`}>
                    404
                </Text>

                {/* Content */}
                <View className="items-center z-10 mt-16 sm:mt-20 md:mt-24">
                    <Text className={`${titleSize} font-bold text-white text-center mb-4`}>
                        {isSmartWatch ? 'Not Found' : 'Page Not Found'}
                    </Text>
                    <Text className={`${textSize} text-blue-100 text-center px-4 sm:px-8 mb-8 sm:mb-12 leading-6`}>
                        {isSmartWatch 
                            ? 'Page does not exist' 
                            : 'Oops! The page you are looking for does not exist or has been moved.'}
                    </Text>

                    {/* Buttons */}
                    <View className="w-full max-w-md gap-3 sm:gap-4">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="bg-white rounded-full py-4 sm:py-5 px-8 shadow-2xl elevation-8 flex-row items-center justify-center"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="arrow-back" size={isSmartWatch ? 18 : 24} color="#1d4ed8" />
                            <Text className={`text-blue-700 ${buttonTextSize} font-bold ml-2`}>
                                Go Back
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace('/' as any)}
                            className="bg-white/20 rounded-full py-4 sm:py-5 px-8 border-2 border-white/50 flex-row items-center justify-center"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="home" size={isSmartWatch ? 18 : 24} color="white" />
                            <Text className={`text-white ${buttonTextSize} font-bold ml-2`}>
                                {isSmartWatch ? 'Home' : 'Go Home'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </>
    );
}
