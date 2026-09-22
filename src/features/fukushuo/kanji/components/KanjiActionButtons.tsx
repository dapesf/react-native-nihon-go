import React from "react";
import {
	Pressable,
	View,
} from "react-native";
import {
	Heart,
	RotateCcw,
} from "lucide-react-native";

export default function KanjiActionButtons() {
	return (
		<View className="flex-row items-center justify-between px-[7px]">
			{/* Favorite */}
			<Pressable
				className="h-[38px] w-[38px] items-center justify-center rounded-[3px] bg-[#4169ad]"
				android_ripple={{
					color: "#31578f",
				}}
			>
				<Heart
					size={21}
					color="white"
					strokeWidth={1.5}
				/>
			</Pressable>

			{/* Reset animation */}
			<Pressable
				className="h-[38px] w-[38px] items-center justify-center rounded-[3px] bg-[#4169ad]"
				android_ripple={{
					color: "#31578f",
				}}
			>
				<RotateCcw
					size={21}
					color="white"
					strokeWidth={1.7}
				/>
			</Pressable>
		</View>
	);
}