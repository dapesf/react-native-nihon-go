import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { deleteDatabaseAsync, useSQLiteContext } from 'expo-sqlite';

const ResetDatabase = () => {
	const db = useSQLiteContext();

	const rsDatabase = async () => {
		try {
			// 1. Đóng connection hiện tại của SQLiteProvider
			await db.closeAsync();

			// 2. Xóa database
			await deleteDatabaseAsync('nihongo.db');

			Alert.alert(
				'Thành công',
				'Database đã được xóa. Hãy tắt app và mở lại.'
			);
		} catch (error) {
			console.error('Reset database error:', error);

			Alert.alert(
				'Lỗi',
				error instanceof Error
					? error.message
					: String(error)
			);
		};
	}

	return (
		<View>
			<Text>ResetDatabase</Text>
			<Button
				title="Reset Database"
				onPress={rsDatabase}
			/>
		</View>
	)
}

export default ResetDatabase

const styles = StyleSheet.create({})