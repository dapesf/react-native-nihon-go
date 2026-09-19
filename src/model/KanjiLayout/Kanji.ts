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

type KanjiStrokeData = {
	width: string;
	height: string;
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

interface KanjiViewerProps {
	data: KanjiDetail;
	size?: number;
	strokeColors?: string[];
	showNumbers?: boolean;
	activeStrokeIndex?: number | null; // Nét đang được chọn/hoạt họa (-1 hoặc null nếu xem tất cả)
	drawAgainSeq: number;
}

interface KanjiDetail {
	character: string;
	unicode: string;
	kanji: string;
	han_viet: string;
	meaning: string;
	readings_on: string;
	readings_kun: string;
	strokes_num: number;
	jlpt_lvl: number | null;
	strokes: KanjiStroke[];
	strokes_raw: string;
	numbers: StrokeNumber[];
	numbers_raw: string;
	component: string[];
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

export type
{
	KanjiItem
	, Stroke
	, KanjiStroke
	, StrokeNumber
	, KanjiDetail
	, KanjiStrokeData
	, KanjiInfo
	, KanjiViewerProps
}