import React from "react";
import {
	Text,
	View,
} from "react-native";
import Svg, {
	Path,
	Line,
} from "react-native-svg";

import {
	RotateCcw,
} from "lucide-react-native";

type Stroke = {
	id: number;
	path: string;
	color: string;
	numberPosition: {
		x: number;
		y: number;
	};
};

/**
 * Demo data.
 *
 * Sau này thay path bằng dữ liệu KanjiVG.
 */
const strokes: Stroke[] = [
	{
		id: 1,
		path: "M20 35 C45 36 70 35 90 33",
		color: "#55b82a",
		numberPosition: { x: 12, y: 31 },
	},
	{
		id: 2,
		path: "M48 15 C51 30 50 45 50 58",
		color: "#25b82a",
		numberPosition: { x: 30, y: 18 },
	},
	{
		id: 3,
		path: "M22 52 C42 50 65 48 86 47",
		color: "#00a889",
		numberPosition: { x: 15, y: 51 },
	},
	{
		id: 4,
		path: "M25 60 C45 59 67 57 84 55",
		color: "#00a889",
		numberPosition: { x: 18, y: 65 },
	},
	{
		id: 5,
		path: "M30 67 C45 65 62 63 80 61",
		color: "#1378c9",
		numberPosition: { x: 26, y: 70 },
	},
	{
		id: 6,
		path: "M34 74 C50 72 65 70 82 68",
		color: "#064dce",
		numberPosition: { x: 25, y: 77 },
	},
	{
		id: 7,
		path: "M15 82 C38 80 63 78 90 76",
		color: "#172eb5",
		numberPosition: { x: 8, y: 83 },
	},
	{
		id: 8,
		path: "M52 63 C52 77 51 88 51 98",
		color: "#6200c7",
		numberPosition: { x: 41, y: 80 },
	},
	{
		id: 9,
		path: "M50 55 C55 40 60 25 60 15",
		color: "#d100a6",
		numberPosition: { x: 62, y: 40 },
	},
	{
		id: 10,
		path: "M61 15 C75 14 82 13 90 11 L90 58",
		color: "#d00082",
		numberPosition: { x: 62, y: 10 },
	},
	{
		id: 11,
		path: "M62 36 C73 35 82 34 90 33",
		color: "#bc0000",
		numberPosition: { x: 64, y: 35 },
	},
	{
		id: 12,
		path: "M63 56 C73 55 82 54 90 53",
		color: "#c82b21",
		numberPosition: { x: 64, y: 55 },
	},
];

export default function KanjiStrokeDiagram() {
	return (
		<View className="relative h-[285px] w-full bg-white">
			<Svg
				width="100%"
				height="270"
				viewBox="0 0 109 109"
				preserveAspectRatio="xMidYMid meet"
			>
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

				{strokes.map((stroke) => (
					<Path
						key={stroke.id}
						d={stroke.path}
						fill="none"
						stroke={stroke.color}
						strokeWidth={3.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				))}
			</Svg>

			{/* Stroke numbers */}
			{strokes.map((stroke) => (
				<Text
					key={`number-${stroke.id}`}
					className="absolute text-[16px] text-[#333333]"
					style={{
						left: `${stroke.numberPosition.x}%`,
						top: `${stroke.numberPosition.y}%`,
					}}
				>
					{stroke.id}
				</Text>
			))}
		</View>
	);
}