import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openLoginModal: false,
  openCartListModal: false,
  theme: 'light',
  language: 'en',
  flagLogin: true,
  filter: '',
  sortBy: 'name',
  directionSort: 'asc',
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    openFormModal: (state) => {
      state.openLoginModal = true;
    },
    closeFormModal: (state) => {
      state.openLoginModal = false;
    },
    openCartModal: (state) => {
      state.openCartListModal = true;
    },
    closeCartModal: (state) => {
      state.openCartListModal = false;
    },
    setRegisterForm: (state) => {
      state.flagLogin = false;
    },
    setLoginForm: (state) => {
      state.flagLogin = true;
    },
    setFilterName: (state, { payload }) => {
      state.filter = payload;
    },
    setSortBy: (state, { payload }) => {
      state.sortBy = payload;
    },
    setDirection: (state, { payload }) => {
      state.directionSort = payload;
    },
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
  },
});

export const {
  openFormModal,
  closeFormModal,
  setLoginForm,
  setRegisterForm,
  openCartModal,
  closeCartModal,
  setFilterName,
  setSortBy,
  setDirection,
  setTheme,
  setLanguage,
} = appReducer.actions;

export default appReducer.reducer;
