import { configureStore } from '@reduxjs/toolkit';
import {
  counterReducer,
  cartReducer,
  userReducer,
  favoruteReducer,
  bagReducer,
} from './slice/Slice';
import { productApi } from './api/productApi';

// Bu qism serverda ish bermaydi, faqat browserda
const FavoritesLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const serialized = localStorage.getItem("favorite");
      return serialized ? JSON.parse(serialized) : [];
    } catch (e) {
      return [];
    }
  }
  return [];
};

const BagsLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const serialized = localStorage.getItem("bags");
      return serialized ? JSON.parse(serialized) : [];
    } catch (e) {
      return [];
    }
  }
  return [];
};

const preloadedState = typeof window !== 'undefined' ? {
  favorute: { items: FavoritesLocalStorage() },
  bags: { items: BagsLocalStorage() },
} : {};

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
    favorute: favoruteReducer,
    bags:bagReducer,
  }, 
  preloadedState, // ← bu joy muhim
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(productApi.middleware),
});

export default store;