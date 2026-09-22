import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Mode, SEION_DAKUON_DATA, YOON_DATA } from '@/constants/AlphabetData';

const Alphabet = () => {

	const [mode, setMode] = useState<Mode>('hiragana');

	return (
		<View className="flex-1 bg-white">
			{/* Danh sách bảng chữ cái cuộn dọc */}
			<ScrollView
			>
				{/* Phần 1: Bảng 5 Cột (Seion & Dakuon) */}
				<View className="flex-row flex-wrap pt-4">
					{SEION_DAKUON_DATA.map((item, index) => (
						<View key={index} className="w-[20%] items-center mb-6 h-16 justify-center">
							{item ? (
								<>
									<Text className="text-5xl font-medium text-slate-700">
										{mode === 'hiragana' ? item.hira : item.kata}
									</Text>
									<Text className="text-lg text-slate-400 font-normal mt-1">
										{item.romaji}
									</Text>
								</>
							) : null}
						</View>
					))}
				</View>

				{/* Phần 2: Bảng 3 Cột (Yoon - Âm ghép) */}
				<View className="flex-row flex-wrap">
					{YOON_DATA.map((item, index) => (
						<View key={index} className="w-[33.33%] items-center mb-6 h-16 justify-center">
							<Text className="text-5xl font-medium text-slate-700">
								{mode === 'hiragana' ? item.hira : item.kata}
							</Text>
							<Text className="text-lg text-slate-400 font-normal mt-1">
								{item.romaji}
							</Text>
						</View>
					))}
				</View>
			</ScrollView>

			<View className="h-20"></View>

			{/* Thanh Bottom Tab Switcher Cố Định */}
			<View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200"
			>
				<View className="flex-row h-20">
					<Pressable
						onPress={() => setMode('hiragana')}
						className="flex-1 items-center justify-center"
					>
						<Text
							className={`text-lg font-semibold ${mode === 'hiragana' ? 'text-indigo-600' : 'text-slate-800'
								}`}
						>
							Hiragana
						</Text>
					</Pressable>

					<Pressable
						onPress={() => setMode('katakana')}
						className="flex-1 items-center justify-center"
					>
						<Text
							className={`text-lg font-semibold ${mode === 'katakana' ? 'text-indigo-600' : 'text-slate-800'
								}`}
						>
							Katakana
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

export default Alphabet

const styles = StyleSheet.create({})