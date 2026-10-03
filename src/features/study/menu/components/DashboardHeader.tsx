import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

const DashboardHeader = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>Mikun - N5</Text>
			<TouchableOpacity style={styles.headerRightIcon}>
				<MaterialCommunityIcons name="book-open-variant" size={24} color="white" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#3F51B5', // Màu xanh tiêu đề
		height: 60, // Chiều cao header chính xác hơn
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
	},
	headerTitle: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
	headerRightIcon: {
		position: 'absolute',
		right: 15,
	},
});

export { DashboardHeader }