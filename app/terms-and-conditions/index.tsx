import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import "../../global.css";

export default function TermsAndConditionsScreen() {
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
                    title: "Terms of Service - MediGate",
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
                    <Text className={`${titleSize} font-bold text-white`}>
                        {isSmartWatch ? 'Terms' : 'Terms of Service'}
                    </Text>
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
                        Welcome to MediGate. By accessing or using our mobile application, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        1. Acceptance of Terms
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        By creating an account or using MediGate, you agree to these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and MediGate.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        2. Description of Services
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        MediGate provides a healthcare platform that enables users to:{'\n\n'}
                        • Schedule and manage medical appointments{'\n'}
                        • Access and store health records{'\n'}
                        • Connect with healthcare providers{'\n'}
                        • Receive health-related notifications{'\n'}
                        • Access telehealth services{'\n\n'}
                        We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        3. User Responsibilities
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        You agree to:{'\n\n'}
                        • Provide accurate and complete information{'\n'}
                        • Maintain the security of your account credentials{'\n'}
                        • Notify us immediately of any unauthorized access{'\n'}
                        • Use the service only for lawful purposes{'\n'}
                        • Respect the rights of healthcare providers and other users{'\n'}
                        • Not share your account with others
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        4. Medical Disclaimer
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        MediGate is a platform that facilitates connections between patients and healthcare providers. We do not provide medical advice, diagnosis, or treatment. All medical decisions should be made in consultation with qualified healthcare professionals. In case of emergency, always call your local emergency services.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        5. Appointment Cancellation Policy
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        Users should cancel appointments at least 24 hours in advance. Late cancellations or no-shows may result in cancellation fees as determined by the healthcare provider. Repeated cancellations may affect your ability to book future appointments.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        6. Payment Terms
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        Users are responsible for all fees associated with appointments and services. Payments are processed securely through our third-party payment processors. Refund policies are determined by individual healthcare providers and applicable laws.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        7. Intellectual Property
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        All content, features, and functionality of MediGate are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        8. Limitation of Liability
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        To the fullest extent permitted by law, MediGate shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount you paid to us in the past 12 months.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        9. Termination
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason. You may also terminate your account at any time by contacting us. Upon termination, your right to use the service will immediately cease.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        10. Changes to Terms
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new terms and updating the "Last Updated" date. Your continued use of the service after changes constitutes acceptance of the new terms.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        11. Governing Law
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-6 sm:mb-8 leading-6 sm:leading-7`}>
                        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MediGate operates, without regard to its conflict of law provisions.
                    </Text>

                    <Text className={`${headingSize} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        12. Contact Information
                    </Text>
                    <Text className={`${textSize} text-gray-700 mb-8 sm:mb-12 leading-6 sm:leading-7`}>
                        If you have any questions about these Terms of Service, please contact us at:{'\n\n'}
                        Email: support@medigate.example.com{'\n'}
                        Phone: 1-800-MEDIGATE{'\n'}
                        Address: 123 Healthcare Ave, Medical City, MC 12345
                    </Text>
                </View>
            </ScrollView>
        </View>
        </>
    );
}
