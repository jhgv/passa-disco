import albumAPI from '../apis/album';
import {
  CREATE_ALBUM,
  FETCH_ALBUM,
  FETCH_ALBUMS,
  UPDATE_ALBUM,
  DELETE_ALBUM,
  SEARCH_ALBUM,
  CHANGE_LIST_TEXT
} from './types';
import history from '../history';

export const createAlbum = formValues => async (dispatch, getState) => {
  const formData = new FormData();
  Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
  const response = await albumAPI.post('/album', formData);
  dispatch({ type: CREATE_ALBUM, payload: response.data });
  history.push('/');
};

export const fetchAlbums = () => async dispatch => {
  const response = await albumAPI.get('/album');
  dispatch({ type: FETCH_ALBUMS, payload: response.data });
};

export const fetchAlbum = albumId => async dispatch => {
  const response = await albumAPI.get(`/album/${albumId}`);
  dispatch({ type: FETCH_ALBUM, payload: response.data });
};

export const updateAlbum = (albumId, formValues) => async dispatch => {
  const formData = new FormData();
  Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
  const response = await albumAPI.patch(`/album/${albumId}`, formData);
  dispatch({ type: UPDATE_ALBUM, payload: response.data });
  history.push('/');
};

export const deleteAlbum = albumId => async dispatch => {
  await albumAPI.delete(`/album/${albumId}`);
  dispatch({ type: DELETE_ALBUM, payload: albumId });
  history.push('/');
};

export const searchAlbums = search => async dispatch => {
  const response = await albumAPI.get(`/album?q=${search}`);
  dispatch({ type: SEARCH_ALBUM, payload: response.data });
};

export const changeListText = value => ({
  type: CHANGE_LIST_TEXT,
  payload: value
});
