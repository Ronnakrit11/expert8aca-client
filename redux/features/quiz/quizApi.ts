import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation({
            query: (body) => ({
                url: "/admin/quiz",
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),
        updateQuiz: builder.mutation({
            query: ({ quizId, body }) => ({
                url: `/admin/quiz/${quizId}`,
                method: "PUT",
                body,
                credentials: "include" as const,
            }),
        }),
        deleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `/admin/quiz/${quizId}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        getAllQuiz: builder.query({
            query: () => ({
                url: "/admin/quiz",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getQuizById: builder.query({
            query: (quiz_id) => ({
                url: `/admin/quiz/${quiz_id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        startQuiz: builder.mutation({
            query: ({ quizId, body }) => ({
                url: `/quiz/${quizId}/start`,
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),
        submitQuiz: builder.mutation({
            query: ({ quizId, body }) => ({
                url: `/quiz/${quizId}/submit`,
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),
        getQuizStatus: builder.mutation({
            query: ({ quizId, body }) => ({
                url: `/quiz/${quizId}/status`,
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),
        getQuizInfo: builder.query({
            query: ({ quiz_id, course_id }) => ({
                url: `/quiz/${course_id}/${quiz_id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
    }),
});

export const {
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
    useGetAllQuizQuery,
    useGetQuizByIdQuery,
    useStartQuizMutation,
    useSubmitQuizMutation,
    useGetQuizStatusMutation,
    useGetQuizInfoQuery,
} = quizApi;
