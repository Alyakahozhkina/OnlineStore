import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import error from '../../../../assets/img/common/error_404.png';
import './errorPage.scss';

export const ErrorPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Grid container className="error-page container">
      <Grid item xs={12}>
        <Box component="div" className="error-page__image-box">
          <img src={error} alt="error" />
        </Box>
        <Typography variant="inherit" className="error-page__text">
          {t('errorText')}
        </Typography>
        <Button variant="contained" to="/products" component={RouterLink} className="error-page__button home-button">{t('goHome')}</Button>
      </Grid>
    </Grid>
  );
});
