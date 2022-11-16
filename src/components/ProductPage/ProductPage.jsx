import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { Block, CheckCircleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { getOneProduct } from '../../thunks/productsThunks';
import { selectOneProduct, selectProductLoading } from '../../store/selectors';
import { LoadingPage } from '../CommonComponents/DefaultPages/LoadingPage/LoadingPage';
import { ProductHandlerBar } from '../ComponentsServiceParts/ProductsHandlerBar/ProductsHandlerBar';
import './productPage.scss';

export const ProductPage = memo(() => {
  const dispatch = useDispatch();
  const { idProduct } = useParams();
  const { t } = useTranslation();
  const product = useSelector(selectOneProduct);
  const isProductLoading = useSelector(selectProductLoading);
  const { name, preDescription, description, price, currency, brand,
    imagePath, gender, typeOfFragrance, availability, countryOfOrigin } = product;

  useEffect(() => {
    if (idProduct) {
      dispatch(getOneProduct({ idProduct }));
    }
  }, [dispatch, idProduct]);

  return (
    <>
      {!isProductLoading ? (
        <Box component="section" className="product-page">
          <Grid container className="container">
            <Grid item xs={7} className="product-page__image-box">
              {imagePath && (
                <img
                  src={require(`../../assets/img/products/${imagePath}`)}
                  alt={name}
                  className="product-page__image"
                  loading="lazy"
                />
              )}
            </Grid>
            <Grid item xs={5} className="product-page__features-box">
              <Box className="product-page__info">
                <Typography component="h3" className="product-page__name">
                  {name}
                </Typography>
                <Typography className="product-page__preDescription">
                  {preDescription}
                </Typography>
                <Typography className="product-page__brand">
                  {brand}
                </Typography>
                <Typography className="product-page__gender">
                  {t('genderLabel')}: {gender}
                </Typography>
                <Typography className="product-page__typeOfFragrance">
                  {t('typeOfFragranceLabel')}: {typeOfFragrance}
                </Typography>
                <Typography className="product-page__countryOfOrigin">
                  {t('countryOfOriginLabel')}: {countryOfOrigin}
                </Typography>
              </Box>
              <Box className="product-page__status">
                <Typography component="p" className="product-page__price">
                  {price} {currency}
                </Typography>
                <Typography className="product-page__availability">
                  { availability === 'true'
                    ? (<>{t('available')} <CheckCircleOutline color="success" /></>)
                    : (<>{t('notAvailable')} <Block color="error" /></>) }
                </Typography>
                <ProductHandlerBar
                  product={product}
                  idProduct={idProduct}
                />
              </Box>
            </Grid>
            <Grid item xs={12} className="product-page__description">
              {description}
            </Grid>
          </Grid>
        </Box>
      ) : <LoadingPage />}
    </>
  );
});
