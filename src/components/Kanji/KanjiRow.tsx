import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heart } from 'lucide-react-native';
//
import { KanjiInfo } from '@/model/KanjiLayout/Kanji'
import useAppNavigation from '@/hooks/useAppNavigation';
//
import ReadingTag from '@/components/@ComponentCommon/ReadingTag'

const KanjiRow = ({
	item,
	index,
}: {
	item: KanjiInfo;
	index: number;
}) => {
	const { goToKanjiInfo } = useAppNavigation();
	return (
		<Pressable
			onPress={
				() => {
					goToKanjiInfo(item.kanji);
				}
			}
		>
			<View className="min-h-[50px] border-b border-[#dddddd] bg-orange">
				<View className="flex-row px-[10px] py-[7px]">
					{/* Number */}
					<View className="w-[27px] pt-[2px]">
						<Text className="text-[11px] text-[#999999]">
							{index + 1}.
						</Text>
					</View>

					{/* Kanji */}
					<View className="w-[66px] items-center justify-center">
						<Text
							className="text-[31px] font-normal text-[#4169ad]"
							style={{
								fontFamily:
									"Noto Sans CJK JP",
							}}
						>
							{item.kanji}
						</Text>
					</View>

					{/* Information */}
					<View className="flex-1 pl-[5px] pr-[35px]">
						{/* Readings */}
						<View className="mb-[4px] flex-row items-center">
							{item.readings_kun && (
								<ReadingTag type="kunyomi">
									{item.readings_kun}
								</ReadingTag>
							)}

							{item.readings_on && (
								<ReadingTag type="onyomi">
									{item.readings_on}
								</ReadingTag>
							)}

						</View>

						{/* Sino Vietnamese */}
						<Text className="text-[16px] leading-[20px] text-[#666666]">
							{item.han_viet}
						</Text>

						{/* Meaning */}
						<Text
							numberOfLines={1}
							className="text-[16px] leading-[21px] text-[#222222]"
						>
							{item.meaning}
						</Text>
					</View>

					{/* Favorite */}
					<Pressable
						className="absolute bottom-[13px] right-[12px] p-[4px]"
						hitSlop={10}
					>
						<Heart
							size={20}
							color="#cccccc"
							strokeWidth={1.6}
						/>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
}

export default KanjiRow

const styles = StyleSheet.create({})