import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/model/RootStackParamList';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Vocabulary = () => {

	const navigation = useNavigation<NavigationProp>();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Vovabulary",
			headerTitleAlign: "left",
			// headerStyle: {
			// 	elevation: 0,
			// 	shadowOpacity: 0,
			// 	borderBottomWidth: 0,
			// },
			headerLeft: () => (
				<View className="flex-row items-center">
					<Pressable
						onPress={
							() => navigation.replace("DashboardLayout")
						}
						className="flex-row items-center bg-gray-100 px-3 py-1 rounded-lg"
					>
						<Ionicons name="arrow-back" size={18} color="black" />
						<Text className="ml-1 text-sm font-medium">Back</Text>
					</Pressable>
				</View>
			)
		});
	}, []);

	useEffect(() => {

	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text>Vocabulary</Text>
			</View>
		</SafeAreaView>
	)
}

export default Vocabulary

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
	},
});