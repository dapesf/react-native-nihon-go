import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Import các màn hình của bạn
import DashboardScreen from '@/features/study/menu/screens/StudyDashboard';
import PracticeDashboardScreen from '@/features/practice/menu/screens/PracticeDashboard';

// 1. Định nghĩa kiểu dữ liệu cho các Tab
import { MainTabParamList } from '@/shared/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
	const { t } = useTranslation();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: '#4169ad',
				tabBarInactiveTintColor: '#8E8E93',
				tabBarStyle: {
					backgroundColor: '#ffffff',
					borderTopWidth: 1,
					borderTopColor: '#e5e7eb',
					height: 60,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '500',
				},
				// Cấu hình Icon tự động đổi màu và trạng thái Active
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: keyof typeof Ionicons.glyphMap = 'home';

					switch (route.name) {
						case 'Home':
							iconName = focused ? 'book' : 'book-outline';
							break;
						case 'Practice':
							iconName = focused ? 'pencil' : 'pencil-outline';
							break;
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={DashboardScreen}
				options={{ tabBarLabel: t('tabs.review') }}
			/>
			<Tab.Screen
				name="Practice"
				component={PracticeDashboardScreen}
				options={{ tabBarLabel: t('tabs.practice') }}
			/>
		</Tab.Navigator>
	);
}