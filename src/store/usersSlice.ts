import { createSlice } from '@reduxjs/toolkit';

interface IUsers {
  filteredValue: string;
  sortedValue: string;
}

const initialState: IUsers = {
  filteredValue: '',
  sortedValue: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterBy: (state, action) => {
      state.filteredValue = action.payload;
    },
    sortedBy: (state, action) => {
      state.sortedValue = action.payload;
    },
  },
});

export const { filterBy, sortedBy } = usersSlice.actions;

export default usersSlice.reducer;
