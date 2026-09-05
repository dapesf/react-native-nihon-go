import React from "react";
import {
	Text,
	View,
} from "react-native";

export default function KanjiExample() {
	return (
		<View className="mt-[12px] px-[100px]">
			<View className="flex-row items-center justify-center">
				<View className="items-center">
					<Text className="text-[32px] leading-[34px] text-[#111111]">
						十月
					</Text>

					<Text className="text-[32px] leading-[34px] text-[#111111]">
						十日
					</Text>
				</View>

				<Text className="mx-[12px] text-[23px] text-[#333333]">
					→
				</Text>

				<View>
					<Text className="text-[42px] leading-[45px] text-[#111111]">
						朝
					</Text>
				</View>
			</View>
		</View>
	);
}