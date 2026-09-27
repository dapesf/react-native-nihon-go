import React, { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
//
import KanjiRow from "../components/KanjiRow";
import KanjiPageIndex from "../components/KanjiPageIndex"
import { useGetKanjiList } from "../hooks/useGetKanjiList";
import { useTranslation } from "react-i18next";

export default function KanjiList() {

	const [page, setPage] = useState<number>(1);
	const { kanjiData, loading } = useGetKanjiList(page);
	const { t } = useTranslation();

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
					<Text className="mt-2 text-slate-500">{t('common.loading_data')}</Text>
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