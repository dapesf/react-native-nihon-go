import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
//
import TangoRow from "@/components/Tango/TangoRow";
import KanjiPageIndex from "@/components/Kanji/KanjiPageIndex"
import { useGetTango } from "@/hooks/useGetTango";

export default function Tango() {

	const [page, setPage] = useState<number>(1);
	const { tangoData } = useGetTango();

	return (
		<View className="flex-1 bg-white">

			{/* <View className="bg-white px-4 py-2 z-10">
				<KanjiPageIndex
					onChange={(page) => {
						setPage(page.id);
					}}
				/>
			</View> */}

			<FlatList
				data={tangoData}
				keyExtractor={(item) => item.id}
				renderItem={({ item, index }) => (
					<TangoRow
						item={item}
						index={index}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
			<View className="h-10"></View>
		</View>
	);
}