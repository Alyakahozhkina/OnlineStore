import React, { memo } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import './loadingPage.scss';

export const LoadingPage = memo(() => (
  <Grid container className="loading-page">
    <Grid item xs={12} className="loading-page__item">
      <Box className="loading-page__box">
        <CircularProgress color="secondary" size={200} />
      </Box>
    </Grid>
  </Grid>
));
