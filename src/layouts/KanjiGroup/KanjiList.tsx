import React from "react";
import { FlatList, View } from "react-native";
//
import KanjiRow from "@/components/Kanji/KanjiRow";
import KanjiPageIndex from "@/components/Kanji/KanjiPageIndex"
import { useGetKanjiList } from "@/hooks/useGetKanjiList";

export default function KanjiList() {

	const { kanjiData } = useGetKanjiList();

	return (
		<View className="flex-1 bg-white">
			<FlatList
				data={kanjiData}
				keyExtractor={(item) => item.kanji}
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