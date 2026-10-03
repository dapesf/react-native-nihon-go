import { useState, useEffect, useCallback } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { DB_SEL_ALL_KANJI } from '../queries/queries';

export interface KanjiItem {
	id: number;
	page: number;
	unicode: string;
	kanji: string;
	han_viet: string;
	meaning: string;
}

export interface QuizQuestion {
	kanjiItem: KanjiItem;
	options: string[]; // 4 chuỗi Hán Việt (1 đúng, 3 sai ngẫu nhiên)
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

export const useKanjiQuiz = () => {
	const db = useSQLiteContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	
	const [questions, setQuestions] = useState<QuizQuestion[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const [isFinished, setIsFinished] = useState<boolean>(false);

	const fetchAndGenerateQuiz = useCallback(async () => {
		let isMounted = true;
		setLoading(true);
		setError(null);
		
		try {
			const allKanji = await db.getAllAsync<KanjiItem>(DB_SEL_ALL_KANJI);
			
			if (!isMounted) return;
			
			if (allKanji.length === 0) {
				setError('Không tìm thấy dữ liệu Kanji');
				setLoading(false);
				return;
			}
			
			// Lấy ngẫu nhiên tối đa 20 câu
			const shuffledKanji = shuffleArray(allKanji);
			const selectedKanjiList = shuffledKanji.slice(0, Math.min(20, shuffledKanji.length));
			
			// Tạo đáp án cho mỗi câu
			const generatedQuestions: QuizQuestion[] = selectedKanjiList.map(item => {
				const correctHanViet = item.han_viet;
				
				// Lọc ra danh sách Hán Việt không trùng với đáp án đúng
				// Sử dụng Set để đảm bảo unique (nếu ma_kanji có nhiều Hán Việt trùng nhau)
				const otherHanViets = Array.from(new Set(
					allKanji
						.filter(k => k.han_viet && k.han_viet.trim() !== correctHanViet?.trim())
						.map(k => k.han_viet)
				));
				
				const shuffledOthers = shuffleArray(otherHanViets);
				// Lấy 3 đáp án sai (nếu dữ liệu không đủ thì lấy bao nhiêu có bấy nhiêu)
				const wrongOptions = shuffledOthers.slice(0, Math.min(3, shuffledOthers.length));
				
				const options = shuffleArray([correctHanViet, ...wrongOptions]);
				
				return {
					kanjiItem: item,
					options
				};
			});
			
			setQuestions(generatedQuestions);
			setCurrentIndex(0);
			setSelectedOption(null);
			setIsCorrect(false);
			setIsFinished(false);
		} catch (err) {
			if (isMounted) setError('Lỗi đọc dữ liệu SQLite');
			console.error(err);
		} finally {
			if (isMounted) setLoading(false);
		}
	}, [db]);

	useEffect(() => {
		fetchAndGenerateQuiz();
	}, [fetchAndGenerateQuiz]);

	const handleSelectOption = (option: string) => {
		if (questions.length === 0) return;
		
		const currentQuestion = questions[currentIndex];
		setSelectedOption(option);
		
		if (option === currentQuestion.kanjiItem.han_viet) {
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}
	};

	const handleNextQuestion = () => {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex(prev => prev + 1);
			setSelectedOption(null);
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
		selectedOption, 
		isCorrect, 
		isFinished, 
		handleSelectOption, 
		handleNextQuestion,
		resetQuiz
	};
};
