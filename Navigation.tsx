// base
import { StatusBar, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//custom
import '@/i18n';
import { RootStackParamList } from '@/model/RootStackParamList';
import DashboardScreen from '@/layouts/Dashboard';
import Vocabulary from '@/layouts/Vocabulary';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigatior: React.FC = () => {
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#3F51B5" />
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#3F51B5',
					},
				}}>
				<Stack.Screen
					name="DashboardLayout"
					component={DashboardScreen}
					options={{
						headerShown: true,
						headerTitle: "Mikun - N5",
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					}} >
				</Stack.Screen>
				<Stack.Screen
					name="VocabularyLayout"
					component={Vocabulary}
					options={{
						headerShown: true,
						headerTitle: "Vocabulary",
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					}} >
				</Stack.Screen>
			</Stack.Navigator>
		</>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#3F51B5',
	}
});

export default Navigatior
