import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { weatherApi } from '../services/weather';
import setInfoReducer from '../slices/setInfoSlice';
import recentSearchesReducer from '../slices/recentSearchesSlice';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    setInfo: setInfoReducer,
    recentSearches: recentSearchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);
