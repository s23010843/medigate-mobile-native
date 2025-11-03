import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabItem {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
}

export default function BottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    const tabs: TabItem[] = [
        { id: 'doctor', label: 'Doctors', icon: 'people', route: '/dashboard' },
        { id: 'call', label: 'Call', icon: 'call', route: '/emergency' },
        { id: 'updates', label: 'Updates', icon: 'notifications', route: '/notifications' },
        { id: 'medications', label: 'Medications', icon: 'medical', route: '/medication-tracker' },
    ];

    const isActive = (route: string) => pathname === route;

    return (
        <View className="bg-white border-t border-gray-200 px-2 py-2 flex-row justify-around items-center shadow-lg elevation-8">
            {tabs.map((tab) => {
                const active = isActive(tab.route);
                return (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => router.push(tab.route as any)}
                        className="flex-1 items-center justify-center py-2"
                        activeOpacity={0.7}
                    >
                        <View className={`items-center justify-center ${active ? 'bg-blue-50' : ''} rounded-xl px-4 py-2`}>
                            <Ionicons 
                                name={tab.icon} 
                                size={24} 
                                color={active ? '#2563EB' : '#6B7280'} 
                            />
                            <Text className={`text-xs mt-1 font-medium ${active ? 'text-blue-600' : 'text-gray-600'}`}>
                                {tab.label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
