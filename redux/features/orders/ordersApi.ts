import { apiSlice } from "../api/apiSlice";
import { EndpointBuilder, TypeParam, CourseIdParam, EbookIdParam, AmountParam, BodyParam, CourseIdPaymentParam, EbookIdPaymentParam } from "../types";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder) => ({
    getAllOrders: builder.query({
      query: (type: string) => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishablekey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getTokenPayment: builder.mutation({
      query: (courseId: string) => ({
        url: `/payment/token`,
        method: "POST",
        body: {
          courseId
        },
        credentials: "include" as const,
      }),
    }),

    getTokenPaymentEbook: builder.mutation({
      query: (ebookId: string) => ({
        url: `/payment/token`,
        method: "POST",
        body: {
          ebookId
        },
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount: number) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    verifySlip: builder.mutation({
      query: (body: any) => ({
        url: "/verify-slip",
        method: "POST",
        body,
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }: CourseIdPaymentParam) => ({
        url: "create-order",
        body: {
          courseId,
          payment_info,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    createOrderEbook: builder.mutation({
      query: ({ ebookId, payment_info, isFree }: EbookIdPaymentParam) => ({
        url: "create-order-ebook",
        body: {
          isFree,
          ebookId,
          payment_info,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { 
  useGetAllOrdersQuery,
  useGetTokenPaymentMutation,
  useGetTokenPaymentEbookMutation,
  useGetStripePublishablekeyQuery, 
  useCreatePaymentIntentMutation ,
  useVerifySlipMutation,
  useCreateOrderMutation, 
  useCreateOrderEbookMutation
} = ordersApi;
