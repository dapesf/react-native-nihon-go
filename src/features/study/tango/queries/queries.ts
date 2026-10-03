export const DB_SEL_MONDAI_TANGO = `SELECT mondai AS key, mondai AS value FROM ma_tango GROUP BY mondai ORDER BY int_mondai`;
export const DB_SEL_TANGO = `SELECT id, mondai, stt, meaning, hanviet, kanji, hiragana, lvl, int_mondai
FROM ma_tango 
WHERE
	mondai = ?
`;