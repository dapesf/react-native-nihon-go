import { useState, useEffect, useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { DB_SEL_GRAMMAR_EXERCISES } from '../queries/queries';
import { DB_INS_EXERCISE_PROGRESS } from '../queries/queries';
import {
	GrammarExerciseRecord,
	GrammarQuestion,
	FillBlankQuestion,
	SentenceOrderQuestion,
} from '../types';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

const parseJsonArray = (jsonStr: string | null): string[] => {
	if (!jsonStr) return [];
	try {
		return JSON.parse(jsonStr);
	} catch {
		return [];
	}
};

const transformToQuestion = (record: GrammarExerciseRecord): GrammarQuestion | null => {
	if (record.exercise_type === 'fill_blank') {
		if (!record.correct_answer) return null;

		const wrongOptions = parseJsonArray(record.wrong_options);
		const allOptions = shuffleArray([record.correct_answer, ...wrongOptions]);

		const question: FillBlankQuestion = {
			id: record.id,
			questionText: record.question_text,
			fullSentence: record.full_sentence,
			hintVi: record.hint_vi,
			correctAnswer: record.correct_answer,
			options: allOptions,
			explanation: record.explanation,
		};
		return { type: 'fill_blank', data: question };
	}

	if (record.exercise_type === 'sentence_order') {
		const wordBank = parseJsonArray(record.word_bank);
		const correctOrder = parseJsonArray(record.correct_order);
		if (wordBank.length === 0 || correctOrder.length === 0) return null;

		const question: SentenceOrderQuestion = {
			id: record.id,
			instruction: record.question_text,
			fullSentence: record.full_sentence,
			wordBank: shuffleArray(wordBank),
			correctOrder,
			explanation: record.explanation,
		};
		return { type: 'sentence_order', data: question };
	}

	return null;
};

export const useGrammarExercise = (lessonNumber: number, maxQuestions: number = 10) => {
	const db = useSQLiteContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [selectedWords, setSelectedWords] = useState<string[]>([]);
	const [isAnswered, setIsAnswered] = useState<boolean>(false);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);

	const fetchAndGenerateQuiz = useCallback(async () => {
		let isMounted = true;
		setLoading(true);
		setError(null);

		try {
			const rows = await db.getAllAsync<GrammarExerciseRecord>(
				DB_SEL_GRAMMAR_EXERCISES,
				[lessonNumber]
			);

			if (!isMounted) return;

			if (!rows || rows.length === 0) {
				setError('common.error_reading_sqlite');
				setLoading(false);
				return;
			}

			// Transform raw records to quiz questions
			const transformed = rows
				.map(transformToQuestion)
				.filter((q): q is GrammarQuestion => q !== null)
				.slice(0, maxQuestions);

			setQuestions(transformed);
			setCurrentIndex(0);
			setSelectedAnswer(null);
			setSelectedWords([]);
			setIsAnswered(false);
			setIsCorrect(false);
			setIsFinished(false);
			setScore(0);
		} catch (err) {
			if (isMounted) setError('common.error_reading_sqlite');
			console.error(err);
		} finally {
			if (isMounted) setLoading(false);
		}
	}, [db, lessonNumber, maxQuestions]);

	useEffect(() => {
		fetchAndGenerateQuiz();
	}, [fetchAndGenerateQuiz]);

	// === Fill-in-the-blank handlers ===
	const handleSelectFillBlank = (option: string) => {
		if (isAnswered || questions.length === 0) return;

		const current = questions[currentIndex];
		if (current.type !== 'fill_blank') return;

		setSelectedAnswer(option);
		const correct = option === current.data.correctAnswer;
		setIsCorrect(correct);
		setIsAnswered(true);

		if (correct) {
			setScore(prev => prev + 1);
		}

		// Save progress
		db.runAsync(DB_INS_EXERCISE_PROGRESS, [current.data.id, correct ? 1 : 0]).catch(console.error);
	};

	// === Sentence Order handlers ===
	const handleSelectWord = (word: string, wordIndex: number) => {
		if (isAnswered) return;
		setSelectedWords(prev => [...prev, word]);
	};

	const handleRemoveWord = (index: number) => {
		if (isAnswered) return;
		setSelectedWords(prev => prev.filter((_, i) => i !== index));
	};

	const handleCheckSentenceOrder = () => {
		if (isAnswered || questions.length === 0) return;

		const current = questions[currentIndex];
		if (current.type !== 'sentence_order') return;

		const correct = JSON.stringify(selectedWords) === JSON.stringify(current.data.correctOrder);
		setIsCorrect(correct);
		setIsAnswered(true);

		if (correct) {
			setScore(prev => prev + 1);
		}

		// Save progress
		db.runAsync(DB_INS_EXERCISE_PROGRESS, [current.data.id, correct ? 1 : 0]).catch(console.error);
	};

	// === Navigation ===
	const handleNextQuestion = () => {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex(prev => prev + 1);
			setSelectedAnswer(null);
			setSelectedWords([]);
			setIsAnswered(false);
			setIsCorrect(false);
		} else {
			setIsFinished(true);
		}
	};

	const resetQuiz = () => {
		fetchAndGenerateQuiz();
	};

	return {
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
	};
};
