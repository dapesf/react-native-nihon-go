import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
//
import { TangoRecord } from '../type';

const TangoRow = ({
	item,
	index,
}: {
	item: TangoRecord;
	index: number;
}) => {
	return (
		<View className="flex-row border-b border-dashed border-gray-300 bg-white min-h-[48px]">
			<View className="flex-1 flex-row px-2">

				{/* Number */}
				<View className="w-[8%] items-center justify-center border-r border-dashed border-gray-300 px-1">
					<Text className="text-black text-sm font-semibold">
						{index + 1}
					</Text>
				</View>

				{/* Meaning */}
				<View className="w-[24%] justify-center border-r border-dashed border-gray-300 px-2 py-1.5">
					<Text className="text-black text-xl leading-tight font-medium">
						{item.meaning}
					</Text>
				</View>

				{/* Hanviet */}
				<View className="w-[16%] justify-center border-r border-dashed border-gray-300 px-1 py-1.5">
					<Text className="text-black text-sm font-bold uppercase leading-tight text-center">
						{item.hanviet}
					</Text>
				</View>

				{/* Kanji */}
				<View className="w-[24%] items-center justify-center border-r border-dashed border-gray-300 px-1 py-1">
					<Text className="text-black text-3xl font-normal text-center">
						{item.kanji}
					</Text>
				</View>

				{/* Hiragana */}
				<View className="flex-1 justify-center px-2 py-1.5">
					<Text className="text-black text-xl font-normal leading-tight">
						{item.hiragana}
					</Text>
				</View>

			</View>
		</View>
	);
}

export default TangoRow

const styles = StyleSheet.create({})