import appReducer from './appReducer';
import authReducer from './authenticateReducer';
import productsReducer from './productsReducer';

export const rootReducer = {
  appState: appReducer,
  authState: authReducer,
  productsState: productsReducer,
};
