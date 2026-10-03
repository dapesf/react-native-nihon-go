import React, { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";

import KanjiDrawStroke from "../components/KanjiDrawStroke";
import KanjiActionButtons from "../components/KanjiActionButtons";
import KanjiExample from "../components/KanjiExample";
import KanjiInfoRow from "../components/KanjiInfoRow";

import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/shared/types";
import { useKanji } from "../hooks/useKanji";
import { Heart, RotateCcw } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function KanjiInfo() {

	const route = useRoute<RouteProp<RootStackParamList, "KanjiInfoLayout">>();
	const { kanji } = route.params;
	const { kanjiData, loading, error } = useKanji(kanji);
	const { t } = useTranslation();

	if (loading || !kanjiData) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#4F46E5" />
				<Text className="mt-2 text-slate-500">{t('common.loading_data')}</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white">

			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

				{/* STROKE DIAGRAM */}
				<KanjiDrawStroke
					data={kanjiData}
					size={280}
				/>

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
						label={t('kanji.meaning')}
						value={kanjiData.meaning}
					/>

					<KanjiInfoRow
						label={t('kanji.onyomi_kunyomi')}
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
						label={t('kanji.strokes_count')}
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