import { configureStore, current } from '@reduxjs/toolkit';
import descriptionBlock from './slices/descriptionBlockSlice';
import fullScreenImage from './slices/fullScreenImageSlice';
import vacancies from './slices/vacanciesSlice';
import { useDispatch } from 'react-redux';
import backActionSlice from './slices/backActionSlice';
import currentSlice from './slices/currentSlice';
import currentLabelSlice from './slices/currentLabelSlice';
import currentViewStateSlice from './slices/currentViewStateSlice';

export const store = configureStore({
  reducer: {
    descriptionBlock,
    backActionSlice,
    fullScreenImage,
    vacancies,
    currentSlice,
    currentLabelSlice,
    currentViewStateSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
