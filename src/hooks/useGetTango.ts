import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { TangoRecord } from '@/model/Tango/Tango';
import { DB_SEL_TANGO } from '@/db/dbQuery';

export const useGetTango = () => {
	const db = useSQLiteContext();
	const [tangoData, setTangoData] = useState<TangoRecord[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		setLoading(true);

		const fetchBonBou = async () => {
			try {
				const row = await db.getAllAsync<TangoRecord>(DB_SEL_TANGO);

				if (row && isMounted) {
					setTangoData(row);
				} else if (isMounted) {
					setError('Không tìm thấy dữ liệu BunBou Data');
				}
			} catch (err) {
				if (isMounted) setError('Lỗi đọc dữ liệu SQLite');
				console.error(err);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchBonBou();

		return () => {
			isMounted = false;
		};
	}, [db]);

	return { tangoData, loading, error };
};