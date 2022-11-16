import { post, put, del } from './httpMethodsConstants';

export const successToast = method => {
  switch (method) {
  case post:
    return 'Creation';
  case put:
    return 'Modification';
  case del:
    return 'Deletion';
  default:
    return '';
  }
};
