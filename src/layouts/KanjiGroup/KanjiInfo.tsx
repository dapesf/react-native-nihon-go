import React from "react";
import {
	ScrollView,
	Text,
	View,
} from "react-native";

import KanjiStrokeDiagram from "@/components/Kanji/KanjiStrokeDiagram";
import KanjiActionButtons from "@/components/Kanji/KanjiActionButtons";
import KanjiExample from "@/components/Kanji/KanjiExample";
import KanjiInfoRow from "@/components/Kanji/KanjiInfoRow";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/model/RootStackParamList";
import { useGetKanjiStroke } from "@/hooks/useGetKanjiStroke";

export default function KanjiInfo() {

	const route = useRoute<RouteProp<RootStackParamList, "KanjiInfoLayout">>();
	const { kanji } = route.params;

	const { kanjiData, loading, error } = useGetKanjiStroke(kanji);

	if (loading || !kanjiData) {
		return <View style={{ flex: 1 }} />;
	}

	return (
		<View className="flex-1 bg-white">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

				{/* STROKE DIAGRAM */}
				<KanjiStrokeDiagram
					data={kanjiData}
					size={280}
				//activeStrokeIndex={currentStroke}
				/>

				{/* ACTION BUTTONS */}
				<KanjiActionButtons />

				{/* EXAMPLE / MNEMONIC */}
				<KanjiExample />

				{/* DESCRIPTION */}
				<View className="px-[24px] pt-[3px]">
					<Text className="text-[15px] leading-[21px] text-[#222222]">
						Đó là{" "}
						<Text className="font-bold">
							buổi sáng
						</Text>{" "}
						của ngày 10 tháng 10(+十月十日).
					</Text>

					<Text className="mt-[1px] text-[11px] text-[#444444]">
						じゅうがつ + あさ
					</Text>

					<Text className="mt-[2px] text-[15px] text-[#222222]">
						十月十日の朝です
					</Text>
				</View>

				{/* INFO */}
				<View className="mt-[7px] px-[10px] pb-[20px]">
					<KanjiInfoRow
						label="Nghĩa"
						value="buổi sáng, triều đình"
					/>

					<KanjiInfoRow
						label="Hán việt"
						value="TRIỀU"
					/>

					<KanjiInfoRow
						label="Onyomi"
						value="チョウ"
						valueType="onyomi"
					/>

					<KanjiInfoRow
						label="Kunyomi"
						value="あさ"
						valueType="kunyomi"
					/>
				</View>
			</ScrollView>
		</View>
	);
}