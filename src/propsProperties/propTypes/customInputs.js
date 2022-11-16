import PropTypes from 'prop-types';
import {
  fieldInputShape, fieldSelectShape, formLoginShape, formProductShape, formRegisterShape,
  radioProductShape, selectProductShape,
} from '../shapes/shapes';

export const inputCustomPropTypes = {
  field: PropTypes.shape(fieldInputShape).isRequired,
  form: PropTypes.oneOfType([
    PropTypes.shape(formProductShape),
    PropTypes.shape(formLoginShape),
    PropTypes.shape(formRegisterShape),
  ]),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const selectCustomPropTypes = {
  field: PropTypes.shape(fieldSelectShape).isRequired,
  form: PropTypes.shape(formProductShape).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(selectProductShape)).isRequired,
  required: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export const radioCustomPropTypes = {
  field: PropTypes.shape(fieldSelectShape).isRequired,
  form: PropTypes.shape(formProductShape).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(radioProductShape)).isRequired,
  required: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
