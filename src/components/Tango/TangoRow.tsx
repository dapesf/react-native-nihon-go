import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heart } from 'lucide-react-native';
//
import { TangoRecord } from '@/model/Tango/Tango';
//
const TangoRow = ({
	item,
	index,
}: {
	item: TangoRecord;
	index: number;
}) => {
	return (
		<View className="border-b border-[#dddddd] bg-orange">
			<View className="flex-row px-[10px]">

				{/* Number */}
				<View className="w-[5%] pt-[2px]">
					<Text className="text-[11px] text-[#999999]">
						{index + 1}
					</Text>
				</View>

				{/* Kanji */}
				<View className="w-[30%] justify-center border-l border-[#dddddd]">
					<Text
						className="text-[15px] font-normal text-[#4169ad]"
						style={{
							fontFamily:
								"Noto Sans CJK JP",
						}}
					>
						{item.meaning}
					</Text>
				</View>

				{/* Kanji */}
				<View className="w-[25%] justify-center border-l border-[#dddddd]">
					<Text
						className="text-[15px] font-normal text-[#4169ad]"
						style={{
							fontFamily:
								"Noto Sans CJK JP",
						}}
					>
						{item.hanviet}
					</Text>
				</View>

				{/* Kanji */}
				<View className="w-[15%] justify-center border-l border-[#dddddd]">
					<Text
						className="text-[15px] font-normal text-[#4169ad]"
						style={{
							fontFamily:
								"Noto Sans CJK JP",
						}}
					>
						{item.kanji}
					</Text>
				</View>

				{/* Kanji */}
				<View className="w-[25%] justify-center border-l border-[#dddddd]">
					<Text
						className="text-[15px] font-normal text-[#4169ad]"
						style={{
							fontFamily:
								"Noto Sans CJK JP",
						}}
					>
						{item.hiragana}
					</Text>
				</View>

			</View>
		</View>
	);
}

export default TangoRow

const styles = StyleSheet.create({})