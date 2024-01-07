"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  user: authSlice,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
