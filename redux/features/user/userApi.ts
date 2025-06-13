import { apiSlice } from "../api/apiSlice";
import { EndpointBuilder, AvatarParam, NameParam, BodyParam, UserPasswordParam, UserRoleParam, UserCourseParam } from "../types";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    updateAvatar: builder.mutation({
      query: (avatar: any) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }: NameParam) => ({
        url: "update-user-info",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    addUser: builder.mutation({
      query: (body: any) => ({
        url: "add-user",
        method: "POST",
        body,
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }: UserPasswordParam) => ({
        url: `${window.location.origin}/update-user-password`,
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }: UserRoleParam) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addCourseToUser: builder.mutation({
      query: ({ user_id, course_id, expireDate }) => ({
        url: "/add-course-user",
        method: "POST",
        body: {
          user_id,
          course_id,
          expireDate,
        },
        credentials: "include" as const,
      }),
    }),
    updateCourseToUser: builder.mutation({
      query: ({ user_id, course_id, expireDate }) => ({
        url: "/update-course-user",
        method: "POST",
        body: {
          user_id,
          course_id,
          expireDate,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useAddCourseToUserMutation,
  useAddUserMutation,
  useUpdateCourseToUserMutation,

} = userApi;
