import { Text, View } from 'react-native';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <View className="bg-gray-100 px-4 py-4 border-t border-gray-200">
            <Text className="text-center text-gray-600 text-sm">
                © {currentYear} MediGate. All rights reserved.
            </Text>
        </View>
    );
}
