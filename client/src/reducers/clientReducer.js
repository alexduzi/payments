import { TYPES } from '../actions/clientActions';

const {
  FETCHING_CLIENT_LOADING,
  FETCHING_CLIENT,
  FETCHING_CLIENT_ERROR,
  INSERT_CLIENT,
  INSERT_CLIENT_ERROR,
  UPDATE_CLIENT,
  UPDATE_CLIENT_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_ERROR
} = TYPES;

const INITIAL_STATE = {
  loading: false,
  list: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCHING_CLIENT_LOADING:

      return { ...state, loading: true };

    case FETCHING_CLIENT:

      return { ...state, loading: false, list: action.payload };

    case FETCHING_CLIENT_ERROR:

      return { ...state, loading: false, list: [] };

    case INSERT_CLIENT:

      return { ...state };

    case UPDATE_CLIENT:

      return { ...state };

    case DELETE_CLIENT:

      return { ...state };

    default:
      return state;
  }
}
