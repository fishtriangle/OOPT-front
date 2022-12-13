import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IViewState } from '../../common/types';
import { INITIAL_VIEW_STATE } from '../../components/Map/variables';

interface ICurrentViewState {
  current: IViewState;
}

const initialState: ICurrentViewState = {
  current: INITIAL_VIEW_STATE,
};

export const currentViewStateSlice = createSlice({
  name: 'currentViewState',
  initialState,
  reducers: {
    setCurrentViewState: (state, action: PayloadAction<IViewState>) => {
      state.current = { ...state.current, ...action.payload };
    },
  },
});

export const selectCurrentViewState = (state: RootState) =>
  state.currentViewStateSlice;

export const { setCurrentViewState } = currentViewStateSlice.actions;

export default currentViewStateSlice.reducer;
