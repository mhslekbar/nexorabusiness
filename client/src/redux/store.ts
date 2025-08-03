import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer       from "./login/loginSlice";
import roleReducer       from "./roles/roleReducer";
import permissionReducer from "./permissions/permissionSlice";
import userReducer from "./users/userSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { companyName } from "../requestMethods";

const persistConfig = {
  key: companyName,
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 
  login: loginReducer,
  roles: roleReducer,
  permissions: permissionReducer,
  users: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type State = ReturnType<typeof rootReducer>
