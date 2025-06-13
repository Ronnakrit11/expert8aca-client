import { apiSlice } from "../api/apiSlice";
import { EndpointBuilder, TypeParam, LayoutParam } from "../types";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    getHeroData: builder.query({
      query: (type: string) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories, imageList }: LayoutParam) => ({
        url: `edit-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
          imageList,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery,useEditLayoutMutation } = layoutApi;
