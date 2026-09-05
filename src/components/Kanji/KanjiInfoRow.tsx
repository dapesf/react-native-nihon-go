import React from "react";
import {
	Text,
	View,
} from "react-native";

type KanjiInfoRowProps = {
	label: string;
	value: string;
	valueType?: "onyomi" | "kunyomi";
};

export default function KanjiInfoRow({
	label,
	value,
	valueType,
}: KanjiInfoRowProps) {
	const valueBackground =
		valueType === "onyomi"
			? "bg-[#eeeeee]"
			: valueType === "kunyomi"
				? "bg-[#f7e4df]"
				: "bg-transparent";

	return (
		<View className="mb-[5px] flex-row items-center">
			{/* Label */}
			<View className="mr-[10px] min-w-[73px] rounded-[3px] bg-[#eeeeee] px-[9px] py-[4px]">
				<Text className="text-center text-[14px] text-[#222222]">
					{label}
				</Text>
			</View>

			{/* Value */}
			<View
				className={`rounded-[2px] px-[2px] py-[2px] ${valueBackground}`}
			>
				<Text className="text-[15px] text-[#222222]">
					{value}
				</Text>
			</View>
		</View>
	);
}