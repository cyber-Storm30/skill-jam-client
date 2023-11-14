import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    updateUser: (state, action) => {
      state.user.is_form_filled = true;
    },
    logout: (state, action) => {
      state.user = {};
      state.userDetails = {};
    },
  },
});

export const {setUser, updateUser, logout, setUserDetails} = authSlice.actions;

export default authSlice.reducer;
