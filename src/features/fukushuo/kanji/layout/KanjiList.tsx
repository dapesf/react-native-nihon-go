import React, { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
//
import KanjiRow from "../components/KanjiRow";
import KanjiPageIndex from "../components/KanjiPageIndex"
import { useGetKanjiList } from "../hooks/useGetKanjiList";

export default function KanjiList() {

	const [page, setPage] = useState<number>(1);
	const { kanjiData, loading } = useGetKanjiList(page);

	return (
		<View className="flex-1 bg-white">

			<View className="bg-white px-4 py-2 z-10">
				<KanjiPageIndex
					onChange={(page) => {
						setPage(page.id);
					}}
				/>
			</View>

			{loading ? (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#4F46E5" />
					<Text className="mt-2 text-slate-500">Đang tải dữ liệu...</Text>
				</View>
			) : (

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
			)}
		</View>
	);
}