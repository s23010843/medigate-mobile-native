import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

interface SearchBoxProps {
    placeholder?: string;
    onSearch?: (text: string) => void;
}

export default function SearchBox({ placeholder = 'Search...', onSearch }: SearchBoxProps) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch?.(text);
    };

    return (
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mb-4">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
                className="flex-1 ml-3 text-gray-900 text-base"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={handleSearch}
            />
            {searchText.length > 0 && (
                <Ionicons 
                    name="close-circle" 
                    size={20} 
                    color="#6B7280" 
                    onPress={() => handleSearch('')}
                />
            )}
        </View>
    );
}
