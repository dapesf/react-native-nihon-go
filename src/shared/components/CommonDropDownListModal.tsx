import React, { useRef, useState, useEffect } from "react";
import {
	Modal,
	Pressable,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
// import { Check, ChevronDown } from "lucide-react-native";
import type { Option, PageDropdownProps } from "@/shared/types";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const defaultPages: Option[] = [
];

export default function CommonDropDownListModal({
	options = defaultPages,
	value,
	onChange,
}: PageDropdownProps) {

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedId, setSelectedId] = useState(
		value ?? options[0]?.key
	);
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		if (isDropdownOpen && flatListRef.current && options.length > 0) {
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({
					index: currentIndex,
					animated: true,
					viewPosition: 0.5,
				});
			}, 200);
		}
	}, [isDropdownOpen, currentIndex, options.length]);

	const currentItem = options[currentIndex];
	return (
		<>
			{/* DROPDOWN TRIGGER */}
			<View className="border-b border-gray-200 bg-gray-50">
				<TouchableOpacity
					onPress={() => setIsDropdownOpen(true)}
					className="flex-row justify-between items-center bg-white border border-gray-300 p-3 rounded-lg shadow-sm"
				>
					<Text className="text-lg font-medium text-gray-800" numberOfLines={1}>
						{currentItem?.value}
					</Text>
					<Ionicons name="chevron-down" size={24} color="#4b5563" />
				</TouchableOpacity>
			</View>

			{/*  MODAL */}
			<Modal visible={isDropdownOpen} transparent animationType="fade">
				<TouchableOpacity
					className="flex-1 bg-black/40 justify-center items-center"
					activeOpacity={1}
					onPress={() => setIsDropdownOpen(false)}
				>
					<View className="bg-white w-5/6 max-h-[70%] rounded-xl shadow-lg overflow-hidden">
						<View className="p-4 border-b border-gray-200 bg-gray-50 flex-row justify-between items-center">
							<Text className="text-lg font-bold text-gray-800"></Text>
							<TouchableOpacity onPress={() => setIsDropdownOpen(false)}>
								<Ionicons name="close" size={24} color="#4b5563" />
							</TouchableOpacity>
						</View>
						<FlatList
							ref={flatListRef}
							data={options}
							keyExtractor={(item) => item.key.toString()}
							onScrollToIndexFailed={(info) => {
								const wait = new Promise(resolve => setTimeout(resolve, 500));
								wait.then(() => {
									flatListRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.5 });
								});
							}}
							renderItem={({ item: option, index }) => (
								<TouchableOpacity
									onPress={() => {
										onChange?.(option);
										setCurrentIndex(index);
										setIsDropdownOpen(false);
										setSelectedId(option.key)
									}}
									className={`p-4 border-b border-gray-100 flex-row items-center justify-between ${index === currentIndex ? 'bg-blue-50' : 'bg-white'
										}`}
								>
									<Text
										className={`text-base flex-1 pr-2 ${index === currentIndex ? 'text-blue-600 font-bold' : 'text-gray-700'
											}`}
									>
										{option.value}
									</Text>
									{index === currentIndex && (
										<Ionicons name="checkmark" size={20} color="#2563eb" />
									)}
								</TouchableOpacity>
							)}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
}