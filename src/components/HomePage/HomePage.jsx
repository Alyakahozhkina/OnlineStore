import { memo } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import banner from '../../assets/img/common/banner.png';
import './homePage.scss';

export const HomePage = memo(() => {
  const { t } = useTranslation();

  return (
    <Box component="section" className="home-page">
      <Grid container className="container">
        <Grid item xs={6} className="home-page__text-inner">
          <Box component="h1" className="home-page__title">{t('homePageTitle')}</Box>
          <Box component="p" className="home-page__sub-title">{t('homePageSubTitle')}</Box>
          <Button
            variant="outlined"
            className="home-page__button"
            to="/products"
            component={RouterLink}
          >
            {t('getProduct')}
          </Button>
        </Grid>
        <Grid item xs={6} className="home-page__img-inner">
          <img
            className="home-page__img"
            src={banner}
            alt="banner"
          />
        </Grid>
      </Grid>
    </Box>
  );
});
