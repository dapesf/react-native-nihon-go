import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

const VovabularyHeader = () => {
	return (
		<View style={styles.header}>
			<StatusBar barStyle="light-content" backgroundColor="#3F51B5" />
			<Text style={styles.headerTitle}>Vovabulary</Text>
		</View>
	)
}

export default VovabularyHeader

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
});