import { configureStore } from '@reduxjs/toolkit';
import {
  counterReducer,
  cartReducer,
  userReducer,
  favoruteReducer,
} from './slice/Slice';
import { productApi } from './api/productApi';

// LocalStorage dan favoritlar olish funksiyasi
const loadFavoritesFromLocalStorage = () => {
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

const preloadedState = {
  favorute: {
    items: loadFavoritesFromLocalStorage()
  }
};

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
    favorute: favoruteReducer,
  },
  preloadedState, // ← bu joy muhim
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
