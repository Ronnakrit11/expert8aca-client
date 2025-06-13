import { apiSlice } from "../api/apiSlice";
import { EndpointBuilder, IdParam, IdNameParam, FileParam, BodyParam } from "../types";

export const fileApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    getAllFileAndFolder: builder.query({
      query: () => ({
        url: "file/get-folders-files",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addFolder: builder.mutation({
      query: (body) => ({
        url: "file/create-folder",
        body,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    getFolder: builder.mutation({
      query: (id) => ({
        url: `file/get-folder/${id}`,
        body: {},
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `file/delete-folder/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addFile: builder.mutation({
      query: (file) => ({
        url: "file/create-file",
        body: file,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    delFile: builder.mutation({
      query: (id) => ({
        url: `file/delete-file/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editFolder: builder.mutation({
      query: ({ id, name }) => ({
        url: `file/edit-folder/${id}`,
        body: {
          name
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    editFile: builder.mutation({
      query: ({ id, name }) => ({
        url: `file/edit-file/${id}`,
        body: {
          name
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    updatePlayBackId: builder.mutation({
      query: (body) => ({
        url: "file/update-playback",
        body,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  })
});

export const {
  useGetAllFileAndFolderQuery,
  useAddFolderMutation,
  useDeleteFolderMutation,
  useAddFileMutation,
  useGetFolderMutation,
  useDelFileMutation,
  useEditFolderMutation,
  useEditFileMutation,
  useUpdatePlayBackIdMutation,

} = fileApi;
