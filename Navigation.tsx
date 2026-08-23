// base
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//custom
import { RootStackParamList } from './src/model/RootStackParamList';
import DashboardScreen from './src/layouts/Dashboard';
import Vocabulary from './src/layouts/Vocabulary';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigatior = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<Stack.Navigator
				screenOptions={{}}>
				<Stack.Screen
					name="DashboardLayout"
					component={DashboardScreen}
					options={{
						headerShown: false
					}} >
				</Stack.Screen>
				<Stack.Screen
					name="VocabularyLayout"
					component={Vocabulary}
					options={{
						title: "",
					}} >
				</Stack.Screen>
			</Stack.Navigator>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#3F51B5',
	}
});

export default Navigatior
