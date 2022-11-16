import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Close, Remove } from '@mui/icons-material';
import { selectAuthUser } from '../../store/selectors';
import { updateAuthUser } from '../../thunks/authThunks';
import { useDebounce } from '../../hooks/useDebounce';
import { productDefaultProps } from '../../propsProperties/defaultProps/products';
import { productPropTypes } from '../../propsProperties/propTypes/products';
import { closeCartModal } from '../../store/reducers/appReducer';
import './cartListItem.scss';

export const CartListItem = memo(({ product }) => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const {
    id,
    amount,
    imagePath,
    name,
    price,
    currency,
  } = product;
  const [productAmount, setProductAmount] = useState(amount);

  const handleIncrement = useCallback(() => setProductAmount(productAmount + 1), [productAmount]);
  const handleDecrement = useCallback(() => setProductAmount(productAmount - 1), [productAmount]);

  const addProductToCart = useCallback((count, productId) => {
    if (authUser.orderCart.find((order) => order.id === productId)) {
      return {
        ...authUser,
        orderCart: authUser.orderCart.map((order) => {
          if (order.id === productId) {
            return { ...order, amount: count };
          }
          return order;
        }),
      };
    }
    return {
      ...authUser,
      orderCart: [...authUser.orderCart, { id: productId, amount: count }],
    };
  }, [authUser]);

  const addItemInCart = useCallback(() => {
    const newAuthUser = addProductToCart(productAmount, id);
    dispatch(updateAuthUser({ newAuthUser }));
  }, [addProductToCart, dispatch, id, productAmount]);

  const debouncedChangeCart = useDebounce(addItemInCart, '500');

  useEffect(() => {
    if (amount !== productAmount) {
      debouncedChangeCart(productAmount);
    }
  }, [debouncedChangeCart, amount, productAmount]);

  const deleteProductFromCart = useCallback((productId) => {
    const newAuthUser = {
      ...authUser,
      orderCart: authUser.orderCart.filter((product) => product.id !== productId),
    };
    dispatch(updateAuthUser({ newAuthUser }));
    if (!newAuthUser.orderCart.length) {
      dispatch(closeCartModal());
    }
  }, [authUser, dispatch]);

  const handleRemoveButtonClick = useCallback(() => {
    if (!(productAmount - 1)) {
      return deleteProductFromCart(id);
    }
    handleDecrement();
  }, [deleteProductFromCart, handleDecrement, id, productAmount]);

  const handleCloseButtonClick = useCallback(() => {
    deleteProductFromCart(id);
  }, [deleteProductFromCart, id]);

  return (
    <Box className="cart-list__product product">
      <Grid container>
        <Grid item xs={4}>
          <Box className="product__image-box">
            <img src={require(`../../assets/img/products/${imagePath}`)} alt={name} className="product__image" />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="product__column">
            <Typography className="product__name">
              { name }
            </Typography>
            <Box className="product__count-list">
              <IconButton color="default" onClick={handleRemoveButtonClick}><Remove /></IconButton>
              { productAmount }
              <IconButton color="default" onClick={handleIncrement}><Add /></IconButton>
              <IconButton color="error" onClick={handleCloseButtonClick}><Close /></IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography className="product__price">
            { price * productAmount } { currency }
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
});

CartListItem.propTypes = productPropTypes;

CartListItem.defaultProps = productDefaultProps;
