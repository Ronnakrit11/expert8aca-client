import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
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
      query: (courseId) => ({
        url: `/payment/token`,
        method: "POST",
        body: {
          courseId
        },
        credentials: "include" as const,
      }),
    }),

    getTokenPaymentEbook: builder.mutation({
      query: (ebookId) => ({
        url: `/payment/token`,
        method: "POST",
        body: {
          ebookId
        },
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    verifySlip: builder.mutation({
      query: (body) => ({
        url: "/verify-slip",
        method: "POST",
        body,
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
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
      query: ({ ebookId, payment_info, isFree }) => ({
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
