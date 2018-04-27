import apisauce from 'apisauce';
import queryString from 'query-string';

const create = (baseURL = process.env.REACT_APP_CANDIDATES_API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getCandidates = (email, name) => api.get(`candidate?${queryString.stringify({ email, name })}`);

  const getCandidate = (id) => api.get(`candidate/${id}`);

  const insertCandidate = (candidate) => api.post('candidate', { ...candidate });

  const updateCandidate = (candidate) => api.put('candidate', { ...candidate });

  const deleteCandidate = (id) => api.delete(`candidate/${id}`);

  const insertExperiences = ({ id, experiences }) => api.post(`candidate/${id}/experience`, { experiences });

  const updateExperiences = ({ id, experiences }) => api.put(`candidate/${id}/experience`, { experiences });

  const deleteExperience = ({ id, experienceId }) => api.delete(`candidate/${id}/experience/${experienceId}`);

  return {
    getCandidates,
    getCandidate,
    insertCandidate,
    updateCandidate,
    deleteCandidate,
    insertExperiences,
    updateExperiences,
    deleteExperience
  };
}

export default { create };
