import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IPhoto } from '../../common/types';

type SelectImageItem = {
  images?: null | IPhoto[];
  currentImage?: number;
  isImageShown?: boolean;
};

const initialState: SelectImageItem = {
  images: null,
  currentImage: 0,
  isImageShown: false,
};

export const fullScreenImage = createSlice({
  name: 'fullScreenImage',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<SelectImageItem>) => {
      state.images = action.payload.images;
      state.currentImage = action.payload.currentImage;
    },
    resetImage: (state) => {
      state.images = null;
      state.isImageShown = false;
    },
    showImage: (state) => {
      state.isImageShown = true;
    },
  },
});

export const selectImage = (state: RootState) => state.fullScreenImage;
// export const selectAlt = (state) => state.fullScreenImage.alt;
// export const selectImageIsShown = (state) => state.fullScreenImage.isImageShown;

export const { setImages, resetImage, showImage } = fullScreenImage.actions;

export default fullScreenImage.reducer;
