import React, { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";

import KanjiDrawStroke from "@/components/Kanji/KanjiDrawStroke";
import KanjiActionButtons from "@/components/Kanji/KanjiActionButtons";
import KanjiExample from "@/components/Kanji/KanjiExample";
import KanjiInfoRow from "@/components/Kanji/KanjiInfoRow";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/model/RootStackParamList";
import { useGetKanji } from "@/hooks/useGetKanji";
import { Heart, RotateCcw } from "lucide-react-native";

export default function KanjiInfo() {

	const route = useRoute<RouteProp<RootStackParamList, "KanjiInfoLayout">>();
	const { kanji } = route.params;
	const { kanjiData, loading, error } = useGetKanji(kanji);

	const [drawAgainSeq, setDrawAgainSeq] = useState<number>(0);

	if (loading || !kanjiData) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#4F46E5" />
				<Text className="mt-2 text-slate-500">Đang tải dữ liệu...</Text>
			</View>
		);
	}

	const handleRedraw = () => {
		setDrawAgainSeq((prev) => prev + 1);
	};

	return (
		<View className="flex-1 bg-white">

			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

				{/* STROKE DIAGRAM */}
				<KanjiDrawStroke
					data={kanjiData}
					size={280}
					drawAgainSeq={drawAgainSeq}
				/>

				{/* ACTION BUTTONS */}
				<View className="flex-row items-center justify-between px-[7px]">
					{/* Reset animation */}
					<Pressable
						className="h-[38px] w-[38px] items-center justify-center rounded-[3px] bg-[#4169ad]"
						android_ripple={{
							color: "#31578f",
						}}
					>
						<Heart
							size={21}
							color="white"
							strokeWidth={1.5}
						/>
					</Pressable>

					<Pressable
						onPress={handleRedraw}
						className="h-[38px] w-[38px] items-center justify-center rounded-[3px] bg-[#4169ad]"
						android_ripple={{
							color: "#31578f",
						}}
					>
						<RotateCcw
							size={21}
							color="white"
							strokeWidth={1.7}
						/>
					</Pressable>
				</View>

				{/* EXAMPLE / MNEMONIC */}
				<KanjiExample
					kanji={kanjiData.kanji}
					component={kanjiData.component}
				/>

				{/* DESCRIPTION */}
				{/* <View className="px-[24px] pt-[3px]">
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
				</View> */}

				{/* INFO */}
				<View className="mt-[7px] px-[10px] pb-[20px]">
					<KanjiInfoRow
						label="Nghĩa"
						value={kanjiData.meaning}
					/>

					<KanjiInfoRow
						label="Hán việt"
						value={kanjiData.han_viet}
					/>

					<KanjiInfoRow
						label="Kunyomi"
						value={kanjiData.readings_kun}
						valueType="kunyomi"
					/>

					<KanjiInfoRow
						label="Onyomi"
						value={kanjiData.readings_on}
						valueType="onyomi"
					/>

					<KanjiInfoRow
						label="Số nét"
						value={kanjiData.strokes_num}
					/>

					<KanjiInfoRow
						label="JLPT"
						value={kanjiData.jlpt_lvl}
						valueType="onyomi"
					/>

				</View>
			</ScrollView>
		</View>
	);
}