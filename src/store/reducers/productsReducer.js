import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, editProduct, getProductsList, getOneProduct } from '../../thunks/productsThunks';

const initialState = {
  productsList: [],
  productItem: {},
  isProductLoading: true,
  isProductAdding: false,
  isProductUpdating: false,
  isProductRemoving: false,
  errorProducts: null
};

const productsReducer = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getProductsList.pending]: (state) => {
      state.isProductLoading = true;
      state.errorProducts = null;
    },
    [getProductsList.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      state.productsList = payload;
    },
    [getProductsList.rejected]: (state, { payload }) => {
      state.productsList = [];
      state.isProductLoading = false;
      state.errorProducts = payload;
    },
    [getOneProduct.pending]: (state) => {
      state.isProductLoading = true;
      state.errorProducts = null;
    },
    [getOneProduct.fulfilled]: (state, { payload }) => {
      state.isProductLoading = false;
      state.productItem = payload;
    },
    [getOneProduct.rejected]: (state, { payload }) => {
      state.productItem = {};
      state.isProductLoading = false;
      state.errorProducts = payload;
    },
    [addProduct.pending]: (state) => {
      state.isProductAdding = true;
      state.errorProducts = null;
    },
    [addProduct.fulfilled]: (state, { payload }) => {
      state.isProductAdding = false;
      state.productsList = [...state.productsList, payload];
    },
    [addProduct.rejected]: (state, { payload }) => {
      state.isProductAdding = false;
      state.errorProducts = payload;
    },
    [editProduct.pending]: (state) => {
      state.isProductUpdating = true;
      state.errorProducts = null;
    },
    [editProduct.fulfilled]: (state, { payload }) => {
      state.isProductUpdating = false;
      state.productsList = state.productsList.map(product => {
        if (product.id === payload.id) {
          return payload;
        }
        return product;
      });
    },
    [editProduct.rejected]: (state, { payload }) => {
      state.isProductUpdating = false;
      state.errorProducts = payload;
    },
    [deleteProduct.pending]: (state) => {
      state.isProductRemoving = true;
      state.errorProducts = null;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.isProductRemoving = false;
      state.productsList = state.productsList.filter(product => product.id !== payload);
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.isProductRemoving = false;
      state.errorProducts = payload;
    },
  },
});

export default productsReducer.reducer;
