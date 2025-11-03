import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../../global.css";

export default function Error500Screen() {
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

    const handleRetry = () => {
        // Reload the app or go back
        router.back();
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "500 Server Error - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gradient-to-b from-red-600 to-red-900">
            <StatusBar barStyle="light-content" />
            
            {/* Background */}
            <View className="absolute inset-0 bg-red-600" />
            <View className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-900 opacity-90" />

            <View className={`flex-1 items-center justify-center ${containerPadding} relative`}>
                {/* Error Icon */}
                <View className="mb-8">
                    <Ionicons name="warning-outline" size={iconSize} color="white" />
                </View>

                {/* Error Code */}
                <Text className={`${errorCodeSize} font-extrabold text-white/20 absolute`}>
                    500
                </Text>

                {/* Content */}
                <View className="items-center z-10 mt-16 sm:mt-20 md:mt-24">
                    <Text className={`${titleSize} font-bold text-white text-center mb-4`}>
                        {isSmartWatch ? 'Server Error' : 'Internal Server Error'}
                    </Text>
                    <Text className={`${textSize} text-red-100 text-center px-4 sm:px-8 mb-8 sm:mb-12 leading-6`}>
                        {isSmartWatch 
                            ? 'Something went wrong' 
                            : 'Oops! Something went wrong on our end. Our team has been notified and is working to fix the issue.'}
                    </Text>

                    {/* Buttons */}
                    <View className="w-full max-w-md gap-3 sm:gap-4">
                        <TouchableOpacity
                            onPress={handleRetry}
                            className="bg-white rounded-full py-4 sm:py-5 px-8 shadow-2xl elevation-8 flex-row items-center justify-center"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="refresh" size={isSmartWatch ? 18 : 24} color="#dc2626" />
                            <Text className={`text-red-700 ${buttonTextSize} font-bold ml-2`}>
                                Try Again
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

                    {/* Support Info */}
                    {!isSmartWatch && (
                        <View className="mt-8 sm:mt-12 items-center">
                            <Text className={`${textSize} text-red-100 text-center mb-2`}>
                                Need help?
                            </Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text className={`${textSize} text-white font-bold underline`}>
                                    Contact Support
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
        </>
    );
}
