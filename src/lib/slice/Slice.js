import { createSlice } from "@reduxjs/toolkit";

/* COUNTER SLICE */
const counterInitialState = {
  products: {}, // { [productId]: { count: number, stock: number } }
};

const counterSlice = createSlice({
  name: 'counter',
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
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  }
});

/* FAVORUTE SLICE */
const favoruteInitialState = {
  items: []
};

const favoruteSlice = createSlice({
  name: 'favorute',  // To'g'irlandi
  initialState: favoruteInitialState,
  reducers: {
    addFavorute(state, action) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorute(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  }
});

/* USER SLICE */
const userInitialState = {
  user: true,
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
    isAuthReady: (state) => {
      state.authReady = true;
    },
  },
});

/* EXPORT ACTIONS */
export const {
  increment,
  decrement,
  setStock,
  resetCounter,
} = counterSlice.actions;

export const { addToCart, removeFromCart } = cartSlice.actions;
export const { login, logout, isAuthReady } = userSlice.actions;
export const { addFavorute, removeFavorute } = favoruteSlice.actions;

/* EXPORT REDUCERS */
export const counterReducer = counterSlice.reducer;
export const cartReducer = cartSlice.reducer;
export const userReducer = userSlice.reducer;
export const favoruteReducer = favoruteSlice.reducer;
