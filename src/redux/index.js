import { configureStore } from '@reduxjs/toolkit';
import { bitfinexApi } from '../services/bitfinexService';

export const store = configureStore({
  reducer: {
    [bitfinexApi.reducerPath]: bitfinexApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bitfinexApi.middleware),
});