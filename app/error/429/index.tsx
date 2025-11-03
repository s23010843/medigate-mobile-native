import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../../global.css";

export default function Error429Screen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [countdown, setCountdown] = useState(60);

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
    const countdownSize = isSmartWatch ? 'text-3xl' : isMobile ? 'text-5xl' : isTablet ? 'text-6xl' : 'text-7xl';
    const iconSize = isSmartWatch ? 80 : isMobile ? 120 : isTablet ? 150 : 180;
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-6 py-8' : isTablet ? 'px-12 py-12' : isDesktop ? 'px-24 py-16' : 'px-32 py-20';

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "429 Too Many Requests - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gradient-to-b from-orange-600 to-orange-900">
            <StatusBar barStyle="light-content" />
            
            {/* Background */}
            <View className="absolute inset-0 bg-orange-600" />
            <View className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-900 opacity-90" />

            <View className={`flex-1 items-center justify-center ${containerPadding} relative`}>
                {/* Error Icon */}
                <View className="mb-8">
                    <Ionicons name="time-outline" size={iconSize} color="white" />
                </View>

                {/* Error Code */}
                <Text className={`${errorCodeSize} font-extrabold text-white/20 absolute`}>
                    429
                </Text>

                {/* Content */}
                <View className="items-center z-10 mt-16 sm:mt-20 md:mt-24">
                    <Text className={`${titleSize} font-bold text-white text-center mb-4`}>
                        {isSmartWatch ? 'Too Many Requests' : 'Slow Down There!'}
                    </Text>
                    <Text className={`${textSize} text-orange-100 text-center px-4 sm:px-8 mb-6 leading-6`}>
                        {isSmartWatch 
                            ? 'Please wait a moment' 
                            : 'You\'ve made too many requests in a short period. Please wait a moment before trying again.'}
                    </Text>

                    {/* Countdown Timer */}
                    <View className="bg-white/20 rounded-3xl px-8 sm:px-12 py-6 sm:py-8 mb-8 sm:mb-12 border-2 border-white/30">
                        <Text className={`${countdownSize} font-bold text-white text-center`}>
                            {countdown}s
                        </Text>
                        <Text className={`${textSize} text-orange-100 text-center mt-2`}>
                            {isSmartWatch ? 'Wait' : 'Please wait'}
                        </Text>
                    </View>

                    {/* Buttons */}
                    <View className="w-full max-w-md gap-3 sm:gap-4">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className={`${countdown === 0 ? 'bg-white' : 'bg-white/50'} rounded-full py-4 sm:py-5 px-8 shadow-2xl elevation-8 flex-row items-center justify-center`}
                            activeOpacity={0.85}
                            disabled={countdown > 0}
                        >
                            <Ionicons 
                                name="refresh" 
                                size={isSmartWatch ? 18 : 24} 
                                color={countdown === 0 ? '#ea580c' : '#f97316'} 
                            />
                            <Text className={`${countdown === 0 ? 'text-orange-700' : 'text-orange-500'} ${buttonTextSize} font-bold ml-2`}>
                                {countdown === 0 ? 'Try Again' : `Wait ${countdown}s`}
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

                    {/* Info */}
                    {!isSmartWatch && (
                        <View className="mt-8 sm:mt-12 bg-white/10 rounded-2xl p-4 sm:p-6 max-w-md">
                            <View className="flex-row items-start">
                                <Ionicons name="information-circle-outline" size={24} color="white" />
                                <View className="flex-1 ml-3">
                                    <Text className={`${textSize} text-white font-semibold mb-2`}>
                                        Why did this happen?
                                    </Text>
                                    <Text className={`text-sm sm:text-base text-orange-100 leading-5`}>
                                        This is a rate limiting measure to protect our servers and ensure fair usage for all users.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
        </>
    );
}
