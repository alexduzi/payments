import apisauce from 'apisauce';

const create = (baseURL = process.env.REACT_APP_PAYMENT_API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const insertPayment = (payment) => api.post('payment', { ...payment });

  const updatePayment = (payment) => api.put(`payment/${payment._id}`, { ...payment });

  const deletePayment = (id) => api.delete(`payment/${id}`);

  return {
    insertPayment,
    updatePayment,
    deletePayment
  };
}

export default { create };
