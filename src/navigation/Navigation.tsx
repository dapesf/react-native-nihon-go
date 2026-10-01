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
import TangoGyokaiLayout from '@/features/fukushuo/tango_gyokai/layout/TangoGyokaiLayout';
import KanjiCheckLayout from '@/features/renshuo/kanji-quiz/layout/KanjiCheckLayout';
import DonZuGrammarScreen from '@/features/fukushuo/donzu-grammar/layout/DonZuGrammar';
import DonZuLessonDetailScreen from '@/features/fukushuo/donzu-grammar/layout/DonZuLessonDetail';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/shared/components/LanguageToggle';
import { APP_COLORS } from '@/shared/constants/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigatior: React.FC = () => {
	const { t } = useTranslation();
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor={APP_COLORS.primary} />
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: APP_COLORS.primary,
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
						headerRight: LanguageToggle,
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
						headerRight: LanguageToggle,
					}} >
				</Stack.Screen>
				<Stack.Screen
					name="TangoLayout"
					component={Tango}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('dashboard.items.vocab_1000'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="TangoGyokaiLayout"
					component={TangoGyokaiLayout}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('dashboard.items.vocab_gyokai'),
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
						headerTitle: t('dashboard.items.grammar_basic'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="DonZuGrammarLayout"
					component={DonZuGrammarScreen}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('dashboard.items.grammar_donzu'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="DonZuLessonDetailLayout"
					component={DonZuLessonDetailScreen}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: route.params?.lesson_title ?? 'Chi tiết',
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
						headerTitle: t('dashboard.items.kanji_basic'),
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
						headerTitle: t('dashboard.items.alphabet'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="KanjiCheckLayout"
					component={KanjiCheckLayout}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('renshuo.kanji_check.title'),
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
