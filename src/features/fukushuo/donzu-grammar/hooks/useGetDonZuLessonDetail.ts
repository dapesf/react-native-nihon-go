import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { DonZuLessonDetailRecord } from '../type';
import { DB_SEL_DONZU_LESSON_DETAIL } from '../sqlcommand/queries';

export const useGetDonZuLessonDetail = (lessonNumber: number) => {
	const db = useSQLiteContext();
	const [data, setData] = useState<DonZuLessonDetailRecord[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);

		const fetchDetail = async () => {
			try {
				const rows = await db.getAllAsync<DonZuLessonDetailRecord>(
                    DB_SEL_DONZU_LESSON_DETAIL,
					[lessonNumber]
                );

				if (rows && isMounted) {
					setData(rows);
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

		fetchDetail();

		return () => {
			isMounted = false;
		};
	}, [db, lessonNumber]);

	return { data, loading, error };
};
