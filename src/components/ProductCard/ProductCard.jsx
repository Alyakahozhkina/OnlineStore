import React, { memo, useMemo } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircleOutline, Block } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ProductHandlerBar } from '../ComponentsServiceParts/ProductsHandlerBar/ProductsHandlerBar';
import { productPropTypes } from '../../propsProperties/propTypes/products';
import { productDefaultProps } from '../../propsProperties/defaultProps/products';
import './productCard.scss';

export const ProductCard = memo(({ product }) => {
  const productAvailability = useMemo(() => {
    return (product.availability === 'true' ? <CheckCircleOutline color="success" /> : <Block color="error" />)
  }, [product.availability]);

  return (
    <Card key={product.id} className="product-card">
      <Link to={`/products/${product.id}/details`}>
        <Box className="product-card__img-inner">
          {product.imagePath && (
          <CardMedia
            component="img"
            height="140"
            image={require(`../../assets/img/products/${product.imagePath}`)}
            alt={product.name}
            className="product-card__img"
          />
            )}
        </Box>
      </Link>
      <CardContent className="product-card__content">
        <Link to={`/products/${product.id}/details`}>
          <Typography variant="h5" component="h5" className="product-card__title">
            { product.name }
          </Typography>
          <Typography color="text.secondary" className="product-card__description">
            { product.preDescription }
          </Typography>
        </Link>
        <Box className="product-card__price-box">
          <Typography variant="body2" className="product-card__price">
            { `${product.price} ${product.currency.toUpperCase()}` }
          </Typography>
          <Typography variant="body2" className="product-card__availability">
            { productAvailability }
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <ProductHandlerBar
          product={product}
          idProduct={product.id}
        />
      </CardActions>
    </Card>
  );
});

ProductCard.propTypes = productPropTypes;

ProductCard.defaultProps = productDefaultProps;
