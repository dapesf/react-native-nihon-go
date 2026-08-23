import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "./RootStackParamList";

interface DashboardSection {
	title: string;
	data: DashboardItem[];
}

interface DashboardItem {
	id: string;
	title: string;
	iconName: keyof typeof MaterialCommunityIcons.glyphMap;
	iconColor: string;
	navLink: keyof RootStackParamList;
}

export type { DashboardSection, DashboardItem }