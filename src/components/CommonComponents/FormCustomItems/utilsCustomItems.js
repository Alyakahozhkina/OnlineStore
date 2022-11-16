import { getIn } from 'formik';

export const checkError = (errors, touched, name) => getIn(errors, name) && getIn(touched, name);
export const checkErrorMessage = (errors, name) => getIn(errors, name);
