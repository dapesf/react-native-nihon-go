import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

// custom
import { DashboardMenuList } from '../components/DashboardMenuList';

const DashboardScreen: React.FC = () => {

	useEffect(() => {

	}, [])

	return (
		<>
			<DashboardMenuList></DashboardMenuList>
		</>
	);
};

const styles = StyleSheet.create({

});

export default DashboardScreen;