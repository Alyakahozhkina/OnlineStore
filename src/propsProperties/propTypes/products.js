import PropTypes from 'prop-types';
import { productShape } from '../shapes/shapes';

export const productHandlerBarPropTypes = {
  product: PropTypes.shape(productShape).isRequired,
  idProduct: PropTypes.string.isRequired,
};

export const sortingIconButtonPropTypes = {
  buttonName: PropTypes.string.isRequired,
};

export const productPropTypes = {
  product: PropTypes.shape(productShape).isRequired,
};
