// base
import { StatusBar, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//custom
import '@/i18n';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from '@/model/RootStackParamList';
import DashboardScreen from '@/layouts/Dashboard';
import Grammar from '@/layouts/GrammarGroup/Grammar';
import KanjiList from '@/layouts/KanjiGroup/KanjiList';
import KanjiInfo from '@/layouts/KanjiGroup/KanjiInfo';
import ResetDatabase from '@/layouts/ResetDatabase';
import Alphabet from '@/layouts/Alphabet/Alphabet';
import Tango from '@/layouts/Tango/Tango';

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
				<Stack.Screen name="MainTabs" component={MainTabNavigator} />
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
					name="TangoLayout"
					component={Tango}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: 'Từ vựng',
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="GrammarLayout"
					component={Grammar}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: "Ngữ pháp",
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="KanjiListLayout"
					component={KanjiList}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: "Hán tự",
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="KanjiInfoLayout"
					component={KanjiInfo}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: route.params?.kanji ?? '',
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="ResetDatabaseLayout"
					component={ResetDatabase}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: 'Reset Database',
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="AlphabetLayout"
					component={Alphabet}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: 'Bảng chữ cái',
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
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
