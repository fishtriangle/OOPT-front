import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { EnumDescriptionBlock } from '../../common/types';

interface IDescriptionBlockSliceState {
  isHide: boolean;
  blockType: EnumDescriptionBlock;
  currentTrackId: number;
  currentPointId: number;
  currentTownId: number;
  currentMasterId: number;
  currentServiceId: number;
  currentHolidayId: number;
}

const initialState: IDescriptionBlockSliceState = {
  isHide: true,
  blockType: EnumDescriptionBlock.ABOUT,
  currentTrackId: 0,
  currentPointId: 1,
  currentTownId: 1,
  currentMasterId: 1,
  currentServiceId: 1,
  currentHolidayId: 1,
};

export const descriptionBlockSlice = createSlice({
  name: 'descriptionBlock',
  initialState,
  reducers: {
    hideBlock: (state) => {
      state.isHide = true;
    },
    showBlock: (state) => {
      state.isHide = false;
    },
    setBlockType: (state, action) => {
      state.blockType = action.payload;
    },
    setCurrentTrackId: (state, action) => {
      state.currentTrackId = action.payload;
    },
    setCurrentPointId: (state, action) => {
      state.currentPointId = action.payload;
    },
    setCurrentTownId: (state, action) => {
      state.currentTownId = action.payload;
    },
    setCurrentMasterId: (state, action) => {
      state.currentMasterId = action.payload;
    },
    setCurrentServiceId: (state, action) => {
      state.currentServiceId = action.payload;
    },
    setCurrentHolidayId: (state, action) => {
      state.currentHolidayId = action.payload;
    },
  },
});

export const selectDescriptionBlockIsHide = (state: RootState) =>
  state.descriptionBlock.isHide;
export const selectType = (state: RootState) =>
  state.descriptionBlock.blockType;
export const selectCurrentTrackId = (state: RootState) =>
  state.descriptionBlock.currentTrackId;
export const selectCurrentPointId = (state: RootState) =>
  state.descriptionBlock.currentPointId;
export const selectCurrentTownId = (state: RootState) =>
  state.descriptionBlock.currentTownId;
export const selectCurrentMasterId = (state: RootState) =>
  state.descriptionBlock.currentMasterId;
export const selectCurrentServiceId = (state: RootState) =>
  state.descriptionBlock.currentServiceId;
export const selectCurrentHolidayId = (state: RootState) =>
  state.descriptionBlock.currentHolidayId;

export const {
  hideBlock,
  showBlock,
  setBlockType,
  setCurrentTrackId,
  setCurrentPointId,
  setCurrentTownId,
  setCurrentMasterId,
  setCurrentServiceId,
  setCurrentHolidayId,
} = descriptionBlockSlice.actions;

export default descriptionBlockSlice.reducer;
