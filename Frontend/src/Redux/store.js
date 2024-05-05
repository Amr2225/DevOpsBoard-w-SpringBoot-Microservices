import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./reducers/persistedReducer";

import authApi from "./apis/authApi";
import taskApi from "./apis/taskApi";
import projectsApi from "./apis/projectsApi";
import userApi from "./apis/userApi";
import commnetsApi from "./apis/commentsApi";

import { tokenExpirationMiddleware } from "./middleware/tokenExpirationMiddleware";

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authApi.middleware)
      .concat(taskApi.middleware)
      .concat(projectsApi.middleware)
      .concat(userApi.middleware)
      .concat(commnetsApi.middleware) // Configure middleware for caching
      .concat(tokenExpirationMiddleware),
});

export const persistor = persistStore(store);
