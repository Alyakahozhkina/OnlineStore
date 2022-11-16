import { createSelector } from 'reselect';
import { sort } from '../utils/helpers';

export const selectOpenLoginModal = ({ appState: { openLoginModal } }) => openLoginModal;
export const selectOpenCartModal = ({ appState: { openCartListModal } }) => openCartListModal;
export const selectFlagLogin = ({ appState: { flagLogin } }) => flagLogin;
export const selectSortBy = ({ appState: { sortBy } }) => sortBy;
export const selectFilter = ({ appState: { filter } }) => filter;
export const selectDirectionSort = ({ appState: { directionSort } }) => directionSort;
export const selectTheme = ({ appState: { theme } }) => theme;
export const selectLanguage = ({ appState: { language } }) => language;

export const selectAuthUser = ({ authState: { authUser } }) => authUser;
export const selectAuthUserList = ({ authState: { authUsersList } }) => authUsersList;
export const selectNumberOrdersFromCart = ({ authState: { authUser: { orderCart } } }) => orderCart;
export const selectAuthUserLoading = ({ authState: { isAuthUserLoading } }) => isAuthUserLoading;

export const selectOneProduct = ({ productsState: { productItem } }) => productItem;
export const selectProductsList = ({ productsState: { productsList } }) => productsList;

export const selectProductLoading = ({ productsState: { isProductLoading } }) => isProductLoading;
export const selectProductAdding = ({ productsState: { isProductAdding } }) => isProductAdding;
export const selectProductUpdating = ({ productsState: { isProductUpdating } }) => isProductUpdating;

export const selectProductsListToDisplay = createSelector(
  selectProductsList,
  selectFilter,
  (products, filter) => products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase())),
);

export const selectProductsListSorted = createSelector(
  selectProductsListToDisplay,
  selectSortBy,
  selectDirectionSort,
  (products, sortBy, direction) => sort(products, sortBy, direction),
);
export const selectCartListToDisplay = createSelector(
  selectProductsList,
  selectNumberOrdersFromCart,
  (products, cartList) => cartList.reduce((prevState, cartItem) => {
    const foundProduct = products.find((item) => item.id === cartItem.id);
    if (foundProduct) {
      return [...prevState, { ...foundProduct, amount: cartItem.amount }];
    }
    return [...prevState];
  }, []),
);

export const selectNumberOrdersFromCartToDisplay = createSelector(
  selectProductsList,
  selectNumberOrdersFromCart,
  (products, cartList) => cartList.reduce((prevValue, cartItem) => {
    if (products.find((item) => item.id === cartItem.id)) {
      return prevValue + cartItem.amount;
    }
    return prevValue;
  }, 0),
);

export const selectCartsTotalSum = createSelector(
  selectProductsList,
  selectNumberOrdersFromCart,
  (products, cartList) => cartList.reduce((prevValue, cartItem) => {
    const foundProduct = products.find((item) => item.id === cartItem.id);
    if (foundProduct) {
      if(foundProduct.currency === 'usd') {
        return prevValue + (foundProduct.price * cartItem.amount * 40);
      }
      return prevValue + (foundProduct.price * cartItem.amount);
    }
    return prevValue;
  }, 0),
);
