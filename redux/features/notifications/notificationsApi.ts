import { apiSlice } from "../api/apiSlice";
import { EndpointBuilder, IdParam } from "../types";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id: string) => ({
        url: `/update-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationsApi;
