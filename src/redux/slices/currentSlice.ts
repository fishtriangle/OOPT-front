import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CurrentSliceState {
  current?: null | number;
  currentNews?: null | number;
}

const initialState: CurrentSliceState = {
  current: null,
  currentNews: null,
};

export const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<CurrentSliceState>) => {
      state.current = Number(action.payload.current);
    },
    setCurrentNews: (state, action: PayloadAction<CurrentSliceState>) => {
      state.currentNews = Number(action.payload.currentNews);
    },
  },
});

export const selectCurrentEnterprise = (state: RootState) =>
  state.currentSlice.current;
export const selectCurrentNews = (state: RootState) =>
  state.currentSlice.currentNews;

export const { setCurrent, setCurrentNews } = currentSlice.actions;

export default currentSlice.reducer;
