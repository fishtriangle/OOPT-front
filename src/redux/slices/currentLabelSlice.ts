import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IMark } from '../../common/types';

interface CurrentLabelSliceState {
  current: IMark;
}

const initialState: CurrentLabelSliceState = {
  current: {
    coordinates: [0, 0],
    marker: 'house',
  },
};

export const currentLabelSlice = createSlice({
  name: 'currentLabel',
  initialState,
  reducers: {
    setCurrentLabel: (state, action: PayloadAction<IMark>) => {
      state.current = action.payload;
    },
  },
});

export const selectCurrentLabel = (state: RootState) =>
  state.currentLabelSlice.current;

export const { setCurrentLabel } = currentLabelSlice.actions;

export default currentLabelSlice.reducer;
