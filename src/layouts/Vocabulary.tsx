import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/model/RootStackParamList';
import { useNavigation } from '@react-navigation/native';
import useAppNavigation from '@/hooks/useAppNavigation';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Vocabulary = () => {

	const navigation = useNavigation<NavigationProp>();
	const { goBack } = useAppNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Vovabulary",
			headerTitleAlign: "left",
			headerShadowVisible: false,
			headerStyle: {
				backgroundColor: '#3F51B5',
			},
			headerLeft: () => (
				<>
					<Pressable
						onPress={() => goBack()}
					>
						<Ionicons name="arrow-back" size={18} color="black" />
					</Pressable>
				</>
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