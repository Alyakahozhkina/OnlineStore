import PropTypes from 'prop-types';

export const fieldInputShape = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export const fieldSelectShape = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export const formProductShape = {
  errors: PropTypes.shape({
    name: PropTypes.string,
    preDescription: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    currency: PropTypes.string,
    brand: PropTypes.string,
    imagePath: PropTypes.string,
    gender: PropTypes.string,
    typeOfFragrance: PropTypes.string,
    availability: PropTypes.string,
    countryOfOrigin: PropTypes.string,
  }),
  touched: PropTypes.shape({
    title: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    description: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    weight: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    category: PropTypes.bool,
  }),
  setFieldValue: PropTypes.func,
};

export const formLoginShape = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  touched: PropTypes.shape({
    email: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    password: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
  }),
};

export const formRegisterShape = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  touched: PropTypes.shape({
    email: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    password: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    firstName: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
    lastName: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.bool.isRequired,
    ]),
  }),
};

export const selectProductShape = {
  value: PropTypes.string.isRequired,
};

export const radioProductShape = {
  key: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export const productShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  preDescription: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  typeOfFragrance: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  countryOfOrigin: PropTypes.string.isRequired,
};
