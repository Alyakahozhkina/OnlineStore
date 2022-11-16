import { createSlice } from '@reduxjs/toolkit';
import {
  addAuthUser,
  addAuthUserInList, updateAuthUser,
  getAuthUser,
  getAuthUsersList,
  removeAuthUser, updateAuthUsersList,
} from '../../thunks/authThunks';

const initialState = {
  authUsersList: [],
  authUser: {
    email: '',
    password: '',
    roleAdmin: false,
    orderCart: [],
  },
  isAuthUserListLoading: true,
  isAuthUserLoading: true,
  isAuthUserAdding: true,
  isAuthUserUpdating: true,
  errorAuth: null,
};

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getAuthUsersList.pending]: (state) => {
      state.isAuthUserListLoading = true;
      state.errorAuth = null;
    },
    [getAuthUsersList.fulfilled]: (state, { payload }) => {
      state.isAuthUserListLoading = false;
      state.authUsersList = payload;
    },
    [getAuthUsersList.rejected]: (state, { payload }) => {
      state.isAuthUserListLoading = false;
      state.errorAuth = payload;
    },
    [addAuthUserInList.pending]: (state) => {
      state.isAuthUserAdding = true;
      state.errorAuth = null;
    },
    [addAuthUserInList.fulfilled]: (state, { payload }) => {
      state.isAuthUserAdding = false;
      state.authUsersList = [...state.authUsersList, payload];
    },
    [addAuthUserInList.rejected]: (state, { payload }) => {
      state.isAuthUserAdding = false;
      state.errorAuth = payload;
    },
    [getAuthUser.pending]: (state) => {
      state.isAuthUserLoading = true;
      state.errorAuth = null;
    },
    [getAuthUser.fulfilled]: (state, { payload }) => {
      state.isAuthUserLoading = false;
      state.authUser = payload;
    },
    [getAuthUser.rejected]: (state, { payload }) => {
      state.isAuthUserLoading = false;
      state.errorAuth = payload;
    },
    [removeAuthUser.pending]: (state) => {
      state.errorAuth = null;
    },
    [removeAuthUser.fulfilled]: (state, { payload }) => {
      state.authUser = payload;
    },
    [removeAuthUser.rejected]: (state, { payload }) => {
      state.errorAuth = payload;
    },
    [addAuthUser.pending]: (state) => {
      state.isAuthUserAdding = true;
      state.errorAuth = null;
    },
    [addAuthUser.fulfilled]: (state, { payload }) => {
      state.isAuthUserAdding = false;
      state.authUser = payload;
    },
    [addAuthUser.rejected]: (state, { payload }) => {
      state.isAuthUserAdding = false;
      state.errorAuth = payload;
    },
    [updateAuthUsersList.pending]: (state) => {
      state.errorAuth = null;
    },
    [updateAuthUsersList.fulfilled]: (state, { payload }) => {
      state.isAuthUserUpdating = false;
      state.authUsersList = state.authUsersList.map(user => {
        if (user.id === payload.id) {
          return payload;
        }
        return user;
      });
    },
    [updateAuthUsersList.rejected]: (state, { payload }) => {
      state.errorAuth = payload;
    },
    [updateAuthUser.pending]: (state) => {
      state.isAuthUserUpdating = true;
      state.errorAuth = null;
    },
    [updateAuthUser.fulfilled]: (state, { payload }) => {
      state.isAuthUserUpdating = false;
      state.authUser = { ...payload };
    },
    [updateAuthUser.rejected]: (state, { payload }) => {
      state.isAuthUserUpdating = false;
      state.errorAuth = payload;
    },
  },
});

export default authReducer.reducer;
