import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
//
import TangoRow from "../components/TangoRow";
import CommonDropDownListModal from "@/shared/components/CommonDropDownListModal";
import { useTango } from "../hooks/useTango";
import { useTranslation } from "react-i18next";

export default function Tango() {

	const [mondai, setMondai] = useState<string>("1");
	const { tangoData, mondaiTangoData, loading } = useTango(mondai);
	const { t } = useTranslation();

	const renderHeader = () => (
		<View className="flex-row border-b border-dashed border-gray-300 bg-white min-h-[48px]">
			<View className="flex-1 flex-row px-2">
				<View className="w-[8%] items-center justify-center border-r border-dashed border-gray-300 px-1 py-3">
					<Text className="text-blue-800 font-extrabold text-base text-center">{t('fukushuo.tango.stt')}</Text>
				</View>
				<View className="w-[24%] items-center justify-center border-r border-dashed border-gray-300 px-2 py-3">
					<Text className="text-blue-800 font-extrabold text-base text-center">{t('fukushuo.tango.meaning')}</Text>
				</View>
				<View className="w-[16%] items-center justify-center border-r border-dashed border-gray-300 px-1 py-3">
					<Text className="text-blue-800 font-extrabold text-base text-center">{t('fukushuo.tango.hanviet')}</Text>
				</View>
				<View className="w-[24%] items-center justify-center border-r border-dashed border-gray-300 px-1 py-3">
					<Text className="text-blue-800 font-extrabold text-base text-center">{t('fukushuo.tango.kanji')}</Text>
				</View>
				<View className="flex-1 items-center justify-center px-2 py-3">
					<Text className="text-blue-800 font-extrabold text-base text-center">{t('fukushuo.tango.hiragana')}</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View className="flex-1 bg-white">

			<View className="bg-white px-4 py-2 z-10">
				<CommonDropDownListModal
					options={mondaiTangoData}
					onChange={(option: any) => {
						setMondai(option.key);
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
					data={tangoData}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<TangoRow
							item={item}
							index={index}
						/>
					)}
					ListHeaderComponent={renderHeader}
					stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
					initialNumToRender={15}
					windowSize={5}
				/>
			)}
			<View className="h-10"></View>
		</View>
	);
}