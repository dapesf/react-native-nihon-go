import React, { useEffect } from 'react';
import { Path } from 'react-native-svg';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withDelay,
	withTiming,
	Easing,
	useAnimatedReaction,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedStrokeProps {
	d: string;
	index: number;
	durationPerStroke?: number;
	strokeLength?: number;
	isAnimating: boolean;
	stroke: string,
	strokeWidth: number,
	opacity: number,
}

export const AnimatedKanjiStroke: React.FC<AnimatedStrokeProps> = ({
	d,
	index,
	durationPerStroke = 500,
	strokeLength = 300, // Độ dài khung viewBox tiêu chuẩn (thường 109x109 trong KanjiVG)
	isAnimating,
	stroke,
	strokeWidth,
	opacity
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
	}, [isAnimating, index, durationPerStroke]);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: strokeLength * (1 - progress.value),
	}));

	return (
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
	);
};