// base
import { StatusBar, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//custom
import '@/i18n';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from '@/shared/types';
import DashboardScreen from '@/features/study/menu/screens/StudyDashboard';
//
import GrammarScreen from '@/features/study/grammar/screens/GrammarScreen';
import KanjiListScreen from '@/features/study/kanji/screens/KanjiListScreen';
import KanjiInfoScreen from '@/features/study/kanji/screens/KanjiInfoScreen';
import ResetDatabase from '@/features/settings/ResetDatabase';
import AlphabetScreen from '@/features/study/alphabet/screens/AlphabetScreen';
import TangoScreen from '@/features/study/tango/screens/TangoScreen';
import TangoGyokaiScreen from '@/features/study/tango-gyokai/screens/TangoGyokaiScreen';
import KanjiQuizScreen from '@/features/practice/kanji-quiz/screens/KanjiQuizScreen';
import DonZuGrammarScreen from '@/features/study/donzu-grammar/lesson/screens/DonZuGrammarScreen';
import DonZuLessonDetailScreen from '@/features/study/donzu-grammar/lesson/screens/DonZuLessonDetailScreen';
import GrammarExerciseScreen from '@/features/study/donzu-grammar/exercise/screens/GrammarExerciseScreen';
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
					component={TangoScreen}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('dashboard.items.vocab_1000'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="TangoGyokaiScreen"
					component={TangoGyokaiScreen}
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
					component={GrammarScreen}
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
					name="GrammarExerciseScreen"
					component={GrammarExerciseScreen}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('dashboard.items.grammar_donzu'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="KanjiListLayout"
					component={KanjiListScreen}
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
					component={KanjiInfoScreen}
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
					component={AlphabetScreen}
					options={({ route }) => ({
						headerShown: true,
						headerTitle: t('dashboard.items.alphabet'),
						headerTintColor: 'white',
						headerBackVisible: true,
						headerBackButtonDisplayMode: 'minimal',
					})}>
				</Stack.Screen>
				<Stack.Screen
					name="KanjiQuizScreen"
					component={KanjiQuizScreen}
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
