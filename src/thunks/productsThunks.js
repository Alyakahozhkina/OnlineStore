import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const getProductsList = createAsyncThunk(
  'getProductsList',
  async () => {
    const { data } = await api.get('/products');
    return data;
  },
);

export const getOneProduct = createAsyncThunk(
  'getOneProduct',
  async ({idProduct}) => {
    const { data } = await api.get(`/products/${idProduct}`);
    return data;
  },
);

export const addProduct = createAsyncThunk(
  'addProduct',
  async ({productToAdd}) => {
    const { data } = await api.post('/products', productToAdd);
    return data;
  },
);

export const editProduct = createAsyncThunk(
  'editProduct',
  async ({ idProduct, res }) => {
    const { data } = await api.put(`/products/${idProduct}`, res);
    return data;
  },
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async ({idProduct}) => {
    await api.delete(`/products/${idProduct}`);
    return idProduct;
  },
);
