import { DashboardSection } from "../model/DashboardItem";

const DashboardConstantList: DashboardSection[] = [
	{
		title: 'Cơ bản',
		data: [
			{ id: '1', title: 'Bảng chữ cái', iconName: 'format-text', iconColor: '#E15241', onPress: () => { } },
		],
	},
	{
		title: 'Từ vựng',
		data: [
			{ id: '2', title: '1000 Từ vựng - 12 Chủ đề', iconName: 'book-open-page-variant', iconColor: '#399E56', onPress: () => { } },
		],
	},
	{
		title: 'Ngữ pháp',
		data: [
			{ id: '3', title: 'Ngữ pháp', iconName: 'format-list-bulleted', iconColor: '#399E56', onPress: () => { } },
		],
	},
	{
		title: 'Kanji',
		data: [
			{ id: '4', title: 'Kanji', iconName: 'image-area', iconColor: '#399E56', onPress: () => { } },
		],
	},
];

export { DashboardConstantList };