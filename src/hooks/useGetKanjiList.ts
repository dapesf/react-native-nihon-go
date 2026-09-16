import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { KanjiInfo } from '@/model/KanjiLayout/Kanji'
import { DB_SEL_KANJI_LIST_PER_PAGE } from '@/db/dbQuery';


export const useGetKanjiList = (page: number) => {
	const db = useSQLiteContext();
	const [kanjiData, setKanjiData] = useState<KanjiInfo[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		setLoading(true);

		const fetchKanji = async () => {
			try {
				const row = await db.getAllAsync<KanjiInfo>(DB_SEL_KANJI_LIST_PER_PAGE, page);

				if (row && isMounted) {
					setKanjiData(row);
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
	}, [db, page]);

	return { kanjiData, loading, error };
};