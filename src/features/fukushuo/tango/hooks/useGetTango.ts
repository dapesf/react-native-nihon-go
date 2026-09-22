import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { TangoRecord } from '../type';
import { DB_SEL_TANGO, DB_SEL_MONDAI_TANGO } from '../sqlcommand/queries';
import { Option } from '@/shared/type';

export const useGetTango = (index: string) => {
	const db = useSQLiteContext();
	const [mondaiTangoData, setMondaiTangoData] = useState<Option[]>([{ key: "", value: "" }]);
	const [tangoData, setTangoData] = useState<TangoRecord[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		setError(null);

		setLoading(true);

		const fetchData = async () => {
			try {
				const [row, mondais] = await Promise.all([
					db.getAllAsync<TangoRecord>(DB_SEL_TANGO, [index]),
					db.getAllAsync<Option>(DB_SEL_MONDAI_TANGO)
				]);

				if (!isMounted) return;

				if (row.length === 0 && mondais.length === 0) {
					setError('Không tìm thấy dữ liệu Tango Data');
				} else {
					setTangoData(row);
					setMondaiTangoData(
						mondais.map((mondais) => {
							return {
								...mondais,
								value: "Trang: " + mondais.value,
							};
						}));
				}
			} catch (err) {
				if (isMounted) setError('Lỗi đọc dữ liệu SQLite');
				console.error(err);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [db, index]);

	return { tangoData, mondaiTangoData, loading, error };
};