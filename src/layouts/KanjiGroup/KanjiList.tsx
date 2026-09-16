import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
//
import KanjiRow from "@/components/Kanji/KanjiRow";
import KanjiPageIndex from "@/components/Kanji/KanjiPageIndex"
import { useGetKanjiList } from "@/hooks/useGetKanjiList";

export default function KanjiList() {

	const [page, setPage] = useState<number>(1);
	const { kanjiData } = useGetKanjiList(page);

	return (
		<View className="flex-1 bg-white">

			<View className="bg-white px-4 py-2 z-10">
				<KanjiPageIndex
					onChange={(page) => {
						setPage(page.id);
					}}
				/>
			</View>

			<FlatList
				data={kanjiData}
				keyExtractor={(item) => item.kanji}
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