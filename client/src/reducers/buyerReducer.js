import { TYPES } from '../actions/buyerActions';

const {
  INSERT_BUYER,
  INSERT_BUYER_ERROR,
  UPDATE_BUYER,
  UPDATE_BUYER_ERROR,
  DELETE_BUYER,
  DELETE_BUYER_ERROR
} = TYPES;

const INITIAL_STATE = {

}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case INSERT_BUYER:

      return { ...state };

    case INSERT_BUYER:

      return { ...state };

    case UPDATE_BUYER:

      return { ...state };

    case DELETE_BUYER:

      return { ...state };

    default:
      return state;
  }
}
