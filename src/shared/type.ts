import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface DashboardSection {
	title: string;
	data: DashboardItem[];
}

export interface DashboardItem {
	id: string;
	title: string;
	iconName: keyof typeof MaterialCommunityIcons.glyphMap;
	iconColor: string;
	navLink: keyof RootStackParamList;
}

export type MainTabParamList = {
	Home: undefined;
	Alphabet: undefined;
	Tango: undefined;
	Profile: undefined;
	CommingSoo: undefined;
};

export type RootStackParamList = {
	MainTabs: undefined;
	DashboardLayout: undefined;
	GrammarLayout: undefined;
	KanjiListLayout: undefined;
	ResetDatabaseLayout: undefined;
	KanjiInfoLayout: { kanji: string };
	AlphabetLayout: undefined;
	TangoLayout: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type Option = {
	key: any;
	value: string;
};

export type PageDropdownProps = {
	options?: Option[];
	value?: string;
	onChange?: (page: Option) => void;
};