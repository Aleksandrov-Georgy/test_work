import { configureStore } from '@reduxjs/toolkit';
import { fetchData } from './querySlice';
import dataPost from './dataSlice';

export const store = configureStore({
  reducer: {
    [fetchData.reducerPath]: fetchData.reducer,
    dataPost,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchData.middleware),
});
