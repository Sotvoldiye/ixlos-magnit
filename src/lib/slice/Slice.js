import { createSlice } from "@reduxjs/toolkit";

// COUNTER SLICE
const counterInitialState = {
  products: {}, // { [productId]: { count: number, stock: number } }
};

const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: {
    increment: (state, action) => {
      const id = action.payload;
      const item = state.products[id];
      if (item && item.count < item.stock) {
        item.count += 1;
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.products[id];
      if (item && item.count > 0) {
        item.count -= 1;
      }
    },
    setStock: (state, action) => {
      const { id, stock } = action.payload;
      if (!state.products[id]) {
        state.products[id] = { count: 1, stock };
      } else {
        state.products[id].stock = stock;
        if (state.products[id].count > stock) {
          state.products[id].count = stock;
        }
      }
    },
    resetCounter: (state, action) => {
      const id = action.payload;
      if (state.products[id]) {
        state.products[id].count = 0;
      }
    },
  },
});

// CART SLICE
const cartInitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

// FAVORITE SLICE
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
  },
  reducers: {
    setFavoriteItems: (state, action) => {
      state.items = action.payload;
    },
    addFavorite: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

// BAG SLICE
const bagSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
  },
  reducers: {
    setBags: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("bags", JSON.stringify(state.items));
    },
    addBags: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("bags", JSON.stringify(state.items));
      }
    },
    removerBags: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("bags", JSON.stringify(state.items));
    },
  },
});

// USER SLICE
const initialUser = typeof window !== "undefined"
  ? JSON.parse(sessionStorage.getItem("user")) || null
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
});

// EXPORT ACTIONS
export const { increment, decrement, setStock, resetCounter } = counterSlice.actions;
export const { addToCart, removeFromCart } = cartSlice.actions;
export const { login, logout } = userSlice.actions;
export const { setFavoriteItems, addFavorite, removeFavorite } = favoriteSlice.actions;
export const { setBags, addBags, removerBags } = bagSlice.actions;

// EXPORT REDUCERS
export const counterReducer = counterSlice.reducer;
export const cartReducer = cartSlice.reducer;
export const userReducer = userSlice.reducer;
export const favoriteReducer = favoriteSlice.reducer;
export const bagReducer = bagSlice.reducer;