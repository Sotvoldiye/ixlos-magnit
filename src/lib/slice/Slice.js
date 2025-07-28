import { createSlice } from "@reduxjs/toolkit";

/* COUNTER SLICE */
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

/* CART SLICE */
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

/* FAVORUTE SLICE */
const favoruteSlice = createSlice({
  name: "favorute",
  initialState: {
    items: [],
  },
  reducers: {
    setFavoruteItems: (state, action) => {
      state.items = action.payload;
    },
    addFavorute: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorute: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

/* badge slice */
const bagSlice = createSlice({
  name: "bags",
  initialState: {
    items: [],
  },
  reducers: {
    setBags: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("bags", JSON.stringify(state.items)); // ✅ darhol saqlansin
    },
    addBags: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("bags", JSON.stringify(state.items)); // ✅
      }
    },
    removerBags: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("bags", JSON.stringify(state.items)); // ✅
    },
  },
});

/* USER SLICE */

const userInitialState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setAuthReady: (state) => {
      state.authReady = true;
    },
  },
});

/* EXPORT ACTIONS */
export const { increment, decrement, setStock, resetCounter } =
  counterSlice.actions;

export const { addToCart, removeFromCart } = cartSlice.actions;
export const { login, logout, isAuthReady } = userSlice.actions;
export const { setFavoruteItems, addFavorute, removeFavorute } =
  favoruteSlice.actions;
export const { setBags, addBags, removerBags } = bagSlice.actions;
/* EXPORT REDUCERS */
export const counterReducer = counterSlice.reducer;
export const cartReducer = cartSlice.reducer;
export const userReducer = userSlice.reducer;
export const favoruteReducer = favoruteSlice.reducer;
export const bagReducer = bagSlice.reducer;
