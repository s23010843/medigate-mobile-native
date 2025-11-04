import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Alert, Linking, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import BottomNavigation from "../../components/ui/bottom-navigation";
import { useData } from '../../contexts/DataContext';

import "../../global.css";

export default function EmergencyScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const { emergencyContacts, user } = useData();

    // Responsive sizing
    const isSmartWatch = width < 250;
    const isMobile = width >= 250 && width < 768;
    const isTablet = width >= 768 && width < 1024;

    const titleSize = isSmartWatch ? 'text-xl' : isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
    const textSize = isSmartWatch ? 'text-xs' : isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl';
    const cardTitleSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
    const buttonTextSize = isSmartWatch ? 'text-sm' : isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
    const iconSize = isSmartWatch ? 40 : isMobile ? 60 : isTablet ? 70 : 80;
    const smallIconSize = isSmartWatch ? 20 : isMobile ? 24 : isTablet ? 28 : 32;
    const containerPadding = isSmartWatch ? 'px-3 py-4' : isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : 'px-16 py-12';

    const handleEmergencyCall = (number: string) => {
        Linking.openURL(`tel:${number}`);
    };

    const handleShareLocation = () => {
        Alert.alert(
            'Share Location',
            'Your location will be shared with emergency services.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Share', onPress: () => console.log('Location shared') }
            ]
        );
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Emergency - MediGate",
                    headerShown: false,
                }}
            />
            <View className="flex-1 bg-red-50">
                <StatusBar barStyle="light-content" />
                
                {/* Header */}
                <View className="bg-red-600 px-4 py-6 sm:px-6 sm:py-8 rounded-b-3xl shadow-lg">
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
                    <View className="flex-row items-center">
                        <Ionicons name="warning" size={32} color="white" />
                        <Text className={`${titleSize} font-bold text-white ml-3`}>
                            Emergency
                        </Text>
                    </View>
                </View>

                <ScrollView 
                    className={`flex-1 ${containerPadding}`}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Emergency Call Button */}
                    <View className="bg-white rounded-3xl p-8 shadow-xl elevation-4 mb-6 items-center">
                        <View className="bg-red-100 rounded-full p-6 mb-6">
                            <Ionicons name="call" size={iconSize} color="#DC2626" />
                        </View>
                        <Text className={`${cardTitleSize} font-bold text-gray-900 text-center mb-2`}>
                            Need Immediate Help?
                        </Text>
                        <Text className={`${textSize} text-gray-600 text-center mb-6`}>
                            Call emergency services right away
                        </Text>
                        <TouchableOpacity
                            onPress={() => handleEmergencyCall('911')}
                            className="bg-red-600 rounded-full px-12 py-5 shadow-xl elevation-4 w-full"
                            activeOpacity={0.85}
                        >
                            <Text className={`${buttonTextSize} text-white text-center font-bold`}>
                                Call 911
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Emergency Contacts */}
                    <View className="bg-white rounded-3xl p-6 shadow-lg elevation-2 mb-6">
                        <Text className={`${cardTitleSize} font-bold text-gray-900 mb-4`}>
                            Emergency Contacts
                        </Text>
                        <View className="gap-3">
                            {emergencyContacts.map((contact, index) => {
                                // Map contact type to icon
                                const getIcon = (type: string) => {
                                    switch (type) {
                                        case 'Emergency Services': return 'call';
                                        case 'Primary Care': return 'medical';
                                        case 'Specialist': return 'heart';
                                        case 'Family': return 'people';
                                        case 'Hospital': return 'business';
                                        default: return 'call';
                                    }
                                };

                                return (
                                    <TouchableOpacity
                                        key={contact.id}
                                        onPress={() => handleEmergencyCall(contact.phone)}
                                        className="flex-row items-center justify-between bg-gray-50 rounded-xl px-4 py-4 border border-gray-200"
                                        activeOpacity={0.7}
                                    >
                                        <View className="flex-row items-center flex-1">
                                            <View className="bg-red-100 rounded-full p-3 mr-4">
                                                <Ionicons name={getIcon(contact.type) as any} size={smallIconSize} color="#DC2626" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className={`${textSize} font-bold text-gray-900`}>
                                                    {contact.name}
                                                </Text>
                                                <Text className={`${textSize} text-gray-600 mt-1`}>
                                                    {contact.phone}
                                                </Text>
                                                {contact.description && (
                                                    <Text className={`${textSize} text-gray-500 mt-1 text-xs`}>
                                                        {contact.description}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                        <Ionicons name="call" size={smallIconSize} color="#2563EB" />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Safety Tips */}
                    <View className="bg-amber-50 rounded-3xl p-6 shadow-lg elevation-2 mb-6 border border-amber-200">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name="information-circle" size={smallIconSize} color="#F59E0B" />
                            <Text className={`${cardTitleSize} font-bold text-amber-900 ml-2`}>
                                Safety Tips
                            </Text>
                        </View>
                        <View className="gap-2">
                            <Text className={`${textSize} text-amber-800`}>
                                • Stay calm and speak clearly
                            </Text>
                            <Text className={`${textSize} text-amber-800`}>
                                • Provide your exact location
                            </Text>
                            <Text className={`${textSize} text-amber-800`}>
                                • Describe the emergency situation
                            </Text>
                            <Text className={`${textSize} text-amber-800`}>
                                • Don't hang up until told to do so
                            </Text>
                        </View>
                    </View>

                    {/* Map Placeholder */}
                    <View className="bg-white rounded-3xl overflow-hidden shadow-lg elevation-2 mb-6">
                        <View className="bg-gray-200 h-48 items-center justify-center">
                            <Ionicons name="map" size={iconSize} color="#6B7280" />
                            <Text className={`${textSize} text-gray-600 mt-2`}>
                                Map View
                            </Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="gap-3 mb-6">
                        {/* Share Location Button */}
                        <TouchableOpacity
                            onPress={handleShareLocation}
                            className="bg-blue-600 rounded-full py-5 shadow-xl elevation-4 flex-row items-center justify-center"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="location" size={smallIconSize} color="white" />
                            <Text className={`${buttonTextSize} text-white font-bold ml-2`}>
                                Share My Location
                            </Text>
                        </TouchableOpacity>

                        {/* Call Emergency Services Button */}
                        <TouchableOpacity
                            onPress={() => handleEmergencyCall('911')}
                            className="bg-red-600 rounded-full py-5 shadow-xl elevation-4 flex-row items-center justify-center"
                            activeOpacity={0.85}
                        >
                            <Ionicons name="call" size={smallIconSize} color="white" />
                            <Text className={`${buttonTextSize} text-white font-bold ml-2`}>
                                Call Emergency Services
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <BottomNavigation />
            </View>
        </>
    );
}
