import React from 'react'
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

import { DashboardItem, DashboardSection } from '@/model/DashboardItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/model/RootStackParamList';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const SectionListItem: React.FC<{ item: DashboardItem; index: number, navigation: NavigationProp }> = ({ item, index, navigation }) => (
	<TouchableOpacity
		onPress={
			() => {
				navigation.replace(item.navLink)
			}
		}
		style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? 'white' : '#F5F5F5' }]} // Xử lý sọc vằn
	>
		<View style={styles.iconContainer}>
			{item.iconName === 'format-text' ? ( // Xử lý đặc biệt cho icon 'A'
				<Text style={[styles.specialIcon, { color: item.iconColor }]}>A</Text>
			) : (
				<MaterialCommunityIcons name={item.iconName} size={28} color={item.iconColor} />
			)}
		</View>
		<Text style={styles.itemTitle}>{item.title}</Text>
	</TouchableOpacity>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
	<View style={styles.sectionHeaderContainer}>
		<Text style={styles.sectionHeaderTitle}>{title}</Text>
	</View>
);

const DashboardMenuList = () => {

	const navigation = useNavigation<NavigationProp>();
	const { t, i18n } = useTranslation();
	const DashboardConstantList: DashboardSection[] = [
		{
			title: t('dashboard.sections.basic'),
			data: [
				{ id: '1', title: t('dashboard.items.alphabet'), iconName: 'format-text', iconColor: '#E15241', navLink: 'VocabularyLayout' },
			],
		},
		{
			title: t('dashboard.sections.vocabulary'),
			data: [
				{ id: '2', title: t('dashboard.items.vocab_1000'), iconName: 'book-open-page-variant', iconColor: '#399E56', navLink: 'VocabularyLayout' },
			],
		},
		{
			title: t('dashboard.sections.grammar'),
			data: [
				{ id: '3', title: t('dashboard.items.grammar_basic'), iconName: 'format-list-bulleted', iconColor: '#399E56', navLink: 'VocabularyLayout' },
			],
		},
		{
			title: t('dashboard.sections.kanji'),
			data: [
				{ id: '4', title: t('dashboard.items.kanji_basic'), iconName: 'image-area', iconColor: '#399E56', navLink: 'VocabularyLayout' },
			],
		},
	];

	const GotoPages = (item: DashboardItem) => {
		navigation.replace(item.navLink);
	};

	return (
		<>
			<SectionList
				sections={DashboardConstantList}
				keyExtractor={(item) => item.id}
				renderItem={({ item, index }) => <SectionListItem item={item} index={index} navigation={navigation} />}
				renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
				stickySectionHeadersEnabled={false} // Tắt hiệu ứng sticky của header
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</>
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
	specialIcon: {
		fontSize: 28,
		fontWeight: 'bold',
	},
	separator: {
		height: 1,
		backgroundColor: '#DDDDDD',
		marginLeft: 15 + 40 + 15,
	},
});

export { DashboardMenuList }