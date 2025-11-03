import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Footer from "../components/ui/footer";

import "../global.css";

export default function SplashScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();

    // Determine device type based on dimensions
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;

    // Responsive sizing
    const logoSize = isSmartWatch ? 40 : isMobile ? 112 : isTablet ? 140 : isDesktop ? 160 : 200;
    const titleSize = isSmartWatch ? 'text-2xl' : isMobile ? 'text-6xl' : isTablet ? 'text-7xl' : 'text-8xl';
    const subtitleSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
    const iconSize = isSmartWatch ? 16 : isMobile ? 28 : isTablet ? 32 : 40;
    const featureTitleSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const featureDescSize = isSmartWatch ? 'text-[10px]' : isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
    
    // Responsive padding and margins
    const containerPadding = isSmartWatch ? 'px-2 py-4' : isMobile ? 'px-6 py-12' : isTablet ? 'px-12 py-16' : isDesktop ? 'px-24 py-20' : 'px-32 py-24';
    const logoMarginTop = isSmartWatch ? 'mt-2' : isMobile ? 'mt-16' : isTablet ? 'mt-20' : 'mt-24';
    const logoPadding = isSmartWatch ? 'p-2' : isMobile ? 'p-8' : isTablet ? 'p-10' : 'p-12';
    const featurePadding = isSmartWatch ? 'p-2' : isMobile ? 'p-5' : isTablet ? 'p-6' : 'p-8';
    const iconPadding = isSmartWatch ? 'p-1' : isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-5';
    const buttonPadding = isSmartWatch ? 'py-2' : isMobile ? 'py-5' : isTablet ? 'py-6' : 'py-8';
    
    // Layout adjustments for larger screens
    const maxContentWidth = isTablet || isDesktop || isTV ? 'max-w-4xl' : 'w-full';
    const featureLayout = isDesktop || isTV ? 'flex-row flex-wrap justify-center' : 'w-full';
    const featureItemWidth = isDesktop || isTV ? 'w-[45%]' : 'w-full';

    return (
        <>
            <Stack.Screen
                options={{
                    title: "MediGate - Healthcare App",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-gradient-to-b from-blue-600 to-blue-900">
            <StatusBar barStyle="light-content" />
            
            {/* Blue Gradient Background */}
            <View className="absolute inset-0 bg-blue-600" />
            <View className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 opacity-90" />

            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View className={`flex-1 items-center justify-between ${containerPadding} relative`}>
                    {/* Top Section - Logo and Branding */}
                    <View className={`items-center ${logoMarginTop} ${maxContentWidth}`}>
                        <View className={`bg-white rounded-full ${logoPadding} shadow-2xl mb-4 sm:mb-6 md:mb-8 elevation-8`}>
                            <Image 
                                style={{ width: logoSize, height: logoSize, borderRadius: logoSize / 2 }}
                                source={require("../assets/images/favicon.png")} 
                                resizeMode="contain"
                            />
                        </View>
                        <Text className={`${titleSize} font-extrabold text-white text-center mb-2 sm:mb-3 md:mb-4 tracking-tight`}>
                            MediGate
                        </Text>
                        <Text className={`${subtitleSize} text-blue-100 text-center font-medium px-2 sm:px-4 mb-4`}>
                            {isSmartWatch ? 'Healthcare Starts Here' : 'Your Healthcare Journey Starts Here'}
                        </Text>
                        
                        {/* Loading Spinner */}
                        <View className="mt-4">
                            <ActivityIndicator size={isSmartWatch ? 'small' : 'large'} color="white" />
                        </View>
                    </View>

                    {/* Middle Section - Features */}
                    <View className={`${featureLayout} ${maxContentWidth} gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8`}>
                        <View className={`${featureItemWidth} flex-row items-center bg-white/20 rounded-2xl ${featurePadding} border border-white/30`}>
                            <View className={`bg-white/30 rounded-full ${iconPadding} mr-2 sm:mr-3 md:mr-4`}>
                                <Ionicons name="shield-checkmark" size={iconSize} color="white" />
                            </View>
                            <View className="flex-1">
                                <Text className={`text-white font-bold ${featureTitleSize}`}>
                                    {isSmartWatch ? 'Secure' : 'Secure & Private'}
                                </Text>
                                {!isSmartWatch && (
                                    <Text className={`text-blue-50 ${featureDescSize} mt-1`}>
                                        Your health data is encrypted and protected
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View className={`${featureItemWidth} flex-row items-center bg-white/20 rounded-2xl ${featurePadding} border border-white/30`}>
                            <View className={`bg-white/30 rounded-full ${iconPadding} mr-2 sm:mr-3 md:mr-4`}>
                                <Ionicons name="calendar" size={iconSize} color="white" />
                            </View>
                            <View className="flex-1">
                                <Text className={`text-white font-bold ${featureTitleSize}`}>
                                    {isSmartWatch ? 'Appointments' : 'Easy Appointments'}
                                </Text>
                                {!isSmartWatch && (
                                    <Text className={`text-blue-50 ${featureDescSize} mt-1`}>
                                        Book and manage appointments effortlessly
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View className={`${featureItemWidth} flex-row items-center bg-white/20 rounded-2xl ${featurePadding} border border-white/30`}>
                            <View className={`bg-white/30 rounded-full ${iconPadding} mr-2 sm:mr-3 md:mr-4`}>
                                <Ionicons name="medical" size={iconSize} color="white" />
                            </View>
                            <View className="flex-1">
                                <Text className={`text-white font-bold ${featureTitleSize}`}>
                                    {isSmartWatch ? 'Expert Care' : 'Expert Care'}
                                </Text>
                                {!isSmartWatch && (
                                    <Text className={`text-blue-50 ${featureDescSize} mt-1`}>
                                        Connect with qualified healthcare professionals
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Bottom Section - Action Buttons */}
                    <View className={`${maxContentWidth} w-full mb-4 sm:mb-6 md:mb-8`}>
                        {/* Get Started Button */}
                        <TouchableOpacity
                            onPress={() => router.push('/account-setup' as any)}
                            className="bg-white rounded-full py-4 sm:py-5 mb-4 shadow-xl elevation-4"
                            activeOpacity={0.85}
                        >
                            <Text className={`${buttonTextSize} text-blue-600 text-center font-bold`}>
                                Get Started
                            </Text>
                        </TouchableOpacity>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            onPress={() => router.push('/login' as any)}
                            className="bg-white/20 rounded-full py-4 sm:py-5 mb-6 border-2 border-white"
                            activeOpacity={0.85}
                        >
                            <Text className={`${buttonTextSize} text-white text-center font-bold`}>
                                Sign In
                            </Text>
                        </TouchableOpacity>

                        {/* Terms and Privacy Links */}
                        {!isSmartWatch && (
                            <View className="items-center mb-4">
                                <Text className={`text-blue-100 text-center ${featureDescSize} px-4 sm:px-8 leading-5`}>
                                    By continuing, you agree to our
                                </Text>
                                <View className="flex-row items-center justify-center mt-2 gap-4">
                                    <TouchableOpacity 
                                        onPress={() => router.push('/terms-and-conditions' as any)}
                                        activeOpacity={0.7}
                                    >
                                        <Text className={`text-white font-bold ${featureDescSize} underline`}>
                                            Terms of Service
                                        </Text>
                                    </TouchableOpacity>
                                    <Text className="text-blue-100">and</Text>
                                    <TouchableOpacity 
                                        onPress={() => router.push('/privacy-policy' as any)}
                                        activeOpacity={0.7}
                                    >
                                        <Text className={`text-white font-bold ${featureDescSize} underline`}>
                                            Privacy Policy
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            
            {/* Footer */}
            <Footer />
        </View>
        </>
    );
}