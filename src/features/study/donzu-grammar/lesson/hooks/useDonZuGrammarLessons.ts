import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { DonZuLessonRecord } from '../types';
import { DB_SEL_DONZU_LESSONS } from '../queries/queries';

export const useDonZuGrammarLessons = () => {
	const db = useSQLiteContext();
	const [lessons, setLessons] = useState<DonZuLessonRecord[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		setLoading(true);

		const fetchLessons = async () => {
			try {
				const rows = await db.getAllAsync<DonZuLessonRecord>(DB_SEL_DONZU_LESSONS);

				if (rows && isMounted) {
					setLessons(rows);
				} else if (isMounted) {
					setError('common.error_reading_sqlite');
				}
			} catch (err) {
				if (isMounted) setError('common.error_reading_sqlite');
				console.error(err);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchLessons();

		return () => {
			isMounted = false;
		};
	}, [db]);

	return { lessons, loading, error };
};
