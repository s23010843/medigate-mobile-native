import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import Header from '../../components/ui/header';
import { feedbackService } from '../../services/api';
import type { FeedbackSubmission } from '../../services/api/types';

export default function AppReportScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Form state
  const [category, setCategory] = useState<FeedbackSubmission['category']>('improvement');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Responsive sizing
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const containerPadding = isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8';
  const maxWidth = isDesktop ? 'max-w-3xl' : 'w-full';

  const categories = [
    { id: 'bug', label: 'Bug Report', icon: 'bug', color: 'bg-red-500' },
    { id: 'feature', label: 'Feature Request', icon: 'bulb', color: 'bg-yellow-500' },
    { id: 'improvement', label: 'Improvement', icon: 'trending-up', color: 'bg-blue-500' },
    { id: 'complaint', label: 'Complaint', icon: 'alert-circle', color: 'bg-orange-500' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal', color: 'bg-gray-500' },
  ];

  const handleSubmit = async () => {
    // Validation
    if (!subject.trim()) {
      Alert.alert('Error', 'Please enter a subject');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (email && !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData = {
        category,
        subject: subject.trim(),
        description: description.trim(),
        rating: rating > 0 ? rating : undefined,
        email: email.trim() || undefined,
      };

      const response = await feedbackService.submitFeedback(feedbackData);

      if (response.success) {
        Alert.alert(
          'Success',
          'Thank you for your feedback! We will review it and get back to you soon.',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
        
        // Reset form
        setSubject('');
        setDescription('');
        setRating(0);
        setEmail('');
      } else {
        Alert.alert('Error', response.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Feedback submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'App Feedback',
          headerShown: false,
        }}
      />
      
      <View className="flex-1 bg-gray-50">
        <Header title="App Feedback" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className={`${containerPadding} items-center`}>
              <View className={`${maxWidth} w-full`}>
                {/* Header Info */}
                <View className="bg-blue-500 rounded-2xl p-6 mb-6">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-white/20 rounded-full p-3 mr-4">
                      <Ionicons name="chatbox-ellipses" size={32} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white text-2xl font-bold">Help Us Improve</Text>
                      <Text className="text-blue-100 text-sm mt-1">
                        Your feedback helps us make MediGate better
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Category Selection */}
                <View className="mb-6">
                  <Text className="text-gray-700 text-base font-semibold mb-3">
                    Feedback Category *
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                  >
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat.id}
                        onPress={() => setCategory(cat.id as FeedbackSubmission['category'])}
                        className={`mr-3 rounded-xl px-4 py-3 flex-row items-center border-2 ${
                          category === cat.id
                            ? `${cat.color} border-transparent`
                            : 'bg-white border-gray-200'
                        }`}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={cat.icon as any}
                          size={20}
                          color={category === cat.id ? 'white' : '#6B7280'}
                        />
                        <Text
                          className={`ml-2 font-semibold ${
                            category === cat.id ? 'text-white' : 'text-gray-700'
                          }`}
                        >
                          {cat.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Subject Input */}
                <View className="mb-6">
                  <Text className="text-gray-700 text-base font-semibold mb-2">
                    Subject *
                  </Text>
                  <TextInput
                    value={subject}
                    onChangeText={setSubject}
                    placeholder="Brief summary of your feedback"
                    className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                    maxLength={100}
                  />
                  <Text className="text-gray-400 text-xs mt-1">
                    {subject.length}/100 characters
                  </Text>
                </View>

                {/* Description Input */}
                <View className="mb-6">
                  <Text className="text-gray-700 text-base font-semibold mb-2">
                    Description *
                  </Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Please provide detailed information about your feedback"
                    className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    maxLength={1000}
                  />
                  <Text className="text-gray-400 text-xs mt-1">
                    {description.length}/1000 characters
                  </Text>
                </View>

                {/* Rating */}
                <View className="mb-6">
                  <Text className="text-gray-700 text-base font-semibold mb-2">
                    App Rating (Optional)
                  </Text>
                  <View className="flex-row bg-white rounded-xl p-4 border border-gray-200">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => setRating(star)}
                        className="mr-3"
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={star <= rating ? 'star' : 'star-outline'}
                          size={32}
                          color={star <= rating ? '#FBBF24' : '#D1D5DB'}
                        />
                      </TouchableOpacity>
                    ))}
                    {rating > 0 && (
                      <TouchableOpacity
                        onPress={() => setRating(0)}
                        className="ml-auto"
                        activeOpacity={0.7}
                      >
                        <Text className="text-blue-500 font-medium">Clear</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* Email Input */}
                <View className="mb-6">
                  <Text className="text-gray-700 text-base font-semibold mb-2">
                    Email (Optional)
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="your.email@example.com"
                    className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Text className="text-gray-400 text-xs mt-1">
                    We'll contact you if we need more information
                  </Text>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  className={`rounded-xl py-4 mb-4 ${
                    isSubmitting ? 'bg-gray-400' : 'bg-blue-500'
                  }`}
                  activeOpacity={0.8}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center text-lg font-bold">
                      Submit Feedback
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                  onPress={() => router.back()}
                  disabled={isSubmitting}
                  className="rounded-xl py-4 mb-8 border-2 border-gray-300"
                  activeOpacity={0.8}
                >
                  <Text className="text-gray-700 text-center text-lg font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                {/* Info Box */}
                <View className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-8">
                  <View className="flex-row items-start">
                    <Ionicons name="information-circle" size={24} color="#3B82F6" />
                    <View className="flex-1 ml-3">
                      <Text className="text-blue-900 font-semibold mb-1">
                        Privacy Notice
                      </Text>
                      <Text className="text-blue-700 text-sm">
                        Your feedback is securely stored and will only be used to improve the
                        MediGate app. We respect your privacy and won't share your information
                        with third parties.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
