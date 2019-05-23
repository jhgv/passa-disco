import discs from '../apis/discs';
import {
  CREATE_DISC,
  FETCH_DISC,
  FETCH_DISCS,
  UPDATE_DISC,
  DELETE_DISC
} from './types';
import history from '../history';

export const createDisc = formValues => async (dispatch, getState) => {
  const response = await discs.post('/discs', formValues);
  dispatch({ type: CREATE_DISC, payload: response.data });
  history.push('/');
};

export const fetchDiscs = () => async dispatch => {
  const response = await discs.get('/discs');
  dispatch({ type: FETCH_DISCS, payload: response.data });
};

export const fetchDisc = discId => async dispatch => {
  const response = await discs.get(`/discs/${discId}`);
  dispatch({ type: FETCH_DISC, payload: response.data });
};

export const updateDisc = (discId, formValues) => async dispatch => {
  const response = await discs.patch(`/discs/${discId}`, formValues);
  dispatch({ type: UPDATE_DISC, payload: response.data });
  history.push('/');
};

export const deleteDisc = discId => async dispatch => {
  await discs.delete(`/discs/${discId}`);
  dispatch({ type: DELETE_DISC, payload: discId });
  history.push('/');
};
