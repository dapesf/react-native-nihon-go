type KanjiItem = {
	id: string;
	kanji: string;
	onyomi?: string;
	kunyomi?: string;
	sinoVietnamese: string;
	meaning: string;
};

type Stroke = {
	id: number;
	path: string;
	color: string;
	numberPosition: {
		x: number;
		y: number;
	};
};

// type KanjiStroke = {
// 	order: number;
// 	path: string;
// };

type KanjiStrokeData = {
	width: string;
	height: string;
	//strokes: KanjiStroke[];
	strokes: string[];
};

interface KanjiStroke {
	id: string;
	d: string;
}

interface StrokeNumber {
	number: number;
	x: number;
	y: number;
}

interface KanjiDetail {
	character: string;
	unicode: string;
	strokes: KanjiStroke[];
	numbers: StrokeNumber[];
}

export type { KanjiItem, Stroke, KanjiStroke, StrokeNumber, KanjiDetail, KanjiStrokeData }