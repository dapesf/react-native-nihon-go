import React from "react";
import {
	Text,
	View,
} from "react-native";

type KanjiExampleProps = {
	kanji: string;
	component: string[];
};

export default function KanjiExample({
	kanji,
	component,
}: KanjiExampleProps) {
	return (
		<View className="mt-[12px] px-[100px]">
			<View className="flex-row items-center justify-center">
				<View>
					<Text className="text-[42px] leading-[45px] text-[#111111]">
						{kanji}
					</Text>
				</View>

				<Text className="mx-[12px] text-[23px] text-[#333333]">
					→
				</Text>

				<View className="items-center">
					<Text className="text-[32px] leading-[34px] text-[#111111]">
						{component}
					</Text>
				</View>
			</View>
		</View>
	);
}