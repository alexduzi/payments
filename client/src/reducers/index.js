import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import paymentsReducer from './paymentsReducer';
import buyerReducer from './buyerReducer';
import cardReducer from './cardReducer';

export default combineReducers({
  client: clientReducer,
  payments: paymentsReducer,
  buyer: buyerReducer,
  card: cardReducer
});
