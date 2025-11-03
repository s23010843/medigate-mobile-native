import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function AccountSetupScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [step, setStep] = useState(1);
    
    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;

    const logoSize = isSmartWatch ? 60 : isMobile ? 80 : isTablet ? 100 : 120;
    const titleSize = isSmartWatch ? 'text-2xl' : isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl';
    const subtitleSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-6 py-8' : isTablet ? 'px-12 py-12' : isDesktop ? 'px-24 py-16' : 'px-32 py-20';
    const maxWidth = isTablet || isDesktop || isTV ? 'max-w-2xl' : 'w-full';

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.back();
        }
    };

    const handleSignUp = async () => {
        // TODO: Implement actual signup logic
        console.log('Sign up attempt:', {
            fullName, email, phone, password,
            dateOfBirth, gender, address,
            emergencyContact, emergencyPhone
        });
        // For now, navigate to dashboard
        router.replace('/dashboard' as any);
    };

    const renderStepIndicator = () => (
        <View className="flex-row items-center justify-center mb-6 sm:mb-8">
            {[1, 2, 3].map((stepNum) => (
                <View key={stepNum} className="flex-row items-center">
                    <View className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center ${
                        step >= stepNum ? 'bg-white' : 'bg-white/30'
                    }`}>
                        <Text className={`${isSmartWatch ? 'text-sm' : 'text-base'} font-bold ${
                            step >= stepNum ? 'text-blue-600' : 'text-white'
                        }`}>
                            {stepNum}
                        </Text>
                    </View>
                    {stepNum < 3 && (
                        <View className={`w-12 sm:w-16 h-1 ${
                            step > stepNum ? 'bg-white' : 'bg-white/30'
                        }`} />
                    )}
                </View>
            ))}
        </View>
    );

    const renderStep1 = () => (
        <View className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl elevation-8">
            <Text className={`${textSize} font-bold text-gray-800 mb-6 text-center`}>
                Account Information
            </Text>

            {/* Full Name */}
            <View className="mb-4">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Full Name
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="person-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Enter your full name"
                        placeholderTextColor="#9CA3AF"
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="words"
                    />
                </View>
            </View>

            {/* Email */}
            <View className="mb-4">
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

            {/* Phone */}
            <View className="mb-4">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Phone Number
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="call-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#9CA3AF"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        autoComplete="tel"
                    />
                </View>
            </View>

            {/* Password */}
            <View className="mb-4">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Password
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="lock-closed-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Create a password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
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

            {/* Confirm Password */}
            <View className="mb-6">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Confirm Password
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="lock-closed-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Confirm your password"
                        placeholderTextColor="#9CA3AF"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons 
                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                            size={isSmartWatch ? 16 : 20} 
                            color="#6B7280" 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl elevation-8">
            <Text className={`${textSize} font-bold text-gray-800 mb-6 text-center`}>
                Personal Information
            </Text>

            {/* Date of Birth */}
            <View className="mb-4">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Date of Birth
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="calendar-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="MM/DD/YYYY"
                        placeholderTextColor="#9CA3AF"
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        keyboardType="numbers-and-punctuation"
                    />
                </View>
            </View>

            {/* Gender */}
            <View className="mb-4">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Gender
                </Text>
                <View className="flex-row gap-3">
                    {['Male', 'Female', 'Other'].map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => setGender(option)}
                            className={`flex-1 py-3 rounded-xl border-2 ${
                                gender === option 
                                    ? 'bg-blue-600 border-blue-600' 
                                    : 'bg-gray-100 border-gray-100'
                            }`}
                            activeOpacity={0.7}
                        >
                            <Text className={`${textSize} text-center font-semibold ${
                                gender === option ? 'text-white' : 'text-gray-700'
                            }`}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Address */}
            <View className="mb-6">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Address
                </Text>
                <View className="flex-row items-start bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="location-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" className="mt-1" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Enter your address"
                        placeholderTextColor="#9CA3AF"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                </View>
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl elevation-8">
            <Text className={`${textSize} font-bold text-gray-800 mb-6 text-center`}>
                Emergency Contact
            </Text>

            {/* Emergency Contact Name */}
            <View className="mb-4">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Contact Name
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="person-add-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Emergency contact name"
                        placeholderTextColor="#9CA3AF"
                        value={emergencyContact}
                        onChangeText={setEmergencyContact}
                        autoCapitalize="words"
                    />
                </View>
            </View>

            {/* Emergency Phone */}
            <View className="mb-6">
                <Text className={`${textSize} font-semibold text-gray-700 mb-2`}>
                    Contact Phone
                </Text>
                <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 sm:py-4">
                    <Ionicons name="call-outline" size={isSmartWatch ? 16 : 20} color="#6B7280" />
                    <TextInput
                        className={`flex-1 ml-3 ${textSize} text-gray-900`}
                        placeholder="Emergency contact phone"
                        placeholderTextColor="#9CA3AF"
                        value={emergencyPhone}
                        onChangeText={setEmergencyPhone}
                        keyboardType="phone-pad"
                        autoComplete="tel"
                    />
                </View>
            </View>

            {/* Terms Agreement */}
            <View className="bg-blue-50 rounded-xl p-4 mb-4">
                <Text className={`${subtitleSize} text-gray-700 text-center`}>
                    By signing up, you agree to our{' '}
                    <Text 
                        onPress={() => router.push('/terms-and-conditions' as any)}
                        className="text-blue-600 font-semibold underline"
                    >
                        Terms of Service
                    </Text>
                    {' '}and{' '}
                    <Text 
                        onPress={() => router.push('/privacy-policy' as any)}
                        className="text-blue-600 font-semibold underline"
                    >
                        Privacy Policy
                    </Text>
                </Text>
            </View>
        </View>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Create Account - MediGate",
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
                        <View className={`flex-1 justify-center ${containerPadding} relative`}>
                            <View className={`${maxWidth} w-full mx-auto`}>
                                {/* Back Button */}
                                <TouchableOpacity 
                                    onPress={handleBack}
                                    className="mb-4 flex-row items-center"
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                    <Text className={`${textSize} text-white ml-2 font-semibold`}>
                                        {step === 1 ? 'Back to Login' : 'Back'}
                                    </Text>
                                </TouchableOpacity>

                                {/* Logo and Title */}
                                <View className="items-center mb-6 sm:mb-8">
                                    <View className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl mb-4 elevation-8">
                                        <Image 
                                            style={{ width: logoSize, height: logoSize }}
                                            source={require("../../assets/images/favicon.png")} 
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text className={`${titleSize} font-extrabold text-white text-center mb-2`}>
                                        Create Account
                                    </Text>
                                    <Text className={`${textSize} text-blue-100 text-center`}>
                                        Step {step} of 3
                                    </Text>
                                </View>

                                {/* Step Indicator */}
                                {renderStepIndicator()}

                                {/* Form Steps */}
                                {step === 1 && renderStep1()}
                                {step === 2 && renderStep2()}
                                {step === 3 && renderStep3()}

                                {/* Navigation Buttons */}
                                <View className="mt-6">
                                    {step < 3 ? (
                                        <TouchableOpacity
                                            onPress={handleNext}
                                            className="bg-white rounded-full py-4 sm:py-5 shadow-xl elevation-4"
                                            activeOpacity={0.85}
                                        >
                                            <Text className={`${buttonTextSize} text-blue-600 text-center font-bold`}>
                                                Continue
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={handleSignUp}
                                            className="bg-white rounded-full py-4 sm:py-5 shadow-xl elevation-4"
                                            activeOpacity={0.85}
                                        >
                                            <Text className={`${buttonTextSize} text-blue-600 text-center font-bold`}>
                                                Create Account
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Sign In Link */}
                                <View className="flex-row items-center justify-center mt-4">
                                    <Text className={`${textSize} text-blue-100`}>
                                        Already have an account?{' '}
                                    </Text>
                                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                                        <Text className={`${textSize} text-white font-bold`}>
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}