import apisauce from 'apisauce';

const create = (baseURL = process.env.REACT_APP_PAYMENT_API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const insertBuyer = (buyer) => api.post('buyer', { ...buyer });

  const updateBuyer = (buyer) => api.put(`buyer/${buyer._id}`, { ...buyer });

  const deleteBuyer = (id) => api.delete(`buyer/${id}`);

  return {
    insertBuyer,
    updateBuyer,
    deleteBuyer
  };
}

export default { create };
