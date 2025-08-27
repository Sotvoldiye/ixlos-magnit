import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("Content-Type", "application/json");

      // Faqat auth talab qiladigan endpointlar uchun token qo'shamiz
      const authEndpoints = [
        "createOrder",
        "getMe",
        "getCart",
        "addToCart",
        "removeFromCart",
        "updateOrder",
        "deleteOrder",
      ];
      if (authEndpoints.includes(endpoint)) {
        const token = Cookies.get("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),
  fetchFn: async (input, init) => {
    return fetch(input, { ...init, credentials: "include" });
  },
  tagTypes: ["Orders", "Products", "Ads", "Cart"],

  endpoints: (builder) => ({
    // Barcha mahsulotlarni olish
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    // ID bo'yicha mahsulot olish
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // Barcha kategoriyalarni olish
    getAllCategories: builder.query({
      query: () => "/categories",
    }),

    // Barcha subkategoriyalarni olish
    getAllSubcategories: builder.query({
      query: () => "/subcategories",
    }),

    // Barcha sub-subkategoriyalarni olish
    getAllSubSubcategories: builder.query({
      query: () => "/subsubcategories",
    }),

    // Barcha reklamalarni olish
    getAllAdvertisements: builder.query({
      query: () => "/advertisements",
      providesTags: ["Ads"],
    }),

    // Cart ga qo'shish
    addToCart: builder.mutation({
      query: ({ id, quantity = 1 }) => ({
        url: "/carts/add",
        method: "POST",
        body: {
          userId: 1,
          products: [{ id, quantity }],
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Cart dan o'chirish
    removeFromCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Foydalanuvchi cartini olish
    getCart: builder.query({
      query: () => "/carts/user/1",
      providesTags: ["Cart"],
    }),

    // Foydalanuvchini ro'yxatdan o'tkazish
    registerUser: builder.mutation({
      query: ({ username, email, password, phone }) => ({
        url: "/register",
        method: "POST",
        body: { username, email, password, phone },
      }),
    }),

    // Foydalanuvchi login qilish
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Foydalanuvchi ma'lumotlarini olish
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    // Orders CRUD
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders", "Cart"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

// Hooklarni eksport qilamiz
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllSubcategoriesQuery,
  useGetAllSubSubcategoriesQuery,
  useGetAllAdvertisementsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
  useRegisterUserMutation,
  useLoginMutation, // 👈 login hook qo'shildi
  useGetMeQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = productApi;
