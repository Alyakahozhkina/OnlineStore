import * as Yup from 'yup';

export const productsFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('errorsInput.required')
    .min(5, 'errorsInput.minLength')
    .max(30, 'errorsInput.maxLength'),
  preDescription: Yup.string()
    .required('errorsInput.required')
    .max(30, 'errorsInput.maxLength'),
  description: Yup.string()
    .required('errorsInput.required'),
  price: Yup.number()
    .typeError('errorsInput.number')
    .positive('errorsInput.priceTest')
    .max(99999, 'errorsInput.priceMax')
    .required('errorsInput.required'),
  currency: Yup.string()
    .required('errorsInput.required'),
  brand: Yup.string()
    .required('errorsInput.required')
    .min(5, 'errorsInput.minLength')
    .max(30, 'errorsInput.maxLength'),
  imagePath: Yup.string()
    .required('errorsInput.required'),
  gender: Yup.string()
    .required('errorsInput.required'),
  typeOfFragrance: Yup.string()
    .required('errorsInput.required'),
  availability: Yup.string()
    .required('errorsInput.required'),
  countryOfOrigin: Yup.string()
    .required('errorsInput.required'),
});
