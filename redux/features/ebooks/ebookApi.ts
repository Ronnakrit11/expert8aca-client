import { apiSlice } from "../api/apiSlice";
import { EndpointBuilder, IdParam, IdDataParam } from "../types";

export const ebookApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    createEbook: builder.mutation({
      query: (data) => ({
        url: "create-ebook",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    // getAllCourses: builder.query({
    //   query: () => ({
    //     url: "get-admin-courses",
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),
    deleteEbook: builder.mutation({
      query: (id: string) => ({
        url: `delete-ebook/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editEbook: builder.mutation({
      query: ({ id, data }: IdDataParam) => ({
        url: `edit-ebook/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addEbookUser: builder.mutation({
      query: (data) => ({
        url: `add-ebook-user`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllEbook: builder.query({
      query: () => ({
        url: "get-ebooks",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEbookDetail: builder.query({
      query: (id: any) => ({
        url: `get-ebook/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEbookDetailAdmin: builder.query({
      query: (id: any) => ({
        url: `get-admin-ebook/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // getCourseContent: builder.query({
    //   query: (id) => ({
    //     url: `get-course-content/${id}`,
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addNewQuestion: builder.mutation({
    //   query: ({ question, courseId, contentId }) => ({
    //     url: "add-question",
    //     body: {
    //       question,
    //       courseId,
    //       contentId,
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addAnswerInQuestion: builder.mutation({
    //   query: ({ answer, courseId, contentId, questionId }) => ({
    //     url: "add-answer",
    //     body: {
    //       answer,
    //       courseId,
    //       contentId,
    //       questionId,
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addReviewInCourse: builder.mutation({
    //   query: ({ review, rating, courseId }: any) => ({
    //     url: `add-review/${courseId}`,
    //     body: {
    //       review,
    //       rating,
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
    // addReplyInReview: builder.mutation({
    //   query: ({ comment, courseId, reviewId }: any) => ({
    //     url: `add-reply`,
    //     body: {
    //       comment, courseId, reviewId
    //     },
    //     method: "PUT",
    //     credentials: "include" as const,
    //   }),
    // }),
  }),
});

export const {
  useGetAllEbookQuery,
  useGetEbookDetailQuery,
  useGetEbookDetailAdminQuery,
  useCreateEbookMutation,
  useDeleteEbookMutation,
  useEditEbookMutation,
  useAddEbookUserMutation,
} = ebookApi;
