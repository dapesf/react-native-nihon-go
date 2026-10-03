export const DB_SEL_DONZU_LESSONS = `
SELECT 
    id, 
    lesson_number, 
    title, 
    summary_introduction 
FROM vw_donzu_n5_lesson 
ORDER BY lesson_number ASC
`;

export const DB_SEL_DONZU_LESSON_DETAIL = `
SELECT 
    lesson_number, 
    lesson_title, 
    lesson_introduction, 
    point_number, 
    pattern, 
    grammar_meaning, 
    sub_number, 
    sub_point_explanation, 
    content_type, 
    speaker, 
    japanese_text, 
    vietnamese_text, 
    display_order 
FROM vw_donzu_n5_lesson_data 
WHERE lesson_number = ? 
ORDER BY point_number, sub_number, display_order
`;
