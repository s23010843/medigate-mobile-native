import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function PrivacyPolicyScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;

    const titleSize = isSmartWatch ? 'text-xl' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const headingSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
    const textSize = isSmartWatch ? 'text-[10px]' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-6 py-8' : isTablet ? 'px-12 py-12' : isDesktop ? 'px-24 py-16' : 'px-32 py-20';
    const maxWidth = isTablet || isDesktop || isTV ? 'max-w-4xl' : 'w-full';

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Privacy Policy - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View className="bg-blue-600 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-row items-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={isSmartWatch ? 20 : 24} color="white" />
                        {!isSmartWatch && (
                            <Text className={`text-white ml-2 ${textSize}`}>Back</Text>
                        )}
                    </TouchableOpacity>
                    <Text className={`${titleSize} font-bold text-white`}>Privacy Policy</Text>
                    <View style={{ width: isSmartWatch ? 20 : 80 }} />
                </View>
            </View>

            <ScrollView 
                className={`flex-1 ${containerPadding}`}
                showsVerticalScrollIndicator={false}
            >
                <View className={`${maxWidth} self-center w-full`}>
                    <Text className={`${textSize} text-gray-600 mb-4 sm:mb-6`}>
                        Last Updated: November 3, 2025
                    </Text>

                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        At MediGate, we are committed to protecting your privacy and ensuring the security of your personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        1. Information We Collect
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We collect information that you provide directly to us, including:{'\n\n'}
                        • Personal identification information (name, email address, phone number){'\n'}
                        • Health information and medical records{'\n'}
                        • Appointment scheduling information{'\n'}
                        • Payment and billing information{'\n'}
                        • Device information and usage data
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        2. How We Use Your Information
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We use the information we collect to:{'\n\n'}
                        • Provide, maintain, and improve our services{'\n'}
                        • Process your appointments and transactions{'\n'}
                        • Send you important updates and notifications{'\n'}
                        • Respond to your comments and questions{'\n'}
                        • Comply with legal obligations and protect our rights
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        3. Data Security
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your health data is encrypted both in transit and at rest using industry-standard encryption protocols.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        4. Information Sharing
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We do not sell your personal information. We may share your information with:{'\n\n'}
                        • Healthcare providers you book appointments with{'\n'}
                        • Service providers who assist us in operating our platform{'\n'}
                        • Legal authorities when required by law
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        5. Your Rights
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        You have the right to:{'\n\n'}
                        • Access your personal information{'\n'}
                        • Correct inaccurate information{'\n'}
                        • Request deletion of your information{'\n'}
                        • Opt-out of certain data collection{'\n'}
                        • Export your data in a portable format
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        6. HIPAA Compliance
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        MediGate is committed to complying with the Health Insurance Portability and Accountability Act (HIPAA) and other applicable healthcare privacy regulations. We maintain appropriate safeguards to protect your protected health information (PHI).
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        7. Changes to This Policy
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        8. Contact Us
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-8 sm:mb-12 leading-6 sm:leading-7`}>
                        If you have any questions about this Privacy Policy, please contact us at:{'\n\n'}
                        Email: privacy@medigate.com{'\n'}
                        Phone: 1-800-MEDIGATE{'\n'}
                        Address: 123 Healthcare Ave, Medical City, MC 12345
                    </Text>
                </View>
            </ScrollView>
        </View>
        </>
    );
}
