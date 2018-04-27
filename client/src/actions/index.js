import candidatesApi from '../services/candidatesApi';
import {
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_ERROR,
  FETCH_CANDIDATES_LOADING,

  FETCH_CANDIDATE,
  FETCH_CANDIDATE_ERROR,
  FETCH_CANDIDATE_LOADING,

  CANDIDATES_INSERT,
  CANDIDATES_INSERT_LOADING,
  CANDIDATES_INSERT_ERROR,
  CANDIDATES_UPDATE,
  CANDIDATES_UPDATE_LOADING,
  CANDIDATES_UPDATE_ERROR,
  CANDIDATES_DELETE,
  CANDIDATES_DELETE_LOADING,
  CANDIDATES_DELETE_ERROR,
  CANDIDATES_CANCEL,

  EXPERIENCES_INSERT,
  EXPERIENCES_INSERT_LOADING,
  EXPERIENCES_INSERT_ERROR,

  EXPERIENCES_UPDATE,
  EXPERIENCES_UPDATE_LOADING,
  EXPERIENCES_UPDATE_ERROR,

  EXPERIENCES_DELETE,
  EXPERIENCES_DELETE_LOADING,
  EXPERIENCES_DELETE_ERROR
} from './types';

const api = candidatesApi.create();

export const fetchCandidates = (email, name) => async dispatch => {
  dispatch({ type: FETCH_CANDIDATES_LOADING, payload: true });

  const res = await api.getCandidates(email, name);

  if (res.ok) {

    dispatch({ type: FETCH_CANDIDATES, payload: res.data.candidates });
  } else {
    dispatch({ type: FETCH_CANDIDATES_ERROR, payload: [] });
  }

};

export const fetchCandidate = (id) => async dispatch => {
  dispatch({ type: FETCH_CANDIDATE_LOADING, payload: true });

  const res = await api.getCandidate(id);

  if (res.ok) {

    dispatch({ type: FETCH_CANDIDATE, payload: res.data.candidate });
  } else {
    dispatch({ type: FETCH_CANDIDATE_ERROR, payload: [] });
  }

};

export const insertCandidate = (candidate) => async dispatch => {
  dispatch({ type: CANDIDATES_INSERT_LOADING, payload: true });

  const res = await api.insertCandidate(candidate);

  if (res.ok) {

    dispatch({ type: CANDIDATES_INSERT, payload: res.data.candidate });
  } else {
    dispatch({ type: CANDIDATES_INSERT_ERROR, payload: true });
  }

};

export const updateCandidate = (candidate) => async dispatch => {
  dispatch({ type: CANDIDATES_UPDATE_LOADING, payload: true });

  const res = await api.updateCandidate(candidate);

  if (res.ok) {

    dispatch({ type: CANDIDATES_UPDATE, payload: res.data });

  } else {
    dispatch({ type: CANDIDATES_UPDATE_ERROR, payload: true });
  }

};

export const deleteCandidate = (candidate) => async dispatch => {
  dispatch({ type: CANDIDATES_DELETE_LOADING, payload: true });

  const res = await api.deleteCandidate(candidate._id);

  if (res.ok) {

    dispatch({ type: CANDIDATES_DELETE, payload: [] });

    dispatch(fetchCandidates());
  } else {
    dispatch({ type: CANDIDATES_DELETE_ERROR, payload: true });
  }

};

export const cancelCandidateInsertion = () => async dispatch => {
  dispatch({ type: CANDIDATES_CANCEL, payload: true });
};

export const insertExperiences = (id, experiences) => async dispatch => {
  dispatch({ type: EXPERIENCES_INSERT_LOADING, payload: true });

  const res = await api.insertExperiences({ id, experiences });

  if (res.ok) {

    dispatch({ type: EXPERIENCES_INSERT, payload: [] });

    dispatch(cancelCandidateInsertion());

    dispatch(fetchCandidates());
  } else {
    dispatch({ type: EXPERIENCES_INSERT_ERROR, payload: true });
  }

};

export const updateExperiences = (id, experiences) => async dispatch => {
  dispatch({ type: EXPERIENCES_UPDATE_LOADING, payload: true });

  const res = await api.updateExperiences({ id, experiences });

  if (res.ok) {

    dispatch({ type: EXPERIENCES_UPDATE, payload: [] });

    dispatch(cancelCandidateInsertion());
  } else {
    dispatch({ type: EXPERIENCES_UPDATE_ERROR, payload: true });
  }

};

export const deleteExperience = (id, experience) => async dispatch => {
  dispatch({ type: EXPERIENCES_DELETE_LOADING, payload: true });

  const res = await api.deleteExperience({ id, experienceId: experience._id });

  if (res.ok) {

    dispatch({ type: EXPERIENCES_DELETE, payload: [] });

    dispatch(cancelCandidateInsertion());
  } else {
    dispatch({ type: EXPERIENCES_DELETE_ERROR, payload: true });
  }

};
