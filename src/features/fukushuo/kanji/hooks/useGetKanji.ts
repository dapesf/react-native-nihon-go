import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { KanjiDetail, KanjiStroke, StrokeNumber } from '../type';

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
				const row = await db.getFirstAsync<KanjiDetail>(
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
						, strokes AS strokes_raw
						, numbers 
						, numbers AS numbers_raw
					FROM vw_kanji WHERE kanji = ?`,
					[char]
				);

				if (row && isMounted) {
					const parsedStrokes: KanjiStroke[] = JSON.parse(row.strokes_raw);
					const parsedNumbers: StrokeNumber[] = JSON.parse(row.numbers_raw);

					setKanjiData({
						character: row.character,
						unicode: char.charCodeAt(0).toString(16).padStart(5, '0'),
						strokes: parsedStrokes,
						strokes_raw: "",
						strokes_num: row.strokes_num,
						numbers: parsedNumbers,
						numbers_raw: "",
						readings_on: row.readings_on,
						readings_kun: row.readings_kun,
						kanji: row.kanji,
						han_viet: row.han_viet,
						meaning: row.meaning,
						jlpt_lvl: row.jlpt_lvl,
						component: row.component,
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