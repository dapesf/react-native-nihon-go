import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { APP_COLORS } from '@/shared/constants/colors';

interface DashboardItem {
	id: string;
	title: string;
	iconName: any;
	iconColor: string;
	navLink: string;
}

interface DashboardSection {
	title: string;
	data: DashboardItem[];
}

const SectionListItem: React.FC<{ item: DashboardItem; index: number; goToStack: (route: string) => void }> = ({ item, index, goToStack }) => (
	<TouchableOpacity
		onPress={() => goToStack(item.navLink)}
		style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? 'white' : '#F5F5F5' }]}
	>
		<View style={styles.iconContainer}>
			<MaterialCommunityIcons name={item.iconName} size={28} color={item.iconColor} />
		</View>
		<Text style={styles.itemTitle}>{item.title}</Text>
	</TouchableOpacity>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
	<View style={styles.sectionHeaderContainer}>
		<Text style={styles.sectionHeaderTitle}>{title}</Text>
	</View>
);

export default function RenshuoDashboard() {
	const { t } = useTranslation();
	const navigation = useNavigation<any>();

	const goToStack = (route: string) => {
		navigation.navigate(route);
	};

	const DashboardConstantList: DashboardSection[] = [
		{
			title: t('renshuo.dashboard.sections.kanji'),
			data: [
				{ 
					id: '1', 
					title: t('renshuo.dashboard.items.kanji_check'), 
					iconName: 'ideogram-cjk-variant', 
					iconColor: APP_COLORS?.menuKanji || '#E83E8C', 
					navLink: 'KanjiCheckLayout' 
				},
			],
		},
	];

	return (
		<View style={styles.container}>
			<SectionList
				sections={DashboardConstantList}
				keyExtractor={(item) => item.id}
				renderItem={({ item, index }) => <SectionListItem item={item} index={index} goToStack={goToStack} />}
				renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
				stickySectionHeadersEnabled={false}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
	},
	sectionHeaderContainer: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: '#EEEEEE',
	},
	sectionHeaderTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333333',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 15,
	},
	iconContainer: {
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemTitle: {
		marginLeft: 15,
		fontSize: 18,
		color: '#333333',
	},
	separator: {
		height: 1,
		backgroundColor: '#DDDDDD',
		marginLeft: 15 + 40 + 15,
	},
});
