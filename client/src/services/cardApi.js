import apisauce from 'apisauce';

const create = (baseURL = process.env.REACT_APP_PAYMENT_API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const insertCard = (card) => api.post('card', { ...card });

  const updateCard = (card) => api.put(`card/${card._id}`, { ...card });

  const deleteCard = (id) => api.delete(`card/${id}`);

  return {
    insertCard,
    updateCard,
    deleteCard
  };
}

export default { create };
