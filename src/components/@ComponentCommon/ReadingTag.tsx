import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReadingTag = ({
	children,
	type,
}: {
	children: string;
	type: "onyomi" | "kunyomi";
}) => {
	return (
		<View
			className={`mr-[5px] rounded-[2px] px-[6px] py-[2px] ${type === "onyomi"
				? "bg-[#eeeeee]"
				: "bg-[#f7e4df]"
				}`}
		>
			<Text className="text-[14px] leading-[17px] text-[#111111]">
				{children}
			</Text>
		</View>
	);
}

export default ReadingTag

const styles = StyleSheet.create({})