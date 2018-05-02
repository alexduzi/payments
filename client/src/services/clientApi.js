import apisauce from 'apisauce';

const create = (baseURL = process.env.REACT_APP_PAYMENT_API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getClients = () => api.get('client');

  const getClient = (id) => api.get(`client/${id}`);

  const insertClient = (client) => api.post('client', { ...client });

  const updateClient = (client) => api.put(`client/${client._id}`, { ...client });

  const deleteClient = (id) => api.delete(`client/${id}`);

  return {
    getClients,
    getClient,
    insertClient,
    updateClient,
    deleteClient
  };
}

export default { create };
