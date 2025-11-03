import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function LoginScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;

    const logoSize = isSmartWatch ? 60 : isMobile ? 100 : isTablet ? 120 : 140;
    const titleSize = isSmartWatch ? 'text-2xl' : isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-6 py-8' : isTablet ? 'px-12 py-12' : isDesktop ? 'px-24 py-16' : 'px-32 py-20';
    const maxWidth = isTablet || isDesktop || isTV ? 'max-w-md' : 'w-full';

    const handleLogin = async () => {
        // TODO: Implement actual login logic
        console.log('Login attempt:', { email, password });
        // For now, just navigate to dashboard
        router.replace('/dashboard' as any);
    };

    const handleSignUp = () => {
        router.push('/account-setup' as any);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Login - MediGate",
                    headerShown: false,
                }}
            />
            <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <View className="flex-1 bg-gradient-to-b from-blue-600 to-blue-900">
                <StatusBar barStyle="light-content" />
                
                {/* Background */}
                <View className="absolute inset-0 bg-blue-600" />
                <View className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 opacity-90" />

                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className={`flex-1 items-center justify-center ${containerPadding} relative`}>
                        <View className={`${maxWidth} w-full`}>
                            {/* Logo and Title */}
                            <View className="items-center mb-8 sm:mb-12">
                                <View className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-6 elevation-8">
                                    <Image 
                                        style={{ width: logoSize, height: logoSize }}
                                        source={require("../../assets/images/favicon.png")} 
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text className={`${titleSize} font-extrabold text-white text-center mb-2`}>
                                    Welcome Back
                                </Text>
                                <Text className={`${textSize} text-blue-100 text-center`}>
                                    Sign in to continue
                                </Text>
                            </View>

                            {/* Login Form */}
                            <View className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl elevation-8">
                                {/* Email Input */}
                                <View className="mb-4 sm:mb-6">
                                    <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                                        Email
                                    </Text>
                                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                                        <Ionicons name="mail-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                                        <TextInput
                                            className={`flex-1 ml-3 ${textSize} text-gray-900`}
                                            placeholder="Enter your email"
                                            placeholderTextColor="#9CA3AF"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View className="mb-4 sm:mb-6">
                                    <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                                        Password
                                    </Text>
                                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                                        <Ionicons name="lock-closed-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                                        <TextInput
                                            className={`flex-1 ml-3 ${textSize} text-gray-900`}
                                            placeholder="Enter your password"
                                            placeholderTextColor="#9CA3AF"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                            autoComplete="password"
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Ionicons 
                                                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                                                size={isSmartWatch ? 16 : 20} 
                                                color="#6B7280" 
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Forgot Password */}
                                <TouchableOpacity className="mb-6" activeOpacity={0.7}>
                                    <Text className={`${textSize} text-blue-600 text-right font-semibold`}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                {/* Login Button */}
                                <TouchableOpacity
                                    onPress={handleLogin}
                                    className="bg-blue-600 rounded-full py-4 sm:py-5 shadow-xl elevation-4 mb-4"
                                    activeOpacity={0.85}
                                >
                                    <Text className={`${buttonTextSize} text-white text-center font-bold`}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>

                                {/* Sign Up Link */}
                                <View className="flex-row items-center justify-center">
                                    <Text className={`${textSize} text-gray-600`}>
                                        Don't have an account?{' '}
                                    </Text>
                                    <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                                        <Text className={`${textSize} text-blue-600 font-bold`}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Terms and Privacy */}
                            {!isSmartWatch && (
                                <View className="items-center mt-6 sm:mt-8">
                                    <View className="flex-row items-center justify-center gap-4">
                                        <TouchableOpacity 
                                            onPress={() => router.push('/terms-and-conditions' as any)}
                                            activeOpacity={0.7}
                                        >
                                            <Text className={`text-blue-100 ${textSize} underline`}>
                                                Terms of Service
                                            </Text>
                                        </TouchableOpacity>
                                        <Text className="text-blue-100">•</Text>
                                        <TouchableOpacity 
                                            onPress={() => router.push('/privacy-policy' as any)}
                                            activeOpacity={0.7}
                                        >
                                            <Text className={`text-blue-100 ${textSize} underline`}>
                                                Privacy Policy
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
        </>
    );
}
