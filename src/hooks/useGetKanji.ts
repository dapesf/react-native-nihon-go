import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { KanjiDetail, KanjiStroke, StrokeNumber } from '@/model/KanjiLayout/Kanji'

interface RawKanjiRow {
	character: string;
	strokes: string;
	numbers: string;
	readings_on: string;
	readings_kun: string;
}

export const useGetKanji = (char: string) => {
	const db = useSQLiteContext();
	const [kanjiData, setKanjiData] = useState<KanjiDetail | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchKanji = async () => {
			if (!char) return;
			try {
				setLoading(true);

				// Query trực tiếp từ SQLite offline
				const row = await db.getFirstAsync<RawKanjiRow>(
					`SELECT 
						id
						, page
						, unicode
						, kanji
						, han_viet
						, meaning
						, strokes_num
						, jlpt_lvl
						, readings_on
						, readings_kun	
						, component
						, strokes 
						, numbers 
					FROM vw_kanji WHERE kanji = ?`,
					[char]
				);

				if (row && isMounted) {
					const parsedStrokes: KanjiStroke[] = JSON.parse(row.strokes);
					const parsedNumbers: StrokeNumber[] = JSON.parse(row.numbers);

					setKanjiData({
						character: row.character,
						unicode: char.charCodeAt(0).toString(16).padStart(5, '0'),
						strokes: parsedStrokes,
						numbers: parsedNumbers,
						readings_on: row.readings_on,
						readings_kun: row.readings_kun,
					});
					setError(null);
				} else if (isMounted) {
					setError('Không tìm thấy dữ liệu Kanji');
				}
			} catch (err) {
				if (isMounted) setError('Lỗi đọc dữ liệu SQLite');
				console.error(err);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchKanji();

		return () => {
			isMounted = false;
		};
	}, [char, db]);

	return { kanjiData, loading, error };
};