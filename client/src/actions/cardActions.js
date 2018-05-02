import cardApi from '../services/cardApi';

const api = cardApi.create();

export const TYPES = {
    INSERT_CARD: 'INSERT_CARD',
    INSERT_CARD_ERROR: 'INSERT_CARD_ERROR',
    UPDATE_CARD: 'UPDATE_CARD',
    UPDATE_CARD_ERROR: 'UPDATE_CARD_ERROR',
    DELETE_CARD: 'DELETE_CARD',
    DELETE_CARD_ERROR: 'DELETE_CARD_ERROR'
}

export const insertCard = (card) => async dispatch => {
  const res = await api.insertCard(card);

  if (res.ok) {
    dispatch({ type: TYPES.INSERT_CARD, payload: res.data });
  } else {
    dispatch({ type: TYPES.INSERT_CARD_ERROR, payload: res.data });
  }

};

export const updateCard = (card) => async dispatch => {
  const res = await api.updateCard(card);

  if (res.ok) {
    dispatch({ type: TYPES.UPDATE_CARD, payload: res.data });
  } else {
    dispatch({ type: TYPES.UPDATE_CARD_ERROR, payload: res.data });
  }

};

export const deleteCard = (card) => async dispatch => {
  const res = await api.deleteCard(card);

  if (res.ok) {
    dispatch({ type: TYPES.DELETE_CARD, payload: res.data });
  } else {
    dispatch({ type: TYPES.DELETE_CARD_ERROR, payload: res.data });
  }

};
