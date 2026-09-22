// base
import { StatusBar, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//custom
import '@/i18n';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from '@/shared/type';
import DashboardScreen from '@/features/fukushuo/menu/layout/Dashboard';
//
import Grammar from '@/features/fukushuo/grammar/layout/Grammar';
import KanjiList from '@/features/fukushuo/kanji/layout/KanjiList';
import KanjiInfo from '@/features/fukushuo/kanji/layout/KanjiInfo';
import ResetDatabase from '@/features/other/ResetDatabase';
import Alphabet from '@/features/fukushuo/alphabet/layout/Alphabet';
import Tango from '@/features/fukushuo/tango/layout/Tango';

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
					name="MainTabs"
					component={MainTabNavigator}
					options={{
						headerShown: true,
						headerTitle: "",
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					}} >
				</Stack.Screen>
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
