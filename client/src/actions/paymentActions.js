import paymentApi from '../services/paymentApi';

const api = paymentApi.create();

export const TYPES = {
    INSERT_PAYMENT: 'INSERT_PAYMENT',
    INSERT_PAYMENT_ERROR: 'INSERT_PAYMENT_ERROR',
    UPDATE_PAYMENT: 'UPDATE_PAYMENT',
    UPDATE_PAYMENT_ERROR: 'UPDATE_PAYMENT_ERROR',
    DELETE_PAYMENT: 'DELETE_PAYMENT',
    DELETE_PAYMENT_ERROR: 'DELETE_PAYMENT_ERROR'
}

export const insertPayment = (payment) => async dispatch => {
  const res = await api.insertPayment(payment);

  if (res.ok) {
    dispatch({ type: TYPES.INSERT_PAYMENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.INSERT_PAYMENT_ERROR, payload: res.data });
  }

};

export const updatePayment = (payment) => async dispatch => {
  const res = await api.updatePayment(payment);

  if (res.ok) {
    dispatch({ type: TYPES.UPDATE_PAYMENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.UPDATE_PAYMENT_ERROR, payload: res.data });
  }

};

export const deletePayment = (id) => async dispatch => {
  const res = await api.deletePayment(id);

  if (res.ok) {
    dispatch({ type: TYPES.DELETE_PAYMENT, payload: res.data });
  } else {
    dispatch({ type: TYPES.DELETE_PAYMENT_ERROR, payload: res.data });
  }

};
