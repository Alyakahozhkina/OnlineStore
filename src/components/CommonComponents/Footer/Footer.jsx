import React, { memo } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/common/logo.png';
import './footer.scss';

export const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <Box component="footer" className="footer">
      <Grid container className="container">
        <Grid item xs={12} className="footer__inner">
          <Box component="div" className="footer__text-box">
            <Box component="div" className="footer__logo">
              <Link to="/home"><img src={logo} alt="logo" /></Link>
            </Box>
            <Box component="p" className="footer__text">
              {t('footerText')}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});
