export interface DonZuLessonRecord {
    id: number;
    lesson_number: number;
    title: string;
    summary_introduction: string;
}

export interface DonZuLessonDetailRecord {
    lesson_number: number;
    lesson_title: string;
    lesson_introduction: string | null;
    point_number: string;
    pattern: string;
    grammar_meaning: string;
    sub_number: string;
    sub_point_explanation: string | null;
    content_type: 'sentence' | 'dialogue';
    speaker: string | null;
    japanese_text: string;
    vietnamese_text: string | null;
    display_order: number;
}
