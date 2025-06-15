import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    getProductById: builder.query({
      query: (id) => `product/${id}`,
    }),

    addToCart: builder.mutation({
      query: ({ id, quantity = 1 }) => ({
        url: "/carts/add",
        method: "POST",
        body: {
          userId: 1, // dummyjson uchun required
          products: [{ id, quantity }],
        },
      }),
    }),

    removeFromCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE", // dummyjson buni to‘liq qo‘llamaydi
      }),
    }),

    getCart: builder.query({
      query: () => "/carts/user/1",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
} = productApi;
