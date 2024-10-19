export interface QuizDetailResponse {
    _id: string;
    name: string;
    description: string;
    pass_percentage: number;
    max_submission_pre_test: number;
    max_submission_post_test: number;
    time_limit_minutes: number;
    quizItem: QuizItem[];
    createdAt: string;
    updatedAt: string;
}

interface QuizItem {
    _id: string;
    question: string;
    description: string;
    answer: string;
    image_link: string;
    choices: Choice[];
}

interface Choice {
    _id: string;
    choice: string;
    description: string;
    type: string;
    image_link: string;
}