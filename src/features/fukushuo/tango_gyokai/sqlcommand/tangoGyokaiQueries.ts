export const getTopicsQuery = `
  SELECT DISTINCT
    cd_tango_purupu AS id,
    nm_tango_purupu AS name
  FROM vw_tango_gyokai
  WHERE cd_tango_purupu IS NOT NULL
  ORDER BY cd_tango_purupu ASC
`;

export const getVocabulariesByTopicQuery = `
  SELECT
    id,
    nm_tango_sub_purupu AS [group],
    hanviet,
    meaning,
    kanji,
    hiragana,
    romaji
  FROM vw_tango_gyokai
  WHERE cd_tango_purupu = ?
  ORDER BY stt ASC
`;
