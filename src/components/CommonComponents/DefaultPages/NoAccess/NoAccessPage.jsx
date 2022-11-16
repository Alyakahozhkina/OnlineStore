import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import noAccess from '../../../../assets/img/common/noAccess.png';
import './noAccessPage.scss';

export const NoAccessPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Grid container className="no-access container">
      <Grid item xs={12}>
        <Box className="no-access__main">
          <Box className="no-access__image-box">
            <img src={noAccess} alt="no access" />
          </Box>
          <Typography variant="h2" className="no-access__title">
            {t('noAccessTitle')}
          </Typography>
        </Box>
        <Typography variant="inherit" className="no-access__text">
          {t('noAccessText')}
        </Typography>
        <Button
          variant="contained"
          to="/products"
          component={RouterLink}
          className="no-access__button home-button"
        >
          {t('goHome')}
        </Button>
      </Grid>
    </Grid>
  );
});
