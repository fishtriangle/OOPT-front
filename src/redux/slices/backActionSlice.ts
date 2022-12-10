import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { EnumDescriptionBlock } from '../../common/types';

interface BackActionSliceState {
  current: null | { id: number; type: EnumDescriptionBlock };
}

const initialState: BackActionSliceState = {
  current: null,
};

export const backActionSlice = createSlice({
  name: 'backAction',
  initialState,
  reducers: {
    setBackAction: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const selectBackAction = (state: RootState) =>
  state.backActionSlice.current;

export const { setBackAction } = backActionSlice.actions;

export default backActionSlice.reducer;
