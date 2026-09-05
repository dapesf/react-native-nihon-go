import React from "react";
import { FlatList, View } from "react-native";
//
import type { KanjiItem } from "@/model/KanjiLayout/Kanji";
//
import KanjiRow from "@/components/Kanji/KanjiRow";
import KanjiPageIndex from "@/components/Kanji/KanjiPageIndex"

const kanjiData: KanjiItem[] = [
	{
		id: "1",
		kanji: "朝",
		onyomi: "チョウ",
		kunyomi: "あさ",
		sinoVietnamese: "TRIỀU, TRIỀU",
		meaning: "buổi sáng, triều đình",
	},
	{
		id: "2",
		kanji: "昼",
		onyomi: "チュウ",
		kunyomi: "ひる",
		sinoVietnamese: "TRÚ",
		meaning: "buổi trưa",
	},
	{
		id: "3",
		kanji: "夜",
		onyomi: "ヤ",
		kunyomi: "よる/よ",
		sinoVietnamese: "DẠ",
		meaning: "ban đêm, dạ cảnh, dạ quang",
	},
	{
		id: "4",
		kanji: "晩",
		onyomi: "バン",
		kunyomi: undefined,
		sinoVietnamese: "VÃN",
		meaning: "buổi tối",
	},
];

export default function KanjiList() {
	return (
		<View className="flex-1 bg-white">
			<FlatList
				data={kanjiData}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={<KanjiPageIndex onChange={(page) => {
					//console.log("Selected:", page.id);
				}} />}
				renderItem={({ item, index }) => (
					<KanjiRow
						item={item}
						index={index}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}