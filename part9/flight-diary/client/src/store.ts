import { configureStore } from '@reduxjs/toolkit';
import entrySlice from './entrySlice';

export const store = configureStore({
  reducer: {
    entries: entrySlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
