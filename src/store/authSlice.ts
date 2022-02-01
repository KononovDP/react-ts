import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
  email: string | null;
}

const initialState: IAuth = {
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
