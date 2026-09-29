export interface TopicItem {
  id: string; // cd_tango_purupu
  name: string; // nm_tango_purupu
}

export interface VocabularyItem {
  id: string | number;
  group: string; // nm_tango_sub_purupu
  hanviet: string;
  meaning: string;
  kanji: string;
  hiragana: string;
  romaji: string;
}
