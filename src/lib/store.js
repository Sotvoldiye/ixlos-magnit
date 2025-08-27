import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import {
  counterReducer,
  cartReducer,
  userReducer,
  favoruteReducer,
  bagReducer,
} from "./slice/Slice";
import { productApi } from "./api/productApi";

// Root reducer
const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  counter: counterReducer,
  cart: cartReducer,
  user: userReducer,
  favorute: favoruteReducer,
  bags: bagReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  blacklist: [productApi.reducerPath], // API cacheni persist qilish shart emas
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({      serializableCheck: false, // persist uchun zarur
}).concat(productApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
