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
	readings_on: string;
	readings_kun: string;
	strokes: KanjiStroke[];
	numbers: StrokeNumber[];
}

interface KanjiInfo {
	id: number;
	page: number;
	unicode: string;
	kanji: string;
	han_viet: string;
	meaning: string;
	strokes_num: number | null;
	jlpt_lvl: number | null;
	readings_on: string | null;
	readings_kun: string | null;
	component: string | null;
	strokes: string | null;
	numbers: string | null;
}

export type { KanjiItem, Stroke, KanjiStroke, StrokeNumber, KanjiDetail, KanjiStrokeData, KanjiInfo }