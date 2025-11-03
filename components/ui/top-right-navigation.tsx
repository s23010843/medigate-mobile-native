import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default function TopRightNavigation() {
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: 'person', route: '/profile' },
        { id: 'settings', label: 'Settings', icon: 'settings', route: '/settings' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications', route: '/notifications' },
        { id: 'help', label: 'Help', icon: 'help-circle', route: '/help' },
    ];

    const handleMenuItemPress = (route: string) => {
        setMenuVisible(false);
        router.push(route as any);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setMenuVisible(!menuVisible)}
                className="p-2"
                activeOpacity={0.7}
            >
                <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    className="flex-1 bg-black/50"
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View className="absolute top-16 right-4 bg-white rounded-2xl shadow-xl elevation-8 min-w-[200px]">
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleMenuItemPress(item.route)}
                                className={`flex-row items-center px-4 py-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                                activeOpacity={0.7}
                            >
                                <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                                <Text className="text-gray-700 font-medium ml-3">
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
