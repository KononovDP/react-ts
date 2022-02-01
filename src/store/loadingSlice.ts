import { createSlice } from '@reduxjs/toolkit';

interface ILoading {
  isLoading: boolean;
}

const initialState: ILoading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    turnOnLoading: (state) => {
      state.isLoading = true;
    },
    turnOffLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { turnOnLoading, turnOffLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
