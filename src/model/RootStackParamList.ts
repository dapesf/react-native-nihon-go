import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	DashboardLayout: undefined;
	VocabularyLayout: undefined;
	KanjiListLayout: undefined;
	KanjiInfoLayout: undefined;
	// RangeOfMotion: { title: string };
	// RangeOfMotionSummary: { key: string };
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;