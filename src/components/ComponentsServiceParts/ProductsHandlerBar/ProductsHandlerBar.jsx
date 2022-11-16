import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, AddShoppingCart } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { deleteProduct } from '../../../thunks/productsThunks';
import { selectAuthUser } from '../../../store/selectors';
import { useDebounce } from '../../../hooks/useDebounce';
import { updateAuthUser } from '../../../thunks/authThunks';
import { openFormModal } from '../../../store/reducers/appReducer';
import { productHandlerBarPropTypes } from '../../../propsProperties/propTypes/products';
import { productHandlerBarDefaultProps } from '../../../propsProperties/defaultProps/products';

export const ProductHandlerBar = memo(({ product, idProduct }) => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => setCount(count + 1), [count]);

  const addProductToAuthUsersCart = useCallback((authUser, count, productId) => {
    if (authUser.orderCart.find((order) => order.id === productId)) {
      return {
        ...authUser,
        orderCart: authUser.orderCart.map((order) => {
          if (order.id === productId) {
            return { ...order, amount: order.amount + count };
          }
          return order;
        }),
      };
    }
    return {
      ...authUser,
      orderCart: [...authUser.orderCart, { id: productId, amount: count }],
    };
  }, []);

  const addItemInCart = useCallback(() => {
    const newAuthUser = addProductToAuthUsersCart(authUser, count, product.id);
    dispatch(updateAuthUser({ newAuthUser }));
    setCount(0);
  }, [addProductToAuthUsersCart, authUser, count, dispatch, product.id]);

  const debouncedCounter = useDebounce(addItemInCart, '500');

  const handleProductCart = useCallback(() => {
    if (authUser.email) {
      handleIncrement();
      return;
    }
    dispatch(openFormModal());
  }, [authUser.email, dispatch, handleIncrement]);

  const handleProductDelete = useCallback(() => dispatch(deleteProduct({ idProduct })), [dispatch, idProduct]);

  const disabledProductCart = useMemo(() => product.availability === 'false', [product.availability]);

  useEffect(() => {
    if (count !== 0) {
      debouncedCounter();
    }
  }, [count, debouncedCounter]);

  return (
    <Stack
      direction="row"
      spacing={2}
      className="product-card__buttons-box"
    >
      { authUser.roleAdmin ? (
          <>
            <IconButton
              color="success"
              to={`/products/${idProduct}/edit`}
              component={RouterLink}
            >
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleProductDelete}><Delete /></IconButton>
          </>
        )
        : (
          <IconButton
            color="primary"
            disabled={disabledProductCart}
            onClick={handleProductCart}
            className="product-card__cart-button"
          >
            <AddShoppingCart />
          </IconButton>
        ) }
    </Stack>
  );
});


ProductHandlerBar.propTypes = productHandlerBarPropTypes;

ProductHandlerBar.defaultProps = productHandlerBarDefaultProps;
