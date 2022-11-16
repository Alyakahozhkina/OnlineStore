import React, { memo } from 'react';
import { Box, Fab, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import {
  selectAuthUser, selectProductAdding,
  selectProductLoading, selectProductsListSorted, selectProductUpdating,
} from '../../store/selectors';
import { ProductCard } from '../ProductCard/ProductCard';
import { FiltersBar } from '../FiltersBar/FiltersBar';
import { LoadingPage } from '../CommonComponents/DefaultPages/LoadingPage/LoadingPage';
import './productsList.scss';

export const ProductsList = memo(() => {
  const { t } = useTranslation();
  const productsList = useSelector(selectProductsListSorted);
  const authUser = useSelector(selectAuthUser);
  const isProductLoading = useSelector(selectProductLoading);
  const isProductAdding = useSelector(selectProductAdding);
  const isProductUpdating = useSelector(selectProductUpdating);

  return (
    <>
      {!isProductLoading && !isProductAdding && !isProductUpdating ? (
          <Box component="section" className="products-list">
            <Grid container className="container">
              <Grid item xs={12}>
                <FiltersBar />
              </Grid>
              <Grid item xs={12} className="products-list__inner-list">
                { productsList.length
                  ? productsList.map((product, index) => (

                    <ProductCard
                      product={product}
                      index={index}
                      key={index}
                    />
                  ))
                  : (
                    <Typography className="products-list__no-products">
                      {t('noProduct')}
                    </Typography>
                  ) }
              </Grid>
              <Grid item xs={12} className="products-list__add-button-inner">
                { authUser.roleAdmin && (
                  <Grid item xs={12}>
                    <Fab
                      color="secondary"
                      aria-label="add"
                      className="products-list__add-button"
                      to="/products/add"
                      component={RouterLink}
                    >
                      <Add />
                    </Fab>
                  </Grid>
                ) }
              </Grid>
            </Grid>
          </Box>
        )
        : (
          <LoadingPage />
        )}
    </>
  );
});
