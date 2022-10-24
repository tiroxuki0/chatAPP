import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
