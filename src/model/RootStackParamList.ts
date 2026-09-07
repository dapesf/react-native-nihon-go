import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	DashboardLayout: undefined;
	VocabularyLayout: undefined;
	KanjiListLayout: undefined;
	KanjiInfoLayout: { kanji: string };
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;