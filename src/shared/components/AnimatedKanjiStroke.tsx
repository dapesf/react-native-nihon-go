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
import { StrokeNumber } from '@/features/fukushuo/kanji/type';

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

const estimatePathLength = (d: string): number => {
	let length = 0;
	const segments = d.match(/[a-zA-Z][^a-zA-Z]*/g);
	if (!segments) return 300;
	
	let currentX = 0;
	let currentY = 0;

	for (const segment of segments) {
		const command = segment[0];
		const args = segment.slice(1).match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
		
		if (command === 'M' || command === 'm') {
			if (args.length >= 2) {
				currentX = command === 'M' ? args[0] : currentX + args[0];
				currentY = command === 'M' ? args[1] : currentY + args[1];
			}
		} else if (command === 'c' || command === 'C') {
			for (let i = 0; i < args.length; i += 6) {
				if (i + 5 < args.length) {
					const dx = command === 'c' ? args[i+4] : args[i+4] - currentX;
					const dy = command === 'c' ? args[i+5] : args[i+5] - currentY;
					length += Math.sqrt(dx*dx + dy*dy) * 1.15;
					currentX = command === 'c' ? currentX + dx : args[i+4];
					currentY = command === 'c' ? currentY + dy : args[i+5];
				}
			}
		} else if (command === 's' || command === 'S') {
			for (let i = 0; i < args.length; i += 4) {
				if (i + 3 < args.length) {
					const dx = command === 's' ? args[i+2] : args[i+2] - currentX;
					const dy = command === 's' ? args[i+3] : args[i+3] - currentY;
					length += Math.sqrt(dx*dx + dy*dy) * 1.15;
					currentX = command === 's' ? currentX + dx : args[i+2];
					currentY = command === 's' ? currentY + dy : args[i+3];
				}
			}
		} else if (command === 'l' || command === 'L') {
			for (let i = 0; i < args.length; i += 2) {
				if (i + 1 < args.length) {
					const dx = command === 'l' ? args[i] : args[i] - currentX;
					const dy = command === 'l' ? args[i+1] : args[i+1] - currentY;
					length += Math.sqrt(dx*dx + dy*dy);
					currentX = command === 'l' ? currentX + dx : args[i];
					currentY = command === 'l' ? currentY + dy : args[i+1];
				}
			}
		}
	}
	return Math.min(Math.max(length + 15, 20), 400); // add padding to prevent gaps
};

export const AnimatedKanjiStroke: React.FC<AnimatedStrokeProps> = ({
	d,
	index,
	durationPerStroke = 500,
	isAnimating,
	stroke,
	strokeWidth,
	opacity,
	strokeNumber,
	drawAgainSeq,
}) => {
	const progress = useSharedValue(0);
	const calculatedStrokeLength = React.useMemo(() => estimatePathLength(d), [d]);

	useEffect(() => {
		if (isAnimating) {
			const animationDuration = durationPerStroke * 0.75; // 75% for drawing, 25% delay
			progress.value = 0;
			progress.value = withDelay(
				index * durationPerStroke,
				withTiming(1, {
					duration: animationDuration,
					easing: Easing.bezier(0.25, 0.1, 0.25, 1), // smooth ease-out brush effect
				})
			);
		} else {
			progress.value = 1;
		}
	}, [drawAgainSeq, isAnimating, index, durationPerStroke]);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: calculatedStrokeLength * (1 - progress.value),
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
				strokeDasharray={calculatedStrokeLength}
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