import { configureStore } from '@reduxjs/toolkit';
import {
  counterReducer,
  cartReducer,
  userReducer,
  favoruteReducer,
} from './slice/Slice';
import { productApi } from './api/productApi';

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
    favorute: favoruteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
