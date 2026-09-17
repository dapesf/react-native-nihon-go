import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	DashboardLayout: undefined;
	VocabularyLayout: undefined;
	KanjiListLayout: undefined;
	ResetDatabaseLayout: undefined;
	KanjiInfoLayout: { kanji: string };
	AlphabetLayout: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;