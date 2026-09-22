import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
//
import TangoRow from "../components/TangoRow";
import CommonDropDownListModal from "@/shared/components/CommonDropDownListModal";
import { useGetTango } from "../hooks/useGetTango";

export default function Tango() {

	const [mondai, setMondai] = useState<string>("1");
	const { tangoData, mondaiTangoData, loading } = useGetTango(mondai);

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
					<Text className="mt-2 text-slate-500">Đang tải dữ liệu...</Text>
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
					showsVerticalScrollIndicator={false}
					initialNumToRender={15}
					windowSize={5}
				/>
			)}
			<View className="h-10"></View>
		</View>
	);
}