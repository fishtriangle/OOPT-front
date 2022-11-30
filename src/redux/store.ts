import { configureStore } from '@reduxjs/toolkit';
import descriptionBlock from './slices/descriptionBlockSlice';
import currentSlice from './slices/currentSlice';
import fullScreenImage from './slices/fullScreenImageSlice';
import vacancies from './slices/vacanciesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    descriptionBlock,
    currentSlice,
    fullScreenImage,
    vacancies,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
