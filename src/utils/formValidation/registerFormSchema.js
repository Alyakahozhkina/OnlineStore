import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('errorsInput.required')
    .email('errorsInput.emailTest')
    .min(5, 'errorsInput.minLength')
    .max(30, 'errorsInput.maxLength'),
  password: Yup.string()
    .required('errorsInput.required')
    .min(8, 'errorsInput.passwordMinLength'),
    //.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/, 'errorsInput.minLength'),
  firstName: Yup.string()
    .required('errorsInput.required')
    .min(5, 'errorsInput.minLength')
    .max(30, 'errorsInput.maxLength'),
  lastName: Yup.string()
    .required('errorsInput.required')
    .min(5, 'errorsInput.minLength')
    .max(30, 'errorsInput.maxLength'),
});
