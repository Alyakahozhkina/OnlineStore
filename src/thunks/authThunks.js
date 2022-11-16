import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../api/api';

export const getAuthUsersList = createAsyncThunk(
  'getAuthUsersList',
  async () => {
    const { data } = await api.get('/users');
    return data;
  },
);

export const addAuthUserInList = createAsyncThunk(
  'addAuthUserInList',
  async (obj) => {
    const { data } = await api.post('/users', obj);
    return data;
  },
);

export const getAuthUser = createAsyncThunk(
  'getAuthUser',
  async () => {
    const { data } = await api.get('/authenticate');
    return data;
  },
);

export const removeAuthUser = createAsyncThunk(
  'removeAuthUser',
  async ({ authUser }, { dispatch }) => {
    const { data } = await api.post('/authenticate', {
      email: '',
      password: '',
      roleAdmin: false,
      orderCart: [],
    });
    toast.info('You just logged out');
    dispatch(updateAuthUsersList({ authUser }));
    return data;
  },
);

export const addAuthUser = createAsyncThunk(
  'addAuthUser',
  async (obj) => {
    const { data } = await api.post('/authenticate', obj);
    return data;
  },
);

export const updateAuthUsersList = createAsyncThunk(
  'updateAuthUsersList',
  async ({ authUser }) => {
    const { data } = await api.put(`/users/${authUser.id}`, authUser);
    return data;
  },
);

export const updateAuthUser = createAsyncThunk(
  'updateAuthUser',
  async ({ newAuthUser }) => {
    const { data } = await api.post(`/authenticate`, newAuthUser);
    return data;
  },
);
