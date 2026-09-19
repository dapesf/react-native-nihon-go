import React, { useEffect } from 'react';
import { Path, Text as SvgText } from 'react-native-svg';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withDelay,
	withTiming,
	Easing,
	useAnimatedReaction,
} from 'react-native-reanimated';
import { StrokeNumber } from '@/model/KanjiLayout/Kanji';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(SvgText);

interface AnimatedStrokeProps {
	d: string;
	index: number;
	durationPerStroke?: number;
	strokeLength?: number;
	isAnimating: boolean;
	stroke: string,
	strokeWidth: number,
	opacity: number,
	strokeNumber: StrokeNumber,
	drawAgainSeq: number,
}

export const AnimatedKanjiStroke: React.FC<AnimatedStrokeProps> = ({
	d,
	index,
	durationPerStroke = 500,
	strokeLength = 300,
	isAnimating,
	stroke,
	strokeWidth,
	opacity,
	strokeNumber,
	drawAgainSeq,
}) => {
	const progress = useSharedValue(0);
	useEffect(() => {
		if (isAnimating) {
			progress.value = 0;
			progress.value = withDelay(
				index * durationPerStroke,
				withTiming(1, {
					duration: durationPerStroke,
					easing: Easing.out(Easing.quad),
				})
			);
		} else {
			progress.value = 1;
		}
	}, [drawAgainSeq, isAnimating, index, durationPerStroke]);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: strokeLength * (1 - progress.value),
	}));

	const textAnimatedProps = useAnimatedProps(() => ({
		fillOpacity: progress.value * opacity,
	}));

	return (
		<>
			<AnimatedPath
				d={d}
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
				strokeDasharray={strokeLength}
				animatedProps={animatedProps}
				opacity={opacity}
			/>
			<AnimatedText
				key={`num-${strokeNumber.number}`}
				x={strokeNumber.x}
				y={strokeNumber.y}
				fill="#888888"
				fontSize="6"
				fontWeight="bold"
				animatedProps={textAnimatedProps}
			>
				{strokeNumber.number}
			</AnimatedText>
		</>
	);
};