import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// custom
import { DashboardHeader } from '@/components/DashBoard/DashboardHeader';
import { DashboardMenuList } from '@/components/DashBoard/DashboardMenuList';

const DashboardScreen: React.FC = () => {

	useEffect(() => {

	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<DashboardHeader />
			<DashboardMenuList></DashboardMenuList>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
	},
});

export default DashboardScreen;