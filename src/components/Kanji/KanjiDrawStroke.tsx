import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text as SvgText, G, Line } from 'react-native-svg';
import { KanjiViewerProps } from "@/model/KanjiLayout/Kanji";

import { AnimatedKanjiStroke } from '@/components/@ComponentCommon/AnimatedKanjiStroke'

// Mảng màu chuẩn cho từng nét (tự động quay vòng nếu số nét > số màu)
const DEFAULT_STROKE_COLORS = [
	'#E63946', '#1D3557', '#2A9D8F', '#E76F51', '#F4A261',
	'#9C27B0', '#0288D1', '#2E7D32', '#D81B60', '#F57C00'
];

const KanjiDrawStroke: React.FC<KanjiViewerProps> = ({
	data,
	size = 285,
	strokeColors = DEFAULT_STROKE_COLORS,
	showNumbers = true,
	activeStrokeIndex = null,
	drawAgainSeq,
}) => {

	return (
		<View className="relative w-full bg-white center w-80 m-auto mt-5" style={[styles.container]}>
			<Svg viewBox="0 0 109 109">

				{/* Center guide */}
				<Line
					x1="54.5"
					y1="0"
					x2="54.5"
					y2="109"
					stroke="#dddddd"
					strokeWidth="0.35"
					strokeDasharray="3 2"
				/>

				<Line
					x1="0"
					y1="54.5"
					x2="109"
					y2="54.5"
					stroke="#dddddd"
					strokeWidth="0.35"
					strokeDasharray="3 2"
				/>

				{/* 1. RENDER CÁC NÉT (PATHS) THEO THỨ TỰ */}
				<G id="strokes">
					{data.strokes.map((stroke, index) => {
						// Xác định màu cho từng nét
						const baseColor = strokeColors[index % strokeColors.length];
						const isActive = activeStrokeIndex === index;
						const isDimmed = activeStrokeIndex !== null && !isActive;

						return (
							<AnimatedKanjiStroke
								key={stroke.id || `stroke-${index}`}
								d={stroke.d}
								stroke={isActive ? '#FF0000' : baseColor}
								strokeWidth={isActive ? 4 : 3}
								opacity={isDimmed ? 0.2 : 1} // Làm mờ các nét khác nếu đang active 1 nét
								index={index}
								isAnimating={true}
								strokeNumber={data.numbers[index]}
								drawAgainSeq={drawAgainSeq}
							/>
						);
					})}
				</G>
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E0E0E0',
	},
});

export default KanjiDrawStroke