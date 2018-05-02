import { TYPES } from '../actions/cardActions';

const {
  INSERT_CARD,
  INSERT_CARD_ERROR,
  UPDATE_CARD,
  UPDATE_CARD_ERROR,
  DELETE_CARD,
  DELETE_CARD_ERROR
} = TYPES;

const INITIAL_STATE = {

}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case INSERT_CARD:

      return { ...state };

    case UPDATE_CARD:

      return { ...state };

    case DELETE_CARD:

      return { ...state };

    default:
      return state;
  }
}
