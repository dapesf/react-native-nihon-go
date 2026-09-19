import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	DashboardLayout: undefined;
	GrammarLayout: undefined;
	KanjiListLayout: undefined;
	ResetDatabaseLayout: undefined;
	KanjiInfoLayout: { kanji: string };
	AlphabetLayout: undefined;
	TangoLayout: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;