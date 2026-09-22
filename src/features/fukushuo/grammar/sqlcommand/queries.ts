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