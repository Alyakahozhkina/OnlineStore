import React, { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/CommonComponents/Header/Header';
import axiosInterceptor from './thunks/axiosInterceptor/axiosInterceptor';
import { Router } from './router/Router';
import { Footer } from './components/CommonComponents/Footer/Footer';
import { selectAuthUserLoading, selectLanguage, selectTheme } from './store/selectors';
import { getAuthUser } from './thunks/authThunks';
import { LoadingPage } from './components/CommonComponents/DefaultPages/LoadingPage/LoadingPage';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

axiosInterceptor();

const App = memo(() => {
  const dispatch = useDispatch();
  const switchTheme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
  const isAuthUserLoading = useSelector(selectAuthUserLoading);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  return (
    <>
      {!isAuthUserLoading ? (
        <Box component="div" className={`for__page ${switchTheme}`}>
          <Box component="div" className="page">
            <Header />
            <Router />
          </Box>
          <Footer />
        </Box>
      ) : <LoadingPage />}
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
});

export default App;
