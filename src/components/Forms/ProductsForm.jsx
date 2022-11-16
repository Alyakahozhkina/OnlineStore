import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Stack, Typography, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { InputCustom } from '../CommonComponents/FormCustomItems/InputCustom';
import { selectProductLoading, selectOneProduct, selectAuthUser } from '../../store/selectors';
import { addProduct, editProduct, getOneProduct } from '../../thunks/productsThunks';
import { SelectCustom } from '../CommonComponents/FormCustomItems/SelectCustom';
import { availabilityOptions, currencyOptions, genderOptions } from '../../utils/consts/formsOptions';
import { RadioCustom } from '../CommonComponents/FormCustomItems/RadioCustom';
import { productsFormSchema } from '../../utils/formValidation/productsFormSchema';
import { LoadingPage } from '../CommonComponents/DefaultPages/LoadingPage/LoadingPage';
import { NoAccessPage } from '../CommonComponents/DefaultPages/NoAccess/NoAccessPage';
import config from './forms.config';
import './forms.scss';

const {
  emptyString,
  containedBtnVariant,
  outlinedBtnVariant,
  textType,
  numberType,
  inputClass,
  textareaClass,
  secondSpacing,
  buttonsBoxClass,
  rowDirection,
  submitBtnType,
} = config;

export const ProductsForm = memo(() => {
  const { idProduct } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const product = useSelector(selectOneProduct);
  const isProductLoading = useSelector(selectProductLoading);
  const authUser = useSelector(selectAuthUser);
  const { name, preDescription, description, price, currency, brand,
    imagePath, gender, typeOfFragrance, availability, countryOfOrigin } = product;

  const initialFormValues = useMemo(() => ({
    name: idProduct ? name : emptyString,
    preDescription: idProduct ? preDescription : emptyString,
    description: idProduct ? description : emptyString,
    price: idProduct ? price : emptyString,
    currency: idProduct && currency ? currency : emptyString,
    brand: idProduct ? brand : emptyString,
    imagePath: idProduct ? imagePath : emptyString,
    gender: idProduct && gender ? gender : emptyString,
    typeOfFragrance: idProduct ? typeOfFragrance : emptyString,
    availability: idProduct ? availability : emptyString,
    countryOfOrigin: idProduct ? countryOfOrigin : emptyString,
  }), [idProduct, name, preDescription, description, price, currency, brand, imagePath,
    gender, typeOfFragrance, availability, countryOfOrigin]);

  useEffect(() => {
    if (idProduct) {
      dispatch(getOneProduct({ idProduct }));
    }
  }, [dispatch, idProduct]);

  const onSubmit = useCallback((res) => {
    const productToAdd = { ...res, id: uuidv4() };
    idProduct ? dispatch(editProduct({ idProduct, res })) : dispatch(addProduct({ productToAdd }));
    navigate('/products');
  }, [dispatch, idProduct, navigate]);

  const comeBack = useCallback(() => navigate('/products'), [navigate]);

  return (
    <>
      {authUser.roleAdmin ? (
        <>
          {!isProductLoading ? (
            <Box component="section" className="products-form forms">
              <Grid container className="container">
                <Grid item xs={7} className="products-form__inner">
                  <Typography variant="h2" component="h2" className="products-form__title">
                    {idProduct ? t('editProduct') : t('addProduct')}
                  </Typography>
                  <>
                    {
                      !isProductLoading && (
                        <Formik
                          enableReinitialize
                          initialValues={initialFormValues}
                          validationSchema={productsFormSchema}
                          onSubmit={onSubmit}
                        >
                          <Form className="products-form__form">
                            <Field
                              type={textType}
                              name="name"
                              component={InputCustom}
                              label={t('nameLabel')}
                              className={inputClass}
                              required
                            />
                            <Field
                              type={textType}
                              name="preDescription"
                              component={InputCustom}
                              label={t('preDescriptionLabel')}
                              className={inputClass}
                              required
                            />
                            <Field
                              type={textType}
                              name="description"
                              component={InputCustom}
                              label={t('descriptionLabel')}
                              className={textareaClass}
                              multiline
                              rows={5}
                              required
                            />
                            <Field
                              type={numberType}
                              name="price"
                              component={InputCustom}
                              label={t('priceLabel')}
                              className={inputClass}
                              required
                            />
                            <Field
                              name="currency"
                              component={SelectCustom}
                              label={t('currencyLabel')}
                              className={inputClass}
                              options={currencyOptions}
                              required
                            />
                            <Field
                              type={textType}
                              name="brand"
                              component={InputCustom}
                              label={t('brandLabel')}
                              className={inputClass}
                              required
                            />
                            <Field
                              type={textType}
                              name="imagePath"
                              component={InputCustom}
                              label={t('imagePathLabel')}
                              className={inputClass}
                              required
                            />
                            <Field
                              name="gender"
                              component={SelectCustom}
                              label={t('genderLabel')}
                              className={inputClass}
                              options={genderOptions}
                              required
                            />
                            <Field
                              type={textType}
                              name="typeOfFragrance"
                              component={InputCustom}
                              label={t('typeOfFragranceLabel')}
                              className={inputClass}
                              required
                            />
                            <Field
                              name="availability"
                              component={RadioCustom}
                              label={t('availabilityLabel')}
                              className={inputClass}
                              options={availabilityOptions}
                              required
                            />
                            <Field
                              type={textType}
                              name="countryOfOrigin"
                              component={InputCustom}
                              label={t('countryOfOriginLabel')}
                              className={inputClass}
                              required
                            />
                            <Stack spacing={secondSpacing} direction={rowDirection} className={buttonsBoxClass}>
                              <Button variant={containedBtnVariant} type={submitBtnType} className="forms__btn-success">{t('save')}</Button>
                              <Button variant={outlinedBtnVariant} onClick={comeBack} className="forms__btn-cancel">{t('cancel')}</Button>
                            </Stack>
                          </Form>
                        </Formik>
                      )
                    }
                  </>
                </Grid>
              </Grid>
            </Box>
          ) : <LoadingPage />}
        </>
      ) : <NoAccessPage /> }
    </>
  );
});
