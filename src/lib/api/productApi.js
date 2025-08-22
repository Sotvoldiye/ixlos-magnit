// src/lib/api/productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    fetchFn: async (input, init) => {
      // Cookie yuborish uchun credentials: "include"
      return fetch(input, { ...init, credentials: "include" });
    },
  }),
  endpoints: (builder) => ({
    // Barcha mahsulotlarni olish
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    // ID bo'yicha mahsulot olish
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // Barcha kategoriyalarni olish
    getAllCategories: builder.query({
      query: () => "/categories",
    }),

    getAllAdvertisements: builder.query({
      query: () => "/advertisements",
    }),

    // Cart ga qo'shish
    addToCart: builder.mutation({
      query: ({ id, quantity = 1 }) => ({
        url: "/carts/add",
        method: "POST",
        body: {
          userId: 1, // dummy user
          products: [{ id, quantity }],
        },
      }),
    }),

    // Cart dan o'chirish
    removeFromCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
    }),

    // Foydalanuvchi cartini olish
    getCart: builder.query({
      query: () => "/carts/user/1",
    }),

    registerUser: builder.mutation({
      query: ({ username, email, password, phone }) => ({
        url: "/register",
        method: "POST",
        body: { username, email, password, phone },
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    getAllOrders: builder.query({
      query: () => "/orders/",
    }),

  }),
});
// Hooklarni eksport qilamiz
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
  useGetAllAdvertisementsQuery,
  useRegisterUserMutation,
} = productApi;
