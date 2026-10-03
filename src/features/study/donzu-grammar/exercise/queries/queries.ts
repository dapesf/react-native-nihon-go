export const DB_SEL_GRAMMAR_EXERCISES = `
SELECT 
    id,
    lesson_number,
    point_number,
    exercise_type,
    question_text,
    full_sentence,
    hint_vi,
    correct_answer,
    wrong_options,
    word_bank,
    correct_order,
    explanation,
    difficulty,
    is_active
FROM donzu_grammar_exercises
WHERE lesson_number = ? 
    AND is_active = 1
ORDER BY RANDOM()
`;

export const DB_SEL_GRAMMAR_EXERCISES_BY_TYPE = `
SELECT 
    id,
    lesson_number,
    point_number,
    exercise_type,
    question_text,
    full_sentence,
    hint_vi,
    correct_answer,
    wrong_options,
    word_bank,
    correct_order,
    explanation,
    difficulty,
    is_active
FROM donzu_grammar_exercises
WHERE lesson_number = ? 
    AND exercise_type = ?
    AND is_active = 1
ORDER BY RANDOM()
`;

export const DB_INS_EXERCISE_PROGRESS = `
INSERT INTO donzu_exercise_progress (exercise_id, is_correct)
VALUES (?, ?)
`;
