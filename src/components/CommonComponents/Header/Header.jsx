import React, { memo, useCallback, useEffect } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openCartModal, openFormModal } from '../../../store/reducers/appReducer';
import { LoginRegisterModal } from '../../LoginRegisterModal/LoginRegisterModal';
import { selectAuthUser, selectNumberOrdersFromCartToDisplay } from '../../../store/selectors';
import { removeAuthUser } from '../../../thunks/authThunks';
import { CartList } from '../../CartList/CartList';
import { getProductsList } from '../../../thunks/productsThunks';
import { ThemeSwitcher } from '../../ComponentsServiceParts/ThemeSwitcher/ThemeSwitcher';
import { SelectAutoWidth } from '../../ComponentsServiceParts/LanguageSelect/LanguageSelect';
import logo from '../../../assets/img/common/logo.png';
import './header.scss';

export const Header = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authUser = useSelector(selectAuthUser);
  const { email, roleAdmin } = authUser;
  const numberOrders = useSelector(selectNumberOrdersFromCartToDisplay);

  const handleOpenLoginForm = useCallback(( ) => dispatch(openFormModal()), [dispatch]);

  const handleOpenCartList = useCallback(() => dispatch(openCartModal()), [dispatch]);

  const loginOut = useCallback(() => dispatch(removeAuthUser({ authUser })), [authUser, dispatch]);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  return (
    <Box component="header" className="header lock-padding">
      <Grid container className="container">
        <Grid item xs={1}>
          <Box className="header__logo">
            <Link to="/home"><img src={logo} alt="logo" /></Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="header__menu menu">
            <Box component="nav" className="menu__body">
              <ul className="menu__list">
                <li className="menu__item"><Link to="/home" className="menu__link">{t('homeLink')}</Link></li>
                <li className="menu__item"><Link to="/products" className="menu__link">{t('storeLink')}</Link></li>
              </ul>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box className="header__interactions interactions">
            <ThemeSwitcher />
            <SelectAutoWidth />
            { !roleAdmin && email && (
              <Box className="interactions__cart cart">
                <IconButton className="cart__button" onClick={handleOpenCartList}><ShoppingCart /></IconButton>
                <>
                  { numberOrders
                    ? (<Box component="div" className="cart__orders">{ numberOrders }</Box>)
                    : null}
                </>
              </Box>
            ) }
            <Box className="interactions__link">
              <>
                { !email ? (
                    <Button variant="text" className="interactions__login" onClick={handleOpenLoginForm}>{t('login')}</Button>)
                  : (<Button variant="text" className="interactions__login-out" onClick={loginOut}>{t('loginOut')}</Button>)}
              </>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <LoginRegisterModal />
      <CartList />
    </Box>
  );
});
