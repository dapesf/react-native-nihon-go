import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useKanjiCheck } from '../hooks/useKanjiCheck';

export default function KanjiCheckLayout() {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const {
		loading,
		error,
		questions,
		currentIndex,
		selectedOption,
		isCorrect,
		isFinished,
		handleSelectOption,
		handleNextQuestion,
		resetQuiz
	} = useKanjiCheck();

	// Animations
	const slideAnim = useRef(new Animated.Value(50)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const messageFadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Animate question entry
		slideAnim.setValue(50);
		fadeAnim.setValue(0);
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			})
		]).start();
	}, [currentIndex]);

	useEffect(() => {
		// Animate correct message
		if (isCorrect) {
			Animated.timing(messageFadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			messageFadeAnim.setValue(0);
		}
	}, [isCorrect]);

	const onNextPress = () => {
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: -50,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			})
		]).start(() => {
			handleNextQuestion();
		});
	};

	if (loading) {
		return (
			<View className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="#4F46E5" />
				<Text className="mt-2 text-slate-500">{t('common.loading_data')}</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View className="flex-1 bg-white justify-center items-center px-4">
				<Text className="text-red-500 text-center text-lg">{error}</Text>
				<TouchableOpacity
					className="mt-4 bg-indigo-600 px-6 py-2 rounded-full"
					onPress={() => navigation.goBack()}
				>
					<Text className="text-white font-bold">{t('common.back') || 'Quay lại'}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white">
			{isFinished ? (
				<View className="flex-1 justify-center items-center px-6">
					<Ionicons name="trophy" size={80} color="#FBBF24" />
					<Text className="text-2xl font-bold text-gray-800 mt-6 text-center">
						{t('renshuo.kanji_check.finished_message')}
					</Text>
					<TouchableOpacity
						className="mt-8 bg-indigo-600 px-8 py-3 rounded-full flex-row items-center w-64 justify-center"
						onPress={resetQuiz}
					>
						<Ionicons name="refresh" size={20} color="white" className="mr-2" />
						<Text className="text-white font-bold text-lg ml-2">
							{t('renshuo.kanji_check.restart_button')}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="mt-4 bg-indigo-600 px-8 py-3 rounded-full flex-row items-center w-64 justify-center"
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="list" size={20} color="white" className="mr-2" />
						<Text className="text-white font-bold text-lg ml-2">
							{t('renshuo.kanji_check.menu_button')}
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View className="flex-1">
					{/* Progress Bar */}
					<View className="px-6 pt-4 pb-2">
						<Text className="text-gray-500 font-medium mb-2">
							{t('renshuo.kanji_check.progress', { current: currentIndex + 1, total: questions.length })}
						</Text>
						<View className="h-2 bg-gray-200 rounded-full overflow-hidden">
							<View
								className="h-full bg-indigo-600 rounded-full"
								style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
							/>
						</View>
					</View>

					<Animated.View
						style={{
							flex: 1,
							opacity: fadeAnim,
							transform: [{ translateX: slideAnim }]
						}}
						className="px-6 py-4"
					>
						{/* Kanji Display */}
						<View className="items-center justify-center py-10">
							<Text className="text-9xl text-gray-800 font-bold">
								{questions[currentIndex]?.kanjiItem.kanji}
							</Text>
						</View>

						{/* Options */}
						<View className="flex-row flex-wrap justify-between mt-4">
							{questions[currentIndex]?.options.map((option, index) => {
								const isSelected = selectedOption === option;
								const isCorrectOption = option === questions[currentIndex].kanjiItem.han_viet;

								let buttonClass = "w-[48%] py-4 rounded-xl mb-4 border-2 justify-center items-center ";
								let textClass = "font-bold text-lg ";

								if (isSelected) {
									if (isCorrectOption) {
										buttonClass += "bg-green-100 border-green-500";
										textClass += "text-green-700";
									} else {
										buttonClass += "bg-red-100 border-red-500";
										textClass += "text-red-700";
									}
								} else if (isCorrect && isCorrectOption) {
									// Highlight correct option if user selected wrong
									buttonClass += "bg-green-100 border-green-500";
									textClass += "text-green-700";
								} else {
									buttonClass += "bg-white border-gray-300";
									textClass += "text-gray-700";
								}

								return (
									<TouchableOpacity
										key={index}
										disabled={isCorrect}
										activeOpacity={0.7}
										onPress={() => handleSelectOption(option)}
										className={buttonClass}
									>
										<Text className={textClass}>{option}</Text>
									</TouchableOpacity>
								);
							})}
						</View>

						{/* Correct Message */}
						<Animated.View style={{ opacity: messageFadeAnim }} className="items-center mt-4">
							<Text className="text-green-600 font-bold text-xl mb-1">
								{t('renshuo.kanji_check.correct_message')}
							</Text>
							<Text className="text-gray-600">
								Đáp án: {questions[currentIndex]?.kanjiItem.kanji} = {questions[currentIndex]?.kanjiItem.han_viet} ({questions[currentIndex]?.kanjiItem.meaning})
							</Text>
						</Animated.View>
					</Animated.View>

					{/* Next Button */}
					<View className="px-6 py-6 border-t border-gray-100">
						<TouchableOpacity
							className={`py-4 rounded-full items-center justify-center ${isCorrect ? 'bg-indigo-600' : 'bg-gray-300'}`}
							disabled={!isCorrect}
							onPress={onNextPress}
						>
							<Text className={`font-bold text-lg ${isCorrect ? 'text-white' : 'text-gray-500'}`}>
								{t('renshuo.kanji_check.next_button')}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}
