import { TYPES } from '../actions/paymentActions';

const {
  INSERT_PAYMENT,
  INSERT_PAYMENT_ERROR,
  UPDATE_PAYMENT,
  UPDATE_PAYMENT_ERROR,
  DELETE_PAYMENT,
  DELETE_PAYMENT_ERROR
} = TYPES;

const INITIAL_STATE = {

}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case INSERT_PAYMENT:

      return { ...state };

    case UPDATE_PAYMENT:

      return { ...state };

    case DELETE_PAYMENT:

      return { ...state };

    default:
      return state;
  }
}
