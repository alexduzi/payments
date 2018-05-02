import clientApi from '../services/clientApi';

const api = clientApi.create();

export const TYPES = {
    FETCHING_CLIENT_LOADING: 'FETCHING_CLIENT_LOADING',
    FETCHING_CLIENT: 'FETCHING_CLIENT',
    FETCHING_CLIENT_ERROR: 'FETCHING_CLIENT_ERROR',
    INSERT_CLIENT: 'INSERT_CLIENT',
    INSERT_CLIENT_ERROR: 'INSERT_CLIENT_ERROR',
    UPDATE_CLIENT: 'UPDATE_CLIENT',
    UPDATE_CLIENT_ERROR: 'UPDATE_CLIENT_ERROR',
    DELETE_CLIENT: 'DELETE_CLIENT',
    DELETE_CLIENT_ERROR: 'DELETE_CLIENT_ERROR'
}

export const getClients = () => async dispatch => {

  dispatch({ type: TYPES.FETCHING_CLIENT_LOADING, payload: true });

  const res = await api.getClients();

  if (res.ok) {
    dispatch({ type: TYPES.FETCHING_CLIENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.FETCHING_CLIENT_ERROR, payload: res.data });
  }
};

export const getClient = (id) => async dispatch => {
  dispatch({ type: TYPES.FETCHING_CLIENT_LOADING, payload: true });

  const res = await api.getClient(id);

  if (res.ok) {
    dispatch({ type: TYPES.FETCHING_CLIENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.FETCHING_CLIENT_ERROR, payload: res.data });
  }
};

export const inserClient = (client) => async dispatch => {

  const res = await api.insertClient(client);

  if (res.ok) {
    dispatch({ type: TYPES.INSERT_CLIENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.INSERT_CLIENT_ERROR, payload: res.data });
  }

};

export const updateClient = (client) => async dispatch => {
  const res = await api.updateClient(client);

  if (res.ok) {
    dispatch({ type: TYPES.UPDATE_CLIENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.UPDATE_CLIENT_ERROR, payload: res.data });
  }

};

export const deleteClient = (client) => async dispatch => {
  const res = await api.deleteClient(client);

  if (res.ok) {
    dispatch({ type: TYPES.DELETE_CLIENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.DELETE_CLIENT_ERROR, payload: res.data });
  }

};
