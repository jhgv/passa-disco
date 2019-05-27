import api from '../apis/api';
import {
  CREATE_ALBUM,
  FETCH_ALBUM,
  UPDATE_ALBUM,
  DELETE_ALBUM,
  CHANGE_LIST_TEXT,
  FETCH_COLLECTIONS,
  FETCH_COLLECTION_ALBUMS,
  DELETE_COLLECTION,
  FETCH_COLLECTION,
  CREATE_COLLECTION,
  UPDATE_COLLECTION
} from './types';
import history from '../history';

export const createAlbum = formValues => async (dispatch, getState) => {
  const formData = new FormData();
  Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
  const response = await api.post('/album', formData);
  dispatch({ type: CREATE_ALBUM, payload: response.data });
  history.push(`/collection/${formValues.collection}/albums`);
};

export const fetchAlbum = albumId => async dispatch => {
  const response = await api.get(`/album/${albumId}`);
  dispatch({ type: FETCH_ALBUM, payload: response.data });
};

export const updateAlbum = (
  albumId,
  collectionId,
  formValues
) => async dispatch => {
  const formData = new FormData();
  Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
  const response = await api.patch(`/album/${albumId}`, formData);
  dispatch({ type: UPDATE_ALBUM, payload: response.data });
  history.push(`/collection/${collectionId}/albums`);
};

export const deleteAlbum = albumId => async dispatch => {
  await api.delete(`/album/${albumId}`);
  dispatch({ type: DELETE_ALBUM, payload: albumId });
  history.push('/');
};

export const searchAlbums = (collectionId, search) => async dispatch => {
  const response = await api.get(
    `/collection/${collectionId}/albums?q=${search}`
  );
  dispatch({ type: FETCH_COLLECTION_ALBUMS, payload: response.data });
};

export const changeListText = value => ({
  type: CHANGE_LIST_TEXT,
  payload: value
});

export const createCollection = formValues => async dispatch => {
  const response = await api.post('/collection', formValues);
  dispatch({ type: CREATE_COLLECTION, payload: response.data });
  history.push('/');
};

export const updateCollection = (
  collectionId,
  formValues
) => async dispatch => {
  const response = await api.patch(`/collection/${collectionId}`, formValues);
  dispatch({ type: UPDATE_COLLECTION, payload: response.data });
  history.push('/');
};

export const fetchCollections = () => async dispatch => {
  const response = await api.get('/collection');
  dispatch({ type: FETCH_COLLECTIONS, payload: response.data });
};

export const fetchCollectionAlbums = collectionId => async dispatch => {
  const response = await api.get(`/collection/${collectionId}/albums`);
  dispatch({ type: FETCH_COLLECTION_ALBUMS, payload: response.data });
};

export const fetchCollection = collectionId => async dispatch => {
  const response = await api.get(`/collection/${collectionId}`);
  dispatch({ type: FETCH_COLLECTION, payload: response.data });
};

export const deleteCollection = collectionId => async dispatch => {
  await api.delete(`/collection/${collectionId}`);
  dispatch({ type: DELETE_COLLECTION, payload: collectionId });
  history.push('/');
};
