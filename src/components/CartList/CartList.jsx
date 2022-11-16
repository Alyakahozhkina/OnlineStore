import React, { memo, useCallback } from 'react';
import { Box, Divider, Grid, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCartListToDisplay, selectCartsTotalSum, selectOpenCartModal, selectTheme } from '../../store/selectors';
import { closeCartModal } from '../../store/reducers/appReducer';
import { CartListItem } from '../CartListItem/CartListItem';
import './cartList.scss';

export const CartList = memo(() => {
  const dispatch = useDispatch();
  const open = useSelector(selectOpenCartModal);
  const cartListToDisplay = useSelector(selectCartListToDisplay);
  const cartsTotalSum = useSelector(selectCartsTotalSum);
  const switchTheme = useSelector(selectTheme);
  const { t } = useTranslation();

  const handleClose = useCallback(() => dispatch(closeCartModal()), [dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box className={`cart-list ${switchTheme}`}>
        <Typography id="modal-modal-title" component="h2" className="cart-list__title">
          {t('cart')}
        </Typography>
        <Divider />
        <Box className="cart-list__products">
          <>
            {cartListToDisplay && cartListToDisplay.map((product) => (
              <CartListItem
                product={product}
                key={product.id}
              />
            ))}
          </>
        </Box>
        <Divider />
        <Box className="cart-list__sum-box">
          <Grid container className="cart-list__sum-container">
            <Grid item xs={4}>
              <Typography className="cart-list__sum-title">
                {t('total sum')}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className="cart-list__sum">
                { cartsTotalSum } {t('uah')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
});
