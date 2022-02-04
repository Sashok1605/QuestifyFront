import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './auth/reducer'
import { todosReducer } from "./todos/reducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const rootReducer = combineReducers({
    todos: todosReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  // auth:  authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
