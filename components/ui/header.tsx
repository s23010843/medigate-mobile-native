import { Text, View } from 'react-native';
import TopRightNavigation from './top-right-navigation';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <View className="bg-blue-600 px-4 py-6 rounded-b-3xl shadow-lg">
            <View className="flex-row items-center justify-between">
                <View className="flex-1">
                    <Text className="text-3xl font-bold text-white">
                        {title}
                    </Text>
                    {subtitle && (
                        <Text className="text-base text-blue-100 mt-1">
                            {subtitle}
                        </Text>
                    )}
                </View>
                <TopRightNavigation />
            </View>
        </View>
    );
}
