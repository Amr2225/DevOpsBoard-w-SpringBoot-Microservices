import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import encryptionTransform from "../Data Transform/transform";

import authApi from "../apis/authApi";
import taskApi from "../apis/taskApi";
import projectsApi from "../apis/projectsApi";
import userApi from "../apis/userApi";
import commnetsApi from "../apis/commentsApi";

import UserReducer from "./UserReducer";
import taskReducer from "./taskReducer";
import projectsReducer from "./projectsReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptionTransform],
  blacklist: [
    authApi.reducerPath,
    taskApi.reducerPath,
    projectsApi.reducerPath,
    userApi.reducerPath,
    commnetsApi.reducerPath,
    "tasks",
  ],
};

const rootReducer = combineReducers({
  user: UserReducer, // will be persisted
  tasks: taskReducer,
  projects: projectsReducer,
  [authApi.reducerPath]: authApi.reducer, // Auth API slice
  [taskApi.reducerPath]: taskApi.reducer, // Task API slice
  [projectsApi.reducerPath]: projectsApi.reducer, // Projects API slice
  [userApi.reducerPath]: userApi.reducer, // Users API slice
  [commnetsApi.reducerPath]: commnetsApi.reducer, // Comments API slice
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
