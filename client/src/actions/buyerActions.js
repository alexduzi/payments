import buyerApi from '../services/buyerApi';

const api = buyerApi.create();

export const TYPES = {
    INSERT_BUYER: 'INSERT_BUYER',
    INSERT_BUYER_ERROR: 'INSERT_BUYER_ERROR',
    UPDATE_BUYER: 'UPDATE_BUYER',
    UPDATE_BUYER_ERROR: 'UPDATE_BUYER_ERROR',
    DELETE_BUYER: 'DELETE_BUYER',
    DELETE_BUYER_ERROR: 'DELETE_BUYER_ERROR'
}

export const insertBuyer = (buyer) => async dispatch => {
  const res = await api.insertBuyer(buyer);

  if (res.ok) {
    dispatch({ type: TYPES.INSERT_BUYER, payload: res.data });
  } else {
    dispatch({ type: TYPES.INSERT_BUYER_ERROR, payload: res.data });
  }

};

export const updateBuyer = (buyer) => async dispatch => {
  const res = await api.updateBuyer(buyer);

  if (res.ok) {
    dispatch({ type: TYPES.UPDATE_BUYER, payload: res.data });
  } else {
    dispatch({ type: TYPES.UPDATE_BUYER_ERROR, payload: res.data });
  }

};

export const deleteBuyer = (buyer) => async dispatch => {
  const res = await api.deleteBuyer(buyer);

  if (res.ok) {
    dispatch({ type: TYPES.DELETE_BUYER, payload: res.data });
  } else {
    dispatch({ type: TYPES.DELETE_BUYER_ERROR, payload: res.data });
  }

};
