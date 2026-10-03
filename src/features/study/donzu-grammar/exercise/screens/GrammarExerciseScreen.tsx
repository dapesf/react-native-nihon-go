import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useGrammarExercise } from '../hooks/useGrammarExercise';
import { RootStackParamList } from '@/shared/types';

type GrammarExerciseRouteProp = RouteProp<RootStackParamList, 'GrammarExerciseScreen'>;

export default function GrammarExerciseScreen() {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const route = useRoute<GrammarExerciseRouteProp>();
	const { lesson_number } = route.params;

	const {
		loading,
		error,
		questions,
		currentIndex,
		selectedAnswer,
		selectedWords,
		isAnswered,
		isCorrect,
		isFinished,
		score,
		handleSelectFillBlank,
		handleSelectWord,
		handleRemoveWord,
		handleCheckSentenceOrder,
		handleNextQuestion,
		resetQuiz,
	} = useGrammarExercise(lesson_number);

	// Animations
	const slideAnim = useRef(new Animated.Value(50)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const feedbackAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
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
		if (isAnswered) {
			Animated.timing(feedbackAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			feedbackAnim.setValue(0);
		}
	}, [isAnswered]);

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

	// === Loading ===
	if (loading) {
		return (
			<View className="flex-1 bg-white justify-center items-center">
				<ActivityIndicator size="large" color="#4F46E5" />
				<Text className="mt-2 text-slate-500">{t('common.loading_data')}</Text>
			</View>
		);
	}

	// === Error ===
	if (error) {
		return (
			<View className="flex-1 bg-white justify-center items-center px-4">
				<Ionicons name="alert-circle" size={60} color="#EF4444" />
				<Text className="text-red-500 text-center text-lg mt-4">{t(error)}</Text>
				<TouchableOpacity
					className="mt-6 bg-indigo-600 px-6 py-3 rounded-full"
					onPress={() => navigation.goBack()}
				>
					<Text className="text-white font-bold">{t('renshuo.grammar_exercise.back_button')}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	// === No data ===
	if (questions.length === 0) {
		return (
			<View className="flex-1 bg-white justify-center items-center px-4">
				<Ionicons name="document-text-outline" size={60} color="#9CA3AF" />
				<Text className="text-gray-500 text-center text-lg mt-4">
					{t('renshuo.grammar_exercise.no_exercises')}
				</Text>
				<TouchableOpacity
					className="mt-6 bg-indigo-600 px-6 py-3 rounded-full"
					onPress={() => navigation.goBack()}
				>
					<Text className="text-white font-bold">{t('renshuo.grammar_exercise.back_button')}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	// === Finished ===
	if (isFinished) {
		return (
			<View className="flex-1 bg-white justify-center items-center px-6">
				<Ionicons name="trophy" size={80} color="#FBBF24" />
				<Text className="text-2xl font-bold text-gray-800 mt-6 text-center">
					{t('renshuo.grammar_exercise.finished_message')}
				</Text>
				<Text className="text-lg text-gray-600 mt-2">
					{t('renshuo.grammar_exercise.score', { score, total: questions.length })}
				</Text>

				<TouchableOpacity
					className="mt-8 bg-indigo-600 px-8 py-3 rounded-full flex-row items-center w-64 justify-center"
					onPress={resetQuiz}
				>
					<Ionicons name="refresh" size={20} color="white" />
					<Text className="text-white font-bold text-lg ml-2">
						{t('renshuo.grammar_exercise.restart_button')}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="mt-4 bg-indigo-600 px-8 py-3 rounded-full flex-row items-center w-64 justify-center"
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="list" size={20} color="white" />
					<Text className="text-white font-bold text-lg ml-2">
						{t('renshuo.grammar_exercise.back_button')}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const currentQuestion = questions[currentIndex];

	return (
		<View className="flex-1 bg-white">
			{/* Progress Bar */}
			<View className="px-6 pt-4 pb-2">
				<Text className="text-gray-500 font-medium mb-2">
					{t('renshuo.grammar_exercise.progress', { current: currentIndex + 1, total: questions.length })}
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
			>
				<ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
					{currentQuestion.type === 'fill_blank' && (
						<FillBlankView
							question={currentQuestion.data}
							selectedAnswer={selectedAnswer}
							isAnswered={isAnswered}
							isCorrect={isCorrect}
							onSelect={handleSelectFillBlank}
						/>
					)}

					{currentQuestion.type === 'sentence_order' && (
						<SentenceOrderView
							question={currentQuestion.data}
							selectedWords={selectedWords}
							isAnswered={isAnswered}
							isCorrect={isCorrect}
							onSelectWord={handleSelectWord}
							onRemoveWord={handleRemoveWord}
							onCheck={handleCheckSentenceOrder}
						/>
					)}

					{/* Feedback */}
					<Animated.View style={{ opacity: feedbackAnim }} className="mt-4">
						{isAnswered && (
							<View className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
								<View className="flex-row items-center mb-2">
									<Ionicons
										name={isCorrect ? 'checkmark-circle' : 'close-circle'}
										size={24}
										color={isCorrect ? '#16A34A' : '#DC2626'}
									/>
									<Text className={`font-bold text-lg ml-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
										{isCorrect
											? t('renshuo.grammar_exercise.correct')
											: t('renshuo.grammar_exercise.incorrect')}
									</Text>
								</View>
								{!isCorrect && currentQuestion.type === 'fill_blank' && (
									<Text className="text-gray-700 mb-1">
										{t('renshuo.grammar_exercise.correct_answer_label')}: {currentQuestion.data.correctAnswer}
									</Text>
								)}
								{!isCorrect && currentQuestion.type === 'sentence_order' && (
									<Text className="text-gray-700 mb-1">
										{t('renshuo.grammar_exercise.correct_answer_label')}: {currentQuestion.data.correctOrder.join(' ')}
									</Text>
								)}
								{(currentQuestion.type === 'fill_blank' ? currentQuestion.data.explanation : currentQuestion.data.explanation) && (
									<Text className="text-gray-600 mt-1">
										{currentQuestion.type === 'fill_blank'
											? currentQuestion.data.explanation
											: currentQuestion.data.explanation}
									</Text>
								)}
							</View>
						)}
					</Animated.View>
				</ScrollView>
			</Animated.View>

			{/* Next Button */}
			<View className="px-6 py-6 border-t border-gray-100">
				<TouchableOpacity
					className={`py-4 rounded-full items-center justify-center ${isAnswered ? 'bg-indigo-600' : 'bg-gray-300'}`}
					disabled={!isAnswered}
					onPress={onNextPress}
				>
					<Text className={`font-bold text-lg ${isAnswered ? 'text-white' : 'text-gray-500'}`}>
						{t('renshuo.grammar_exercise.next_button')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

// ==========================================
// Fill-in-the-blank Sub-component
// ==========================================
interface FillBlankViewProps {
	question: import('../types').FillBlankQuestion;
	selectedAnswer: string | null;
	isAnswered: boolean;
	isCorrect: boolean;
	onSelect: (option: string) => void;
}

function FillBlankView({ question, selectedAnswer, isAnswered, isCorrect, onSelect }: FillBlankViewProps) {
	const { t } = useTranslation();

	return (
		<View>
			{/* Label */}
			<View className="bg-purple-100 px-3 py-1 rounded-full self-start mb-4">
				<Text className="text-purple-700 font-medium text-sm">
					{t('renshuo.grammar_exercise.fill_blank_label')}
				</Text>
			</View>

			{/* Question sentence */}
			<View className="bg-gray-50 p-5 rounded-2xl mb-4">
				<Text className="text-2xl text-gray-800 text-center leading-10">
					{question.questionText}
				</Text>
				{question.hintVi && (
					<Text className="text-gray-500 text-center mt-2 text-base italic">
						{question.hintVi}
					</Text>
				)}
			</View>

			{/* Options (2x2 grid) */}
			<View className="flex-row flex-wrap justify-between">
				{question.options.map((option, index) => {
					const isSelected = selectedAnswer === option;
					const isCorrectOption = option === question.correctAnswer;

					let buttonClass = "w-[48%] py-4 rounded-xl mb-4 border-2 justify-center items-center ";
					let textClass = "font-bold text-xl ";

					if (isAnswered) {
						if (isSelected && isCorrectOption) {
							buttonClass += "bg-green-100 border-green-500";
							textClass += "text-green-700";
						} else if (isSelected && !isCorrectOption) {
							buttonClass += "bg-red-100 border-red-500";
							textClass += "text-red-700";
						} else if (isCorrectOption) {
							buttonClass += "bg-green-50 border-green-400";
							textClass += "text-green-600";
						} else {
							buttonClass += "bg-gray-50 border-gray-200";
							textClass += "text-gray-400";
						}
					} else {
						buttonClass += "bg-white border-gray-300";
						textClass += "text-gray-700";
					}

					return (
						<TouchableOpacity
							key={index}
							disabled={isAnswered}
							activeOpacity={0.7}
							onPress={() => onSelect(option)}
							className={buttonClass}
						>
							<Text className={textClass}>{option}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

// ==========================================
// Sentence Order Sub-component
// ==========================================
interface SentenceOrderViewProps {
	question: import('../types').SentenceOrderQuestion;
	selectedWords: string[];
	isAnswered: boolean;
	isCorrect: boolean;
	onSelectWord: (word: string, index: number) => void;
	onRemoveWord: (index: number) => void;
	onCheck: () => void;
}

function SentenceOrderView({
	question,
	selectedWords,
	isAnswered,
	isCorrect,
	onSelectWord,
	onRemoveWord,
	onCheck,
}: SentenceOrderViewProps) {
	const { t } = useTranslation();

	// Track which word bank items have been used
	const usedIndices = new Set<number>();
	const remainingWords = question.wordBank.map((word, index) => {
		const alreadyUsedCount = selectedWords.filter((w, i) => {
			// Count how many times this word appears in selectedWords up to this point
			return w === word;
		}).length;

		// Count how many times this word appears in wordBank up to this index
		const bankCount = question.wordBank.slice(0, index + 1).filter(w => w === word).length;

		const isUsed = alreadyUsedCount >= bankCount;
		return { word, index, isUsed };
	});

	return (
		<View>
			{/* Label */}
			<View className="bg-orange-100 px-3 py-1 rounded-full self-start mb-4">
				<Text className="text-orange-700 font-medium text-sm">
					{t('renshuo.grammar_exercise.sentence_order_label')}
				</Text>
			</View>

			{/* Instruction (Vietnamese) */}
			<View className="bg-gray-50 p-5 rounded-2xl mb-4">
				<Text className="text-lg text-gray-800 text-center">
					{question.instruction}
				</Text>
			</View>

			{/* Drop zone — selected words */}
			<View className="min-h-[60px] bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-2xl p-3 mb-4 flex-row flex-wrap">
				{selectedWords.length === 0 ? (
					<Text className="text-indigo-300 italic text-center w-full my-2">
						{t('renshuo.grammar_exercise.drop_zone_hint')}
					</Text>
				) : (
					selectedWords.map((word, index) => (
						<TouchableOpacity
							key={index}
							disabled={isAnswered}
							onPress={() => onRemoveWord(index)}
							className="bg-indigo-600 px-4 py-2 rounded-lg m-1"
						>
							<Text className="text-white font-bold text-lg">{word}</Text>
						</TouchableOpacity>
					))
				)}
			</View>

			{/* Word Bank */}
			<View className="flex-row flex-wrap justify-center mb-4">
				{remainingWords.map(({ word, index, isUsed }) => (
					<TouchableOpacity
						key={index}
						disabled={isUsed || isAnswered}
						onPress={() => onSelectWord(word, index)}
						className={`px-4 py-2 rounded-lg m-1 border-2 ${
							isUsed
								? 'bg-gray-100 border-gray-200'
								: 'bg-white border-gray-300'
						}`}
					>
						<Text className={`font-bold text-lg ${isUsed ? 'text-gray-300' : 'text-gray-700'}`}>
							{word}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Check Button (only for sentence_order, before answered) */}
			{!isAnswered && (
				<TouchableOpacity
					className={`py-3 rounded-full items-center justify-center ${
						selectedWords.length === question.correctOrder.length
							? 'bg-orange-500'
							: 'bg-gray-300'
					}`}
					disabled={selectedWords.length !== question.correctOrder.length}
					onPress={onCheck}
				>
					<Text className={`font-bold text-lg ${
						selectedWords.length === question.correctOrder.length
							? 'text-white'
							: 'text-gray-500'
					}`}>
						{t('renshuo.grammar_exercise.check_button')}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}
