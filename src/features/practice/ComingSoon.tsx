import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ComingSoon = () => {
	return (
		<View className="flex-1 items-center justify-center bg-white px-6">
			{/* Icon Container with soft background */}
			<View className="h-32 w-32 bg-blue-50 rounded-full items-center justify-center mb-6">
				<Ionicons name="construct-outline" size={64} color="#3b82f6" />
			</View>

			{/* Main Title */}
			<Text className="text-3xl font-bold text-gray-800 text-center mb-3">
				Coming Soon
			</Text>

			{/* Sub Title / Description */}
			<Text className="text-base text-gray-500 text-center leading-6 px-4">
				Tính năng này đang trong quá trình phát triển và sẽ sớm được ra mắt. Cảm ơn bạn đã kiên nhẫn chờ đợi!
			</Text>

			{/* Decorative elements */}
			<View className="flex-row items-center mt-8 space-x-2">
				<View className="w-2 h-2 rounded-full bg-blue-200" />
				<View className="w-2 h-2 rounded-full bg-blue-400" />
				<View className="w-2 h-2 rounded-full bg-blue-600" />
			</View>
		</View>
	);
};

export default ComingSoon;