import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, Switch, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function SettingsScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [biometricAuth, setBiometricAuth] = useState(false);

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;

    const titleSize = isSmartWatch ? 'text-xl' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const cardTitleSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const iconSize = isSmartWatch ? 20 : isMobile ? 24 : isTablet ? 28 : 32;
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : 'px-16 py-12';

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Settings - MediGate",
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
                        Settings
                    </Text>
                </View>

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Account Settings */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Account
                        </Text>
                        <View className="gap-3">
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="person" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Edit Profile
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="lock-closed" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Change Password
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="card" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Payment Methods
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Notifications */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Notifications
                        </Text>
                        <View className="gap-4">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="notifications" size={iconSize} color="#2563EB" />
                                    <View className="ml-3 flex-1">
                                        <Text className={`${textSize} text-gray-900 font-semibold`}>
                                            Push Notifications
                                        </Text>
                                        <Text className={`${textSize} text-gray-600 mt-1`}>
                                            Receive app notifications
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    value={pushNotifications}
                                    onValueChange={setPushNotifications}
                                    trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                                    thumbColor={pushNotifications ? '#FFFFFF' : '#F3F4F6'}
                                />
                            </View>
                            
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="mail" size={iconSize} color="#2563EB" />
                                    <View className="ml-3 flex-1">
                                        <Text className={`${textSize} text-gray-900 font-semibold`}>
                                            Email Notifications
                                        </Text>
                                        <Text className={`${textSize} text-gray-600 mt-1`}>
                                            Receive email updates
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    value={emailNotifications}
                                    onValueChange={setEmailNotifications}
                                    trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                                    thumbColor={emailNotifications ? '#FFFFFF' : '#F3F4F6'}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Security */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Security & Privacy
                        </Text>
                        <View className="gap-4">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="finger-print" size={iconSize} color="#2563EB" />
                                    <View className="ml-3 flex-1">
                                        <Text className={`${textSize} text-gray-900 font-semibold`}>
                                            Biometric Login
                                        </Text>
                                        <Text className={`${textSize} text-gray-600 mt-1`}>
                                            Use fingerprint or face ID
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    value={biometricAuth}
                                    onValueChange={setBiometricAuth}
                                    trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                                    thumbColor={biometricAuth ? '#FFFFFF' : '#F3F4F6'}
                                />
                            </View>
                            
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="shield-checkmark" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Privacy Policy
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="document-text" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Terms of Service
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Appearance */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Appearance
                        </Text>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <Ionicons name="moon" size={iconSize} color="#2563EB" />
                                <View className="ml-3 flex-1">
                                    <Text className={`${textSize} text-gray-900 font-semibold`}>
                                        Dark Mode
                                    </Text>
                                    <Text className={`${textSize} text-gray-600 mt-1`}>
                                        Enable dark theme
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                                thumbColor={darkMode ? '#FFFFFF' : '#F3F4F6'}
                            />
                        </View>
                    </View>

                    {/* Support */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Support
                        </Text>
                        <View className="gap-3">
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="help-circle" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Help Center
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="chatbubbles" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        Contact Support
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center justify-between py-3">
                                <View className="flex-row items-center flex-1">
                                    <Ionicons name="information-circle" size={iconSize} color="#2563EB" />
                                    <Text className={`${textSize} text-gray-900 ml-3`}>
                                        About
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={iconSize} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Logout */}
                    <TouchableOpacity 
                        onPress={() => router.replace('/' as any)}
                        className="bg-red-600 rounded-full py-5 shadow-xl elevation-4 mb-6"
                        activeOpacity={0.85}
                    >
                        <View className="flex-row items-center justify-center">
                            <Ionicons name="log-out" size={iconSize} color="white" />
                            <Text className={`${textSize} text-white font-bold ml-2`}>
                                Logout
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text className={`${textSize} text-gray-500 text-center mb-6`}>
                        Version 1.0.0
                    </Text>
                </ScrollView>
            </View>
        </>
    );
}
