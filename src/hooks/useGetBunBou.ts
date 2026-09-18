import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { BunbouRecord } from '@/model/BunBou/Bunbou';
import { DB_SEL_BUNBOU } from '@/db/dbQuery';

export const useGetBunBou = (lvl: string) => {
	const db = useSQLiteContext();
	const [bunbouData, setBonBouData] = useState<BunbouRecord[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		setLoading(true);

		const fetchBonBou = async () => {
			try {
				const row = await db.getAllAsync<BunbouRecord>(DB_SEL_BUNBOU, lvl);

				if (row && isMounted) {
					setBonBouData(row);
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

	return { bunbouData, loading, error };
};