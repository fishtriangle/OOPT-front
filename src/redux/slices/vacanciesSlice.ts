import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface VacanciesSliceState {
  currentId?: null | number;
  isVacanciesShown?: boolean;
}

const initialState: VacanciesSliceState = {
  currentId: null,
  isVacanciesShown: false,
};

export const vacancies = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setCurrentId: (state, action: PayloadAction<VacanciesSliceState>) => {
      state.currentId = action.payload.currentId;
    },
    showVacancies: (state) => {
      state.isVacanciesShown = true;
    },
    resetVacancies: (state) => {
      state.isVacanciesShown = false;
      state.currentId = null;
    },
  },
});

export const selectCurrentId = (state: RootState) => state.vacancies.currentId;
export const selectIsVacanciesShown = (state: RootState) =>
  state.vacancies.isVacanciesShown;

export const { setCurrentId, showVacancies, resetVacancies } =
  vacancies.actions;

export default vacancies.reducer;
