import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchRandomUser} from '../operations';
import {AuthState} from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{email: string}>) => {
      state.isAuthenticated = true;
      state.user = {...state.user, email: action.payload.email};
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
      }>,
    ) => {
      if (state.user) {
        state.user.first_name = action.payload.firstName;
        state.user.last_name = action.payload.lastName;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRandomUser.fulfilled, (state, action) => {
      if (state.user) {
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
        state.user.avatar = action.payload.avatar;
      }
    });
  },
});

export const {login, logout, updateUser} = authSlice.actions;
export default authSlice.reducer;
