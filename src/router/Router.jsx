import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../components/HomePage/HomePage';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { ErrorPage } from '../components/CommonComponents/DefaultPages/Error/ErrorPage';
import { ProductPage } from '../components/ProductPage/ProductPage';
import { ProductsForm } from '../components/Forms/ProductsForm';

export const Router = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/products" element={<ProductsList />} />
    <Route path="/products/:idProduct/details" element={<ProductPage />} />
    <Route path="/products/:idProduct/edit" element={<ProductsForm />} />
    <Route path="/products/add" element={<ProductsForm />} />
    <Route path="/" element={<Navigate replace to="/home" />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate replace to="/error" />} />
  </Routes>
);
