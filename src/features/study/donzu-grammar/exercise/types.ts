export type ExerciseType = 'fill_blank' | 'sentence_order';

export interface GrammarExerciseRecord {
	id: number;
	lesson_number: number;
	point_number: number | null;
	exercise_type: ExerciseType;
	question_text: string;
	full_sentence: string;
	hint_vi: string | null;
	correct_answer: string | null;
	wrong_options: string | null;    // JSON array string
	word_bank: string | null;        // JSON array string
	correct_order: string | null;    // JSON array string
	explanation: string | null;
	difficulty: number;
	is_active: number;
}

export interface FillBlankQuestion {
	id: number;
	questionText: string;
	fullSentence: string;
	hintVi: string | null;
	correctAnswer: string;
	options: string[];               // 4 lựa chọn (1 đúng + 3 sai), đã shuffle
	explanation: string | null;
}

export interface SentenceOrderQuestion {
	id: number;
	instruction: string;             // Câu hướng dẫn (tiếng Việt)
	fullSentence: string;
	wordBank: string[];              // Các từ đã shuffle
	correctOrder: string[];          // Thứ tự đúng
	explanation: string | null;
}

export type GrammarQuestion = 
	| { type: 'fill_blank'; data: FillBlankQuestion }
	| { type: 'sentence_order'; data: SentenceOrderQuestion };
