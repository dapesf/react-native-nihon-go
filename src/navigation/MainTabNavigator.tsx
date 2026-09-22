import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import các màn hình của bạn
import DashboardScreen from '@/features/fukushuo/menu/layout/Dashboard';
import CommingSoo from '@/features/renshuo/commingSoo';

// 1. Định nghĩa kiểu dữ liệu cho các Tab
import { MainTabParamList } from '@/shared/type';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
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
						case 'CommingSoo':
							iconName = focused ? 'settings' : 'settings-outline';
							break;
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={DashboardScreen}
				options={{ tabBarLabel: 'Ôn tập' }}
			/>
			<Tab.Screen
				name="CommingSoo"
				component={CommingSoo}
				options={{ tabBarLabel: 'Comming soo..' }}
			/>
		</Tab.Navigator>
	);
}