export const DB_SEL_KANJI_LIST_PER_PAGE =
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
FROM vw_kanji
WHERE
	page = ?
`;

export const DB_SEL_BUNBOU =
	`SELECT 
	id
	, lvl
	, structure
	, meaning
	, explanation
	, examples
	, note
FROM ma_nihon_bunbou
--WHERE lvl = '?'
`;